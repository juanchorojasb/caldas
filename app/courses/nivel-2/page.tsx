import { Calendar, Clock, Download, Play, Users, Target, TrendingUp, Lightbulb } from 'lucide-react';

export default function Nivel2Page() {
  const sessions = [
    {
      id: 1,
      title: "M1: Business Model Canvas con IA",
      date: "13 de Agosto, 2025",
      time: "7:00 PM - 9:00 PM",
      description: "Revoluciona tu modelo de negocio utilizando herramientas de IA para crear un Business Model Canvas dinámico y validado.",
      topics: [
        "Introducción al Business Model Canvas 4.0",
        "IA para validación de propuestas de valor",
        "Herramientas digitales para mapeo de modelo",
        "Casos de éxito en Norte de Caldas"
      ],
      resources: [
        "Template Business Model Canvas IA",
        "Guía Prompts para Validación",
        "Checklist Modelo de Negocio"
      ],
      status: "available"
    },
    {
      id: 2,
      title: "M2: Mapas de Empatía y Validación",
      date: "20 de Agosto, 2025",
      time: "7:00 PM - 9:00 PM", 
      description: "Desarrolla mapas de empatía precisos y estrategias de validación usando IA para entender profundamente a tu cliente ideal.",
      topics: [
        "Mapas de empatía con análisis de IA",
        "Técnicas de validación digital",
        "Customer Journey automatizado",
        "Herramientas de investigación de mercado"
      ],
      resources: [
        "Template Mapa de Empatía IA",
        "Cuestionarios de Validación",
        "Herramientas Research Online"
      ],
      status: "available"
    },
    {
      id: 3,
      title: "M3: Strategyzer y Metodologías Lean",
      date: "27 de Agosto, 2025",
      time: "7:00 PM - 9:00 PM",
      description: "Domina las metodologías Lean Startup potenciadas con IA para iterar rápidamente y encontrar el product-market fit.",
      topics: [
        "Lean Startup Canvas con IA",
        "MVP automatizado y testing",
        "Métricas clave y pivoting inteligente",
        "Strategyzer digital avanzado"
      ],
      resources: [
        "Lean Startup Canvas Template",
        "Métricas Dashboard",
        "Guía de Pivoting Estratégico"
      ],
      status: "coming-soon"
    },
    {
      id: 4,
      title: "Proyecto Final: Tu Modelo de Negocio Definitivo",
      date: "3 de Septiembre, 2025",
      time: "7:00 PM - 9:00 PM",
      description: "Presenta tu modelo de negocio completo validado con IA y recibe feedback personalizado de expertos.",
      topics: [
        "Presentación modelo validado",
        "Feedback personalizado de mentores",
        "Plan de implementación 90 días",
        "Networking Norte de Caldas"
      ],
      resources: [
        "Template Presentación Final",
        "Rúbrica de Evaluación",
        "Plan de Acción 90 días"
      ],
      status: "coming-soon"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Nivel 2: El Emprendedor Aumentado</h1>
              <p className="text-lg text-gray-600 mt-2">Construye y valida tu modelo de negocio con IA</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                Etapa Temprana
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Crecimiento
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Información del Curso */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Duración</p>
                <p className="font-semibold">4 Sesiones</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Horario</p>
                <p className="font-semibold">Martes 7:00 PM</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Modalidad</p>
                <p className="font-semibold">Virtual + Grabación</p>
              </div>
            </div>
          </div>
        </div>

        {/* Objetivos del Nivel */}
        <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-6 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Target className="mr-3 h-6 w-6" />
            Objetivos del Nivel 2
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <TrendingUp className="h-5 w-5 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Modelo de Negocio Sólido</h3>
                <p className="text-blue-100">Desarrolla un Business Model Canvas validado con IA y metodologías ágiles</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Lightbulb className="h-5 w-5 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Validación Inteligente</h3>
                <p className="text-blue-100">Aprende técnicas de validación rápida y eficiente usando herramientas de IA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sesiones */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Sesiones del Programa</h2>
          
          {sessions.map((session) => (
            <div key={session.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{session.title}</h3>
                      {session.status === 'available' && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          Disponible
                        </span>
                      )}
                      {session.status === 'coming-soon' && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                          Próximamente
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 space-x-4 mb-3">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {session.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {session.time}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{session.description}</p>
                  </div>
                  
                  {session.status === 'available' && (
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
                      <Play className="h-4 w-4" />
                      <span>Ver Grabación</span>
                    </button>
                  )}
                </div>

                {/* Temas */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Temas a cubrir:</h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {session.topics.map((topic, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recursos */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Recursos disponibles:</h4>
                  <div className="flex flex-wrap gap-2">
                    {session.resources.map((resource, index) => (
                      <button 
                        key={index} 
                        className="flex items-center space-x-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                        disabled={session.status !== 'available'}
                      >
                        <Download className="h-3 w-3" />
                        <span>{resource}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-8 text-center text-white mt-8">
          <h2 className="text-2xl font-bold mb-4">¿Listo para ser un Emprendedor Aumentado?</h2>
          <p className="text-lg mb-6">Únete a los emprendedores del Norte de Caldas que están transformando sus ideas en negocios exitosos</p>
          <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Continuar al Nivel 3
          </button>
        </div>
      </div>
    </div>
  );
}
