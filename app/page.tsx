import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-yellow-400">
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            mercado local caldas
          </h1>
          
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <span className="text-2xl mr-3">🤖</span>
            <span className="text-xl font-semibold text-white">
              Transformación Digital con IA para Emprendedores
            </span>
          </div>
          
          <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
            Programa integral de formación en Inteligencia Artificial para emprendedores 
            del Norte de Caldas. Desarrolla tu estrategia de transformación digital usando 
            los modelos de lenguaje más avanzados.
          </p>

          {/* Fechas del programa */}
          <div className="inline-flex items-center bg-yellow-400/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <span className="text-xl mr-3">📅</span>
            <span className="text-lg font-medium text-white">
              Agosto - Septiembre 2025 | Sesiones en Vivo Semanales
            </span>
          </div>
        </div>

        {/* Respaldo Oficial */}
        <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              🏛️ Proyecto Oficial del Departamento de Caldas
            </h2>
            <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Somos uno de los **13 proyectos ganadores** del Fondo de Cofinanciación de 
              Ciencia, Tecnología e Innovación de Caldas 2024, respaldado por la Gobernación 
              y administrado por FUEEEC.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Proyecto #4</h3>
              <p className="text-white/80 text-sm">
                Transformación del modelo de negocio de **50 emprendedores** del Norte de Caldas 
                hacia la nueva economía digital.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Respaldo FUEEEC</h3>
              <p className="text-white/80 text-sm">
                Fundación Universidad Empresa Estado del Eje Cafetero - 26 años articulando 
                academia, sector productivo y estado.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Política Pública CTeI</h3>
              <p className="text-white/80 text-sm">
                Alineado con la Política Pública de Ciencia, Tecnología e Innovación 
                "Caldas Equitativa, Productiva y Sustentable" 2023-2033.
              </p>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h4 className="text-xl font-bold text-white mb-2">
                  💡 Enfoque en Nueva Economía Digital
                </h4>
                <p className="text-white/90 text-sm leading-relaxed">
                  Nuestro programa desarrolla competencias específicas en **estrategia empresarial**, 
                  **modelos de negocio**, **mercadeo digital** y **publicidad digital**, todo potenciado 
                  con **Inteligencia Artificial** para maximizar la competitividad y productividad 
                  de los emprendedores caldenses.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-bold mb-2">
                  GANADOR 2024
                </div>
                <p className="text-white/70 text-xs">
                  Fondo de Cofinanciación CTeI
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Metodología Principal */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            🎯 Metodología de Transformación Digital
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">1. Branding con IA</h3>
              <p className="text-white/80 text-sm">
                Construye tu identidad de marca usando modelos de lenguaje para 
                naming, propuesta de valor y storytelling empresarial.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">2. Modelo de Negocio</h3>
              <p className="text-white/80 text-sm">
                Estrategia empresarial con Strategyzer, Business Model Canvas, 
                mapas de empatía y validación usando IA.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🛒</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">3. Marketing Digital</h3>
              <p className="text-white/80 text-sm">
                Comercio electrónico, estrategias de contenido, automatización 
                y ventas potenciadas con Inteligencia Artificial.
              </p>
            </div>
          </div>
        </div>

        {/* Niveles de Formación */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white text-center mb-8">
            🚀 Nuestras Formaciones en Inteligencia Artificial
          </h2>
          <p className="text-xl text-white/90 text-center mb-12 max-w-4xl mx-auto">
            Desbloquea tu potencial emprendedor con nuestros programas de IA, 
            diseñados para cada etapa de desarrollo empresarial.
          </p>

          <div className="space-y-8">
            
            {/* Nivel 1 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-all duration-300">
              <div className="flex flex-col lg:flex-row items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">NIVEL 1</span>
                    <span className="text-2xl">🌱</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Fundamentos de IA para Emprendedores
                  </h3>
                  <p className="text-white/80 mb-4">
                    Establece las bases para dialogar con la IA de manera efectiva. 
                    Domina el arte de los prompts para desarrollar tu branding y propuesta de valor.
                  </p>
                  <div className="space-y-2 text-sm text-white/70 mb-4">
                    <div>• M0: Desmitificando la IA para Emprendedores</div>
                    <div>• M1: Universo de LLMs y Estrategia de Marca</div>
                    <div>• M2: Prompts Ganadores para Branding</div>
                    <div>• Taller: Identidad de Marca con IA</div>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Pre-Semilla</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Semilla</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all">
                    Iniciar Nivel 1
                  </button>
                  <span className="text-xs text-white/60 text-center">4 sesiones en vivo</span>
                </div>
              </div>
            </div>

            {/* Nivel 2 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-all duration-300">
              <div className="flex flex-col lg:flex-row items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">NIVEL 2</span>
                    <span className="text-2xl">📈</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    El Emprendedor Aumentado
                  </h3>
                  <p className="text-white/80 mb-4">
                    Aplica IA para crear tu modelo de negocio. Usa Business Model Canvas, 
                    mapas de empatía y validación de mercado con modelos de lenguaje.
                  </p>
                  <div className="space-y-2 text-sm text-white/70 mb-4">
                    <div>• M1: Business Model Canvas con IA</div>
                    <div>• M2: Mapas de Empatía y Validación</div>
                    <div>• M3: Strategyzer y Metodologías Lean</div>
                    <div>• Proyecto: Tu Modelo de Negocio Definitivo</div>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Temprana</span>
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">Crecimiento</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition-all">
                    Iniciar Nivel 2
                  </button>
                  <span className="text-xs text-white/60 text-center">4 sesiones en vivo</span>
                </div>
              </div>
            </div>

            {/* Nivel 3 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-all duration-300">
              <div className="flex flex-col lg:flex-row items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">NIVEL 3</span>
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Marketing Digital y E-commerce con IA
                  </h3>
                  <p className="text-white/80 mb-4">
                    Automatiza tu estrategia comercial. Crea contenido, optimiza conversiones 
                    y desarrolla tu tienda online usando Inteligencia Artificial.
                  </p>
                  <div className="space-y-2 text-sm text-white/70 mb-4">
                    <div>• M1: Estrategia de Contenidos con IA</div>
                    <div>• M2: E-commerce y Automatización</div>
                    <div>• M3: CRM Inteligente y Ventas</div>
                    <div>• Proyecto: Tienda Digital Automatizada</div>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">Consolidación</span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded">Escalamiento</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all">
                    Iniciar Nivel 3
                  </button>
                  <span className="text-xs text-white/60 text-center">4 sesiones en vivo</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Principal */}
        <div className="text-center mb-16">
          <Link
            href="/auth/register"
            className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-12 py-4 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 hover:scale-105"
          >
            <span className="text-2xl mr-3">🤖</span>
            Comenzar Mi Transformación Digital
          </Link>
        </div>

        {/* Municipios participantes */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-white text-center mb-6">
            🗺️ Norte de Caldas - Municipios Participantes
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 text-sm text-white/80">
            <div className="text-center p-2 bg-white/10 rounded">Neira</div>
            <div className="text-center p-2 bg-white/10 rounded">Aranzazu</div>
            <div className="text-center p-2 bg-white/10 rounded">Pácora</div>
            <div className="text-center p-2 bg-white/10 rounded">Salamina</div>
          </div>
        </div>

        {/* Estado del proyecto */}
        <div className="text-center">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
            <span className="text-2xl mr-3">🎯</span>
            <span className="text-lg font-semibold text-white">
              Programa de Transformación Digital IA - Agosto-Septiembre 2025
            </span>
          </div>
        </div>

        {/* Acceso rápido para usuarios existentes */}
        <div className="text-center mt-8">
          <p className="text-white/70 mb-4">¿Ya tienes una cuenta?</p>
          <Link
            href="/auth/login"
            className="inline-flex items-center text-white hover:text-yellow-200 transition-colors underline underline-offset-4"
          >
            Acceder al Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}