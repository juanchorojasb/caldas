'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Package, Eye, MessageCircle, Filter } from 'lucide-react'
import { useState } from 'react'

interface Product {
  id: string
  name: string
  description?: string | null
  price: number
  images: string[]
  category?: string | null
  isFeatured?: boolean
  createdAt: Date
}

interface StoreProductsProps {
  products: Product[]
}

export function StoreProducts({ products }: StoreProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  
  // Obtener categorías únicas y filtrar null/undefined
  const categories = Array.from(
    new Set(
      products
        .map(p => p.category)
        .filter((category): category is string => category !== null && category !== undefined && category !== '')
    )
  )
  
  // Filtrar productos por categoría
  const filteredProducts = selectedCategory 
    ? products.filter(p => p.category === selectedCategory)
    : products

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="h-20 w-20 text-gray-300 mx-auto mb-6" />
        <h3 className="text-xl font-medium text-gray-900 mb-3">
          No hay productos disponibles
        </h3>
        <p className="text-gray-500 mb-6">
          Esta tienda aún no ha publicado productos.
        </p>
        <Link
          href="/tiendas"
          className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium"
        >
          <span>Ver otras tiendas</span>
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Header con filtros */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
          Productos ({filteredProducts.length})
        </h2>
        
        {/* Filtros */}
        {categories.length > 0 && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Categoría:</span>
            </div>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            >
              <option value="">Todas las categorías</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      
      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 relative">
            {/* Badge para productos destacados */}
            {product.isFeatured && (
              <div className="absolute top-3 left-3 z-10 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
                Destacado
              </div>
            )}
            
            {/* Imagen del producto */}
            <div className="aspect-square relative overflow-hidden bg-gray-100">
              {product.images.length > 0 ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <Package className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div>
            
            {/* Información del producto */}
            <div className="p-5">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-lg">
                {product.name}
              </h3>
              
              {product.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>
              )}
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-green-600">
                  ${product.price.toLocaleString('es-CO')}
                </span>
                
                {product.category && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                    {product.category}
                  </span>
                )}
              </div>
              
              {/* Botones de acción */}
              <div className="flex space-x-2">
                <Link
                  href={`/producto/${product.id}`}
                  className="flex-1 bg-green-600 text-white text-sm py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 font-medium"
                >
                  <Eye className="h-4 w-4" />
                  <span>Ver detalle</span>
                </Link>
                
                <button
                  onClick={() => {
                    const message = `Hola! Me interesa el producto: ${product.name} - $${product.price.toLocaleString('es-CO')}`
                    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
                    window.open(whatsappUrl, '_blank')
                  }}
                  className="flex-1 bg-white text-green-600 text-sm py-3 px-4 rounded-lg border-2 border-green-600 hover:bg-green-50 transition-colors flex items-center justify-center space-x-2 font-medium"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Mensaje si no hay productos después del filtro */}
      {selectedCategory && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay productos en esta categoría
          </h3>
          <button
            onClick={() => setSelectedCategory('')}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Ver todos los productos
          </button>
        </div>
      )}
    </div>
  )
}
