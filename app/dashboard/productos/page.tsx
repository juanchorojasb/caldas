"use client";

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Producto {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function MisProductos() {
  const { user } = useUser();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await fetch('/api/vendedor/productos');
      if (response.ok) {
        const data = await response.json();
        setProductos(data.productos || []);
      }
    } catch (error) {
      console.error('Error fetching productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProducto = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    
    try {
      const response = await fetch(`/api/vendedor/productos?id=${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        alert('Producto eliminado exitosamente');
        fetchProductos(); // Recargar lista
      } else {
        alert('Error eliminando producto');
      }
    } catch (error) {
      alert('Error: ' + error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">🛍️ Mis Productos</h1>
          <p className="text-gray-600 mt-1">
            Gestiona tu catálogo de productos y servicios
          </p>
        </div>
        
        <Link href="/vendedor/productos/nuevo">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nuevo Producto
          </Button>
        </Link>
      </div>

      {productos.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Plus className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No tienes productos aún
          </h3>
          <p className="text-gray-600 mb-6">
            Crea tu primer producto para empezar a vender en el Norte de Caldas
          </p>
          <Link href="/vendedor/productos/nuevo">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Crear mi primer producto
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <div key={producto.id} className="bg-white rounded-lg shadow-md border overflow-hidden">
              {/* Imagen del producto */}
              <div className="aspect-square relative bg-gray-100">
                {producto.images.length > 0 ? (
                  <Image
                    src={producto.images[0]}
                    alt={producto.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-400">Sin imagen</span>
                  </div>
                )}
              </div>

              {/* Contenido */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg leading-tight">
                    {producto.name}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    producto.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {producto.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {producto.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-green-600">
                    {formatPrice(producto.price)}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">
                    {producto.category}
                  </span>
                </div>

                <div className="text-xs text-gray-500 mb-4">
                  Creado: {formatDate(producto.createdAt)}
                </div>

                {/* Acciones */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    Ver
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => deleteProducto(producto.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Estadísticas */}
      {productos.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {productos.length}
            </div>
            <div className="text-sm text-blue-800">
              Total productos
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {productos.filter(p => p.isActive).length}
            </div>
            <div className="text-sm text-green-800">
              Productos activos
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {productos.filter(p => p.isFeatured).length}
            </div>
            <div className="text-sm text-purple-800">
              Destacados
            </div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {new Set(productos.map(p => p.category)).size}
            </div>
            <div className="text-sm text-orange-800">
              Categorías
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
