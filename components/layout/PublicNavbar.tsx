'use client'

import Link from 'next/link'
import { Search, ShoppingBag, Menu, X, Store, User, Heart } from 'lucide-react'
import { useState } from 'react'

export function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-white shadow-lg z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <ShoppingBag className="h-9 w-9 text-green-600" />
              <Heart className="h-4 w-4 text-red-500 absolute -top-1 -right-1" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 leading-none">MercadoLocal</span>
              <span className="text-xs text-green-600 font-semibold leading-none">Norte de Caldas</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar productos, tiendas..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/productos" 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors relative group"
            >
              Productos
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              href="/tiendas" 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors relative group"
            >
              Tiendas
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              href="/vendedor" 
              className="flex items-center space-x-2 text-gray-700 hover:text-green-600 font-medium transition-colors relative group"
            >
              <Store className="h-4 w-4" />
              <span>Vender</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              href="/sign-up" 
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2.5 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 font-medium shadow-md"
            >
              <User className="h-4 w-4" />
              <span>Únete gratis</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 bg-white">
            {/* Mobile Search */}
            <div className="mb-6 relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 bg-gray-50"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>
            
            {/* Mobile Links */}
            <div className="space-y-3">
              <Link 
                href="/productos" 
                className="block py-3 px-4 text-gray-700 hover:text-green-600 hover:bg-green-50 font-medium rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                📦 Productos
              </Link>
              <Link 
                href="/tiendas" 
                className="block py-3 px-4 text-gray-700 hover:text-green-600 hover:bg-green-50 font-medium rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                🏪 Tiendas
              </Link>
              <Link 
                href="/vendedor" 
                className="block py-3 px-4 text-gray-700 hover:text-green-600 hover:bg-green-50 font-medium rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                💼 Vender aquí
              </Link>
              <Link 
                href="/sign-up" 
                className="block py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl px-4 text-center font-semibold shadow-md"
                onClick={() => setIsOpen(false)}
              >
                🚀 Crear mi tienda gratis
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
