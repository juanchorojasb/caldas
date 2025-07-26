import Link from 'next/link'
import { MapPin, Mail, Phone, Facebook, Instagram, Twitter } from 'lucide-react'

export function PublicFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">MercadoLocal</span>
                <span className="text-sm text-gray-400 block leading-none">Norte de Caldas</span>
              </div>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              El marketplace que conecta emprendedores del Norte de Caldas con sus clientes. 
              Vende online, aprende con IA y haz crecer tu negocio.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-pink-400 cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-300 cursor-pointer" />
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Plataforma</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/marketplace" className="hover:text-white">Marketplace</Link></li>
              <li><Link href="/tiendas" className="hover:text-white">Tiendas</Link></li>
              <li><Link href="/academia" className="hover:text-white">Academia IA</Link></li>
              <li><Link href="/sign-up" className="hover:text-white">Empezar Gratis</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-sm">info@mercadolocal.co</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-sm">+57 (6) 123-4567</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">Norte de Caldas, Colombia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 MercadoLocal Caldas. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
