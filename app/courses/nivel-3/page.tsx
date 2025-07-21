import { Calendar, Clock, Download, Play, Users, Target, ShoppingCart, Zap, TrendingUp } from 'lucide-react';

export default function Nivel3Page() {
  const sessions = [
    {
      id: 1,
      title: "M1: Estrategia de Contenidos con IA",
      date: "10 de Septiembre, 2025",
      time: "7:00 PM - 9:00 PM",
      description: "Domina la creación de contenidos estratégicos usando IA para posicionar tu marca y generar engagement auténtico.",
      topics: [
        "Content Marketing 4.0 con IA",
        "Automatización de creación de contenidos",
        "SEO inteligente y optimización",
        "Calendario editorial automatizado"
      ],
      resources: [
        "Template Estrategia de Contenidos",
        "Prompts para Content Creation",
        "Calendario Editorial IA"
      ],
      status: "available"
    },
    {
      id: 2,
      title: "M2: E-commerce y Automatización",
      date: "17 de Septiembre, 2025",
      time: "7:00 PM - 9:00 PM", 
      description: "Construye tu tienda online inteligente con automatizaciones que optimizan ventas y mejoran la experiencia del cliente.",
      topics: [
        "Plataformas e-commerce modernas",
        "Automatización de ventas con IA",
        "Chatbots y atención al cliente",
        "Optimización de conversiones"
      ],
      resources: [
        "Checklist E-commerce Setup",
        "Templates de Automatización",
        "Guía Chatbots Inteligentes"
      ],
      status: "coming-soon"
    },
    {
      id: 3,
      title: "M3: CRM Inteligente y Ventas",
      date: "24 de Septiembre, 2025",
      time: "7:00 PM - 9:00 PM",
      description: "Implementa sistemas CRM potenciados con IA para automatizar tu embudo de ventas y maximizar la retención de clientes.",
      topics: [
        "CRM inteligente y segmentación",
        "Email marketing automatizado",
        "Análisis predictivo de ventas",
        "Retención y upselling con IA"
      ],
      resources: [
        "Setup CRM Inteligente",
        "Templates Email Marketing",
        "Dashboard Métricas Ventas"
      ],
      status: "coming-soon"
    },
    {
      id: 4,
      title: "Proyecto Final: Tienda Digital Automatizada",
      date: "1 de Octubre, 2025",
      time: "7:00 PM - 9:00 PM",
      description: "Presenta tu tienda digital completa con todas las automatizaciones implementadas y estrategia de crecimiento.",
      topics: [
        "Demo tienda digital funcional",
        "Automatizaciones implementadas",
        "Estrategia de escalamiento",
        "Certificación Norte de Caldas"
      ],
      resources: [
        "Template Presentación E-commerce",
        "Certificado Digital",
        "Plan Escalamiento 6 meses"
      ],
      status: "coming-soon"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Nivel 3: Marketing Digital y E-commerce con IA</h1>
              <p className="text-lg text-gray-600 mt-2">Escala tu negocio con ventas digitales automatizadas</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                Consolidación
              </div>
              <div className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
                Escalamiento
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
              <div className="bg-purple-100 p-2 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
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
              <div className="bg-pink-100 p-2 rounded-lg">
                <Users className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Modalidad</p>
                <p className="font-semibold">Virtual + Grabación</p>
              </div>
            </div>
          </div>
        </div>

        {/* Objetivos del Nivel */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Target className="mr-3 h-6 w-6" />
            Objetivos del Nivel 3
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <ShoppingCart className="h-5 w-5 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">E-commerce Inteligente</h3>
                <p className="text-purple-100">Construye una tienda digital completa con automatizaciones de IA para maximizar ventas</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Zap className="h-5 w-5 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Marketing Automatizado</h3>
                <p className="text-purple-100">Implementa estrategias de marketing digital que funcionan en piloto automático</p>
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
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-700 transition-colors">
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
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
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

        {/* Tecnologías y Herramientas */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tecnologías y Herramientas</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-lg mb-3 inline-block">
                <ShoppingCart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">E-commerce Platforms</h3>
              <p className="text-sm text-gray-600">Shopify, WooCommerce, BigCommerce con IA integrada</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-lg mb-3 inline-block">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Marketing Automation</h3>
              <p className="text-sm text-gray-600">HubSpot, Mailchimp, ActiveCampaign automatizados</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-lg mb-3 inline-block">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Analytics & CRM</h3>
              <p className="text-sm text-gray-600">Google Analytics 4, CRM inteligentes con IA</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl p-8 text-center text-white mt-8">
          <h2 className="text-2xl font-bold mb-4">¡Transforma tu negocio en una máquina de ventas!</h2>
          <p className="text-lg mb-6">Únete a los emprendedores del Norte de Caldas que están escalando sus negocios con e-commerce inteligente</p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Regresar al Dashboard
            </button>
            <button className="bg-pink-600 border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
              Ver Certificación
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
