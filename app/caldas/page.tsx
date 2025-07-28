import { PublicNavbar } from '@/components/layout/public-navbar'
import { PublicFooter } from '@/components/layout/public-footer'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, MapPin, Users, BookOpen, Target, Award, CheckCircle, Clock } from 'lucide-react'
import Link from 'next/link'

export default function CaldassPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavbar />
      
      {/* Hero del Programa */}
      <section className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Award className="h-12 w-12 mr-4 text-yellow-300" />
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold mb-2">
                  Programa de Formación
                </h1>
                <p className="text-xl text-blue-100">Norte de Caldas</p>
              </div>
            </div>
            
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Un programa integral de 6 meses que transformará tu negocio tradicional 
              en una empresa digital exitosa, utilizando las mejores herramientas de IA.
            </p>
            
            <Link href="/sign-up">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-xl font-semibold">
                Aplicar al Programa
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Información del Programa */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                ¿Qué incluye el programa?
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Academia IA Especializada</h3>
                    <p className="text-gray-600">Cursos diseñados específicamente para emprendedores del Norte de Caldas</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Tienda Online Personalizada</h3>
                    <p className="text-gray-600">Tu propia página web con diseño profesional y herramientas de venta</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Mentorías Individuales</h3>
                    <p className="text-gray-600">Acompañamiento personalizado para el crecimiento de tu negocio</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Herramientas de IA</h3>
                    <p className="text-gray-600">Acceso a herramientas de inteligencia artificial para marketing y ventas</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Red de Emprendedores</h3>
                    <p className="text-gray-600">Conexión con otros empresarios de la región para colaboraciones</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Detalles del Programa</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-600 mr-3" />
                  <span><strong>Duración:</strong> 6 meses</span>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                  <span><strong>Modalidad:</strong> Virtual + Presencial</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                  <span><strong>Dirigido a:</strong> Norte de Caldas</span>
                </div>
                
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-600 mr-3" />
                  <span><strong>Cupos:</strong> Limitados por cohorte</span>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Inversión del Programa</h4>
                <p className="text-sm text-blue-700">
                  Planes accesibles desde $20,000 mensuales. 
                  Incluye todas las herramientas y acompañamiento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Municipios */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Municipios Participantes
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Manizales', 'Villa María', 'Chinchiná', 'Palestina',
              'Santa Rosa', 'Marsella', 'Dosquebradas', 'Pereira',
              'Neira', 'Villamaría', 'Anserma', 'Risaralda'
            ].map((municipio) => (
              <div key={municipio} className="bg-white p-3 rounded-lg shadow-sm">
                <span className="text-gray-700 font-medium">{municipio}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            ¿Listo para transformar tu negocio?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Aplica ahora y únete a la nueva generación de emprendedores digitales del Norte de Caldas
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-xl font-semibold">
              Aplicar al Programa
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>
      
      <PublicFooter />
    </div>
  )
}
