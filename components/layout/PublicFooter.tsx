import Link from 'next/link'
import { ShoppingBag, MapPin, Phone, Mail, Facebook, Instagram, Globe, Heart, Award } from 'lucide-react'

export function PublicFooter() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Sección principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo y descripción */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <ShoppingBag className="h-10 w-10 text-green-400" />
                <Heart className="h-4 w-4 text-red-400 absolute -top-1 -right-1" />
              </div>
              <div>
                <div className="text-2xl font-bold">MercadoLocal</div>
                <div className="text-sm text-green-400 font-medium">Norte de Caldas</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Conectamos emprendedores del Norte de Caldas con sus clientes. 
              Tu marketplace local para productos únicos, artesanías y servicios de calidad.
            </p>
            <div className="flex items-center space-x-2 text-sm text-green-400">
              <Award className="h-4 w-4" />
              <span>Apoyando el comercio local desde 2025</span>
            </div>
          </div>

          {/* Enlaces de exploración */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-white">Explorar</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/productos" className="text-gray-300 hover:text-green-400 transition-colors flex items-center space-x-2">
                  <span>→</span><span>Todos los productos</span>
                </Link>
              </li>
              <li>
                <Link href="/tiendas" className="text-gray-300 hover:text-green-400 transition-colors flex items-center space-x-2">
                  <span>→</span><span>Directorio de tiendas</span>
                </Link>
              </li>
              <li>
                <Link href="/categorias" className="text-gray-300 hover:text-green-400 transition-colors flex items-center space-x-2">
                  <span>→</span><span>Por categorías</span>
                </Link>
              </li>
              <li>
                <Link href="/productos-destacados" className="text-gray-300 hover:text-green-400 transition-colors flex items-center space-x-2">
                  <span>→</span><span>Productos destacados</span>
                </Link>
              </li>
              <li>
                <Link href="/sobre-nosotros" className="text-gray-300 hover:text-green-400 transition-colors flex items-center space-x-2">
                  <span>→</span><span>Nuestra historia</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Para vendedores */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-white">Para Vendedores</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/sign-up" className="text-gray-300 hover:text-green-400 transition-colors flex items-center space-x-2">
                  <span>🚀</span><span>Crear tienda gratis</span>
                </Link>
              </li>
              <li>
                <Link href="/onboarding/planes" className="text-gray-300 hover:text-green-400 transition-colors flex items-center space-x-2">
                  <span>💎</span><span>Planes y precios</span>
                </Link>
              </li>
              <li>
                <Link href="/academia" className="text-gray-300 hover:text-green-400 transition-colors flex items-center space-x-2">
                  <span>📚</span><span>Academia de emprendimiento</span>
                </Link>
              </li>
              <li>
                <Link href="/ayuda" className="text-gray-300 hover:text-green-400 transition-colors flex items-center space-x-2">
                  <span>💬</span><span>Centro de ayuda</span>
                </Link>
              </li>
              <li>
                <Link href="/vendedor" className="text-gray-300 hover:text-green-400 transition-colors flex items-center space-x-2">
                  <span>📊</span><span>Panel de vendedor</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-white">Contacto</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">Norte de Caldas</div>
                  <div className="text-gray-300">Manizales, Colombia</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-400 flex-shrink-0" />
                <a href="tel:+573001234567" className="text-gray-300 hover:text-green-400 transition-colors">
                  +57 300 123 4567
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-400 flex-shrink-0" />
                <a href="mailto:hola@mercadolocal.co" className="text-gray-300 hover:text-green-400 transition-colors">
                  hola@mercadolocal.co
                </a>
              </div>
            </div>
            
            {/* Redes sociales */}
            <div>
              <div className="text-white font-medium mb-3">Síguenos</div>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  <Globe className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de copyright */}
      <div className="border-t border-gray-700 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-left">
              © 2025 MercadoLocal Caldas. Todos los derechos reservados.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacidad" className="text-gray-400 hover:text-green-400 transition-colors">
                Privacidad
              </Link>
              <Link href="/terminos" className="text-gray-400 hover:text-green-400 transition-colors">
                Términos
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-green-400 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
