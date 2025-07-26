import { PublicNavbar } from '@/components/layout/public-navbar'
import { PublicFooter } from '@/components/layout/public-footer'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Store, TrendingUp, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <PublicNavbar />
      
      {/* Hero Section - Optimizado para móviles */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-16 sm:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Contenido principal */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <MapPin className="h-6 w-6 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-600">Norte de Caldas</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Conecta tu negocio con 
                <span className="text-blue-600"> toda la región</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                El marketplace local que impulsa emprendedores del Norte de Caldas. 
                Vende online, aprende con IA y conecta con clientes reales.
              </p>
              
              {/* CTA Buttons - Más prominentes en móvil */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 justify-center lg:justify-start">
                <Link href="/sign-up">
                  <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold shadow-lg">
                    Empezar Gratis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/tiendas">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold">
                    Ver Tiendas
                  </Button>
                </Link>
              </div>
              
              {/* Stats - Compactos en móvil */}
              <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600">150+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Emprendedores</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">500+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Productos</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600">12</div>
                  <div className="text-xs sm:text-sm text-gray-600">Municipios</div>
                </div>
              </div>
            </div>
            
            {/* Imagen/Visual - Oculto en móviles pequeños */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-400 to-green-400 rounded-2xl p-8 text-white text-center">
                  <Store className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Tu tienda online</h3>
                  <p className="text-blue-100">En minutos, no semanas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Características - Compactas en móvil */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            Todo lo que necesitas para vender online
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6">
              <div className="bg-blue-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4">
                <Store className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Tienda Online</h3>
              <p className="text-gray-600 text-sm sm:text-base">Página personalizada con tu marca y productos</p>
            </div>
            
            <div className="text-center p-4 sm:p-6">
              <div className="bg-green-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Academia IA</h3>
              <p className="text-gray-600 text-sm sm:text-base">Aprende marketing digital con inteligencia artificial</p>
            </div>
            
            <div className="text-center p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
              <div className="bg-purple-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Comunidad Local</h3>
              <p className="text-gray-600 text-sm sm:text-base">Red de emprendedores del Norte de Caldas</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Final - Más visible en móvil */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            ¿Listo para empezar a vender?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8">
            Únete a los emprendedores que ya están creciendo con MercadoLocal
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold shadow-lg">
              Crear mi tienda gratis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
      
      <PublicFooter />
    </div>
  )
}
