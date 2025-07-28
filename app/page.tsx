import { PublicNavbar } from '@/components/layout/public-navbar'
import { PublicFooter } from '@/components/layout/public-footer'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Store, TrendingUp, MapPin, BookOpen, Target, Award, Clock, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <PublicNavbar />

      {/* Banner Urgente de Inscripciones */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center text-center">
            <AlertTriangle className="h-5 w-5 mr-2 animate-pulse" />
            <span className="font-bold text-sm sm:text-base">
              🔥 ÚLTIMOS DÍAS: Inscripciones hasta el 8 de agosto • Inicio: 12 de agosto
            </span>
            <Clock className="h-5 w-5 ml-2 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Hero Section - Optimizado para móviles */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-16 sm:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Contenido principal */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <MapPin className="h-6 w-6 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-600">Norte de Caldas</span>
                <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-semibold">
                  ¡Solo 10 días para inscribirse!
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Programa de Formación
                <span className="text-blue-600"> Intensivo de 2 Meses</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Transforma tu emprendimiento en solo 2 meses intensivos. 
                Aprende marketing digital, ventas online e IA aplicada para hacer crecer tu negocio.
              </p>

              {/* Fechas importantes destacadas */}
              <div className="bg-white rounded-lg shadow-lg p-4 mb-6 border-l-4 border-red-500">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-red-600">8 de Agosto</div>
                    <div className="text-xs text-gray-600">Cierre inscripciones</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">12 de Agosto</div>
                    <div className="text-xs text-gray-600">Inicio programa</div>
                  </div>
                </div>
              </div>

              {/* CTA Principal - Solo uno, más prominente */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-8 sm:mb-12">
                <Link href="/sign-up">
                  <Button size="lg" className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-xl font-semibold shadow-lg animate-pulse">
                    🚀 Inscribirme AHORA
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-xl font-semibold">
                    Iniciar Sesión
                  </Button>
                </Link>
              </div>

              {/* Stats - Compactos en móvil */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600">50</div>
                  <div className="text-xs sm:text-sm text-gray-600">Cupos disponibles</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">5</div>
                  <div className="text-xs sm:text-sm text-gray-600">Municipios</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600">100%</div>
                  <div className="text-xs sm:text-sm text-gray-600">Gratuito</div>
                </div>
              </div>
            </div>

            {/* Imagen/Visual - Oculto en móviles pequeños */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-8 text-white text-center">
                  <Store className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">2 Meses Intensivos</h3>
                  <p className="text-red-100">Resultados garantizados</p>
                  <div className="mt-4 bg-white/20 rounded-lg p-4">
                    <div className="text-sm font-semibold">Quedan solo</div>
                    <div className="text-3xl font-bold">10 días</div>
                    <div className="text-sm">para inscribirse</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner del Programa Norte de Caldas */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="flex items-center justify-center mb-6">
              <Award className="h-8 w-8 mr-3" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Programa Intensivo Norte de Caldas
              </h2>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-4">🎯 Programa de 2 Meses - Agosto a Septiembre 2025</h3>
              <p className="text-lg text-blue-100 mb-4 leading-relaxed">
                Programa intensivo diseñado específicamente para emprendedores
                de Neira, Aranzazu, Salamina, Pácora y Aguadas. Aprende marketing digital, 
                ventas online y haz crecer tu negocio con herramientas de inteligencia artificial.
              </p>
              <div className="text-center bg-red-500 rounded-lg p-3 text-white font-bold">
                🔥 GRATUITO gracias al Fondo Francisco José de Caldas (Minciencias)
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <BookOpen className="h-10 w-10 mx-auto mb-4 text-yellow-300" />
                <h3 className="text-xl font-semibold mb-2">Academia IA</h3>
                <p className="text-blue-100">8 semanas de cursos intensivos con inteligencia artificial</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Target className="h-10 w-10 mx-auto mb-4 text-yellow-300" />
                <h3 className="text-xl font-semibold mb-2">Mentorías</h3>
                <p className="text-blue-100">Acompañamiento personalizado semanal para tu negocio</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Users className="h-10 w-10 mx-auto mb-4 text-yellow-300" />
                <h3 className="text-xl font-semibold mb-2">Comunidad</h3>
                <p className="text-blue-100">Red exclusiva de 50 emprendedores seleccionados</p>
              </div>
            </div>

            <Link href="/sign-up">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold shadow-lg">
                Aplicar al Programa
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Municipios participantes */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            Municipios Participantes - 10 cupos por municipio
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {['Neira', 'Aranzazu', 'Salamina', 'Pácora', 'Aguadas'].map((municipio) => (
              <div key={municipio} className="text-center p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{municipio}</h3>
                <p className="text-green-600 font-bold">10 cupos disponibles</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final - Enfocado en urgencia */}
      <section className="py-12 sm:py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            ⏰ Solo quedan 10 días para inscribirse
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8">
            No pierdas la oportunidad de transformar tu negocio con el programa GRATUITO
            más completo del Norte de Caldas
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold shadow-lg animate-pulse">
              🚨 Inscribirme Antes del 8 de Agosto
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="text-sm text-gray-400 mt-4">
            Programa financiado por Minciencias y la Gobernación de Caldas
          </p>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
