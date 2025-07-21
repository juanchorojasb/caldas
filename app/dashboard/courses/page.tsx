'use client'

import Link from 'next/link'

export default function CoursesPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      
      {/* Header Norte de Caldas */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🏛️</span>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Formaciones Norte de Caldas</h1>
            <p className="text-gray-600">Programa oficial de transformación digital con IA</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">🎯 Proyecto #4 - Norte de Caldas</h2>
              <p className="text-gray-600">50 emprendedores seleccionados • Agosto-Septiembre 2025</p>
              <p className="text-gray-600">Sesiones en vivo: Martes 7:00 PM</p>
            </div>
            <div className="text-right">
              <div className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold">GANADOR 2024</div>
              <div className="text-sm text-gray-600 mt-1">Fondo CTeI Caldas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Formaciones Norte de Caldas */}
      <div className="space-y-8">
        
        {/* NIVEL 1 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <span className="text-4xl">🌱</span>
                <div>
                  <h3 className="text-2xl font-bold">NIVEL 1</h3>
                  <p className="text-lg font-semibold">Fundamentos de IA para Emprendedores</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-80">Agosto 2025</div>
                <div className="font-bold">4 sesiones en vivo</div>
                <div className="text-sm opacity-80">⏰ Martes 7:00 PM</div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <p className="text-gray-600 mb-6 leading-relaxed">
              Establece las bases para dialogar con la IA de manera efectiva. 
              Domina el arte de los prompts para desarrollar tu branding y propuesta de valor.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span>📚</span> Módulos:
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• M0: Desmitificando la IA para Emprendedores</li>
                  <li>• M1: Universo de LLMs y Estrategia de Marca</li>
                  <li>• M2: Prompts Ganadores para Branding</li>
                  <li>• Taller: Identidad de Marca con IA</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span>🎯</span> Etapas:
                </h4>
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">Pre-Semilla</span>
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-semibold">Semilla</span>
                </div>
                <div className="text-gray-600 space-y-1">
                  <div>📅 4 sesiones en vivo</div>
                  <div>⏰ Martes 7:00 PM</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Agosto 2025
              </div>
              <Link href="/courses/nivel-1" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all">
                Acceder al Nivel 1
              </Link>
            </div>
          </div>
        </div>

        {/* NIVEL 2 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <span className="text-4xl">📈</span>
                <div>
                  <h3 className="text-2xl font-bold">NIVEL 2</h3>
                  <p className="text-lg font-semibold">El Emprendedor Aumentado</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-80">Agosto 2025</div>
                <div className="font-bold">4 sesiones en vivo</div>
                <div className="text-sm opacity-80">⏰ Martes 7:00 PM</div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <p className="text-gray-600 mb-6 leading-relaxed">
              Aplica IA para crear tu modelo de negocio. Usa Business Model Canvas, 
              mapas de empatía y validación de mercado con modelos de lenguaje.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span>📚</span> Módulos:
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• M1: Business Model Canvas con IA</li>
                  <li>• M2: Mapas de Empatía y Validación</li>
                  <li>• M3: Strategyzer y Metodologías Lean</li>
                  <li>• Proyecto: Tu Modelo de Negocio Definitivo</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span>🎯</span> Etapas:
                </h4>
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm font-semibold">Temprana</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">Crecimiento</span>
                </div>
                <div className="text-gray-600 space-y-1">
                  <div>📅 4 sesiones en vivo</div>
                  <div>⏰ Martes 7:00 PM</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Agosto 2025
              </div>
              <Link href="/courses/nivel-2" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all">
                Acceder al Nivel 2
              </Link>
            </div>
          </div>
        </div>

        {/* NIVEL 3 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <span className="text-4xl">🚀</span>
                <div>
                  <h3 className="text-2xl font-bold">NIVEL 3</h3>
                  <p className="text-lg font-semibold">Marketing Digital y E-commerce con IA</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-80">Septiembre 2025</div>
                <div className="font-bold">4 sesiones en vivo</div>
                <div className="text-sm opacity-80">⏰ Martes 7:00 PM</div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <p className="text-gray-600 mb-6 leading-relaxed">
              Automatiza tu estrategia comercial. Crea contenido, optimiza conversiones 
              y desarrolla tu tienda online usando Inteligencia Artificial.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span>📚</span> Módulos:
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• M1: Estrategia de Contenidos con IA</li>
                  <li>• M2: E-commerce y Automatización</li>
                  <li>• M3: CRM Inteligente y Ventas</li>
                  <li>• Proyecto: Tienda Digital Automatizada</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span>🎯</span> Etapas:
                </h4>
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold">Consolidación</span>
                  <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">Escalamiento</span>
                </div>
                <div className="text-gray-600 space-y-1">
                  <div>📅 4 sesiones en vivo</div>
                  <div>⏰ Martes 7:00 PM</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Septiembre 2025
              </div>
              <Link href="/courses/nivel-3" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all">
                Acceder al Nivel 3
              </Link>
            </div>
          </div>
        </div>

        {/* HABILIDADES BLANDAS - PSICOGNITIVA */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <span className="text-4xl">🧠</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">🤝 ALIANZA</span>
                  </div>
                  <p className="text-lg font-semibold">Habilidades Blandas para Emprendedores</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-80">Plataforma Externa</div>
                <div className="font-bold">Modalidad Virtual</div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <p className="text-gray-600 mb-6 leading-relaxed">
              Programa complementario en alianza con Psicognitiva. Desarrolla inteligencia emocional, 
              liderazgo y habilidades de comunicación esenciales para el éxito empresarial.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span>📚</span> Módulos:
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Inteligencia Emocional Empresarial</li>
                  <li>• Liderazgo y Gestión de Equipos</li>
                  <li>• Comunicación Efectiva y Persuasión</li>
                  <li>• Manejo del Estrés y Resiliencia</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span>🎯</span> Beneficios:
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Mejor toma de decisiones bajo presión</li>
                  <li>• Liderazgo más efectivo</li>
                  <li>• Mayor productividad personal</li>
                  <li>• Relaciones empresariales sólidas</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">Modalidad Virtual</span>
              <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">Certificación Psicognitiva</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm font-semibold">Complementario a IA</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Plataforma Externa
              </div>
              <a href="https://psicognitiva.thinkific.com/" target="_blank" rel="noopener noreferrer" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all">
                Acceder a Psicognitiva →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Calendario de Sesiones en Vivo */}
      <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-2">
          <span>📅</span> Calendario de Sesiones en Vivo
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="text-green-400 text-2xl font-bold mb-3 flex items-center justify-center gap-2">
              <span>🌱</span> NIVEL 1
            </div>
            <div className="text-gray-800 font-semibold mb-2">Agosto 2025</div>
            <div className="text-gray-600 space-y-1">
              <div>Martes 6, 13, 20, 27</div>
              <div className="font-semibold">7:00 PM - 8:30 PM</div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="text-blue-400 text-2xl font-bold mb-3 flex items-center justify-center gap-2">
              <span>📈</span> NIVEL 2
            </div>
            <div className="text-gray-800 font-semibold mb-2">Agosto-Septiembre 2025</div>
            <div className="text-gray-600 space-y-1">
              <div>Martes 3, 10, 17, 24 Sept</div>
              <div className="font-semibold">7:00 PM - 8:30 PM</div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="text-purple-400 text-2xl font-bold mb-3 flex items-center justify-center gap-2">
              <span>🚀</span> NIVEL 3
            </div>
            <div className="text-gray-800 font-semibold mb-2">Septiembre 2025</div>
            <div className="text-gray-600 space-y-1">
              <div>Martes 1, 8, 15, 22</div>
              <div className="font-semibold">7:00 PM - 8:30 PM</div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <span>🎥</span> Todas las sesiones serán grabadas y estarán disponibles para los participantes
          </p>
        </div>
      </div>
    </div>
  )
}
