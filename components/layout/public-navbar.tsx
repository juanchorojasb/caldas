'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, MapPin, LogIn, UserPlus } from 'lucide-react'

export function PublicNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-900">MercadoLocal</span>
              <span className="text-sm text-gray-600 block leading-none">Caldas</span>
            </div>
            <div className="sm:hidden">
              <span className="text-lg font-bold text-gray-900">ML</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/tiendas" className="text-gray-700 hover:text-blue-600 font-medium">
              Tiendas
            </Link>
            <Link href="/marketplace" className="text-gray-700 hover:text-blue-600 font-medium">
              Marketplace
            </Link>
            <Link href="/academia" className="text-gray-700 hover:text-blue-600 font-medium">
              Academia
            </Link>
            <Link href="/caldas" className="text-gray-700 hover:text-blue-600 font-medium">
              Programa
            </Link>
            
            {/* Botones de autenticación */}
            <div className="flex items-center space-x-3 ml-6 border-l border-gray-200 pl-6">
              <Link 
                href="/sign-in"
                className="text-gray-700 hover:text-blue-600 font-medium flex items-center"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Iniciar Sesión
              </Link>
              <Link 
                href="/sign-up"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Registrarse
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/tiendas"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Tiendas
              </Link>
              <Link
                href="/marketplace"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Marketplace
              </Link>
              <Link
                href="/academia"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Academia
              </Link>
              <Link
                href="/caldas"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Programa Norte de Caldas
              </Link>
              
              {/* Botones móviles */}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <Link
                  href="/sign-in"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🔑 Iniciar Sesión
                </Link>
                <Link
                  href="/sign-up"
                  className="block px-3 py-2 bg-blue-600 text-white rounded-lg font-medium mx-2 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🚀 Registrarse
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
