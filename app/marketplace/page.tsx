"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string;
  isActive: boolean;
}

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Simular productos por ahora (luego conectar con API real)
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Café Orgánico de Salamina',
        description: 'Café premium cultivado en las montañas de Caldas',
        price: 25000,
        category: 'bebidas',
        images: '[]',
        isActive: true
      },
      {
        id: '2', 
        name: 'Artesanías en Guadua',
        description: 'Productos artesanales hechos con guadua local',
        price: 35000,
        category: 'artesanias',
        images: '[]',
        isActive: true
      }
    ];
    
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'comida', name: '🍽️ Comida' },
    { id: 'bebidas', name: '🥤 Bebidas' },
    { id: 'artesanias', name: '🎨 Artesanías' },
    { id: 'ropa', name: '👕 Ropa' },
    { id: 'servicios', name: '🔧 Servicios' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🏪 Marketplace Norte de Caldas
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre productos únicos de emprendedores locales de Aguadas, Anserma, 
            Aranzazu, Filadelfia, La Merced, Pacora y Salamina.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Cargando productos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <div className="text-4xl">📦</div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">
                      ${product.price.toLocaleString('es-CO')}
                    </span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No hay productos en esta categoría
            </h3>
            <p className="text-gray-600">
              Intenta con otra categoría o vuelve más tarde.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            ¿Eres emprendedor del Norte de Caldas?
          </h2>
          <p className="text-lg mb-6">
            Únete a nuestro marketplace y vende tus productos a toda la región
          </p>
          <Link 
            href="/vendedor/productos/nuevo"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Crear mi tienda
          </Link>
        </div>
      </div>
    </div>
  );
}
