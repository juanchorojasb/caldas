import Link from 'next/link'
import { Store, ArrowLeft, Search } from 'lucide-react'

export default function StoreNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <Store className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tienda no encontrada
          </h1>
          <p className="text-gray-600">
            La tienda que buscas no existe o no está disponible.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/tiendas"
            className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Search className="h-5 w-5" />
            <span>Ver todas las tiendas</span>
          </Link>
          
          <div className="block">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver al inicio</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
