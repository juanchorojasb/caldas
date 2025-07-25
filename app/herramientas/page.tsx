import Link from 'next/link';

export default function HerramientasPage() {
  const herramientas = [
    {
      titulo: "📊 Business Model Canvas",
      descripcion: "Construye tu modelo de negocio con metodología Strategyzer adaptada al Norte de Caldas",
      link: "/herramientas/modelo",
      color: "from-orange-500 to-red-500"
    },
    {
      titulo: "💡 Evaluador de Ideas",
      descripcion: "Recibe análisis personalizado de tu idea de negocio para la región",
      link: "/herramientas/ideas", 
      color: "from-purple-500 to-pink-500"
    },
    {
      titulo: "🤖 Asistente de Orientación",
      descripcion: "Tu guía personalizada para el programa Norte de Caldas",
      link: "/herramientas/orientacion",
      color: "from-green-500 to-blue-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🛠️ Herramientas Empresariales
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Suite completa de herramientas diseñadas específicamente para emprendedores 
            del Norte de Caldas. Construye, evalúa y perfecciona tu negocio.
          </p>
        </div>

        {/* Herramientas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {herramientas.map((herramienta, index) => (
            <Link key={index} href={herramienta.link}>
              <div className="group cursor-pointer">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                  <div className={`h-32 bg-gradient-to-r ${herramienta.color} flex items-center justify-center`}>
                    <div className="text-6xl text-white opacity-80">
                      {herramienta.titulo.split(' ')[0]}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {herramienta.titulo}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {herramienta.descripcion}
                    </p>
                    <div className="mt-4 inline-flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-800">
                      Abrir herramienta
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
