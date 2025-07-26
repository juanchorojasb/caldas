"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function CaldrasPage() {
  const [formData, setFormData] = useState({
    // Información personal
    nombre: '',
    email: '',
    telefono: '',
    municipio: '',
    
    // Información del emprendimiento
    nombreNegocio: '',
    etapaDesarrollo: '',
    sectorcategoria: '',
    tiempoExperiencia: '',
    numeroEmpleados: '',
    
    // Historia y presencia digital
    historiaMarca: '',
    sitioWeb: '',
    facebook: '',
    instagram: '',
    tiktok: '',
    linkedin: '',
    
    // Desafíos y objetivos
    principalesDesafios: '',
    objetivos6meses: '',
    
    // Expectativas del programa
    expectativasPrograma: '',
    aceptaTerminos: false
  });

  const municipios = [
    'Neira', 'Pacora', 'Aranzazu', 'Salamina', 'Aguadas'
  ];

  const etapasDesarrollo = [
    'Idea/Concepto (Pre-semilla)',
    'Validación de mercado (Semilla temprana)', 
    'Producto mínimo viable (Semilla)',
    'Primeras ventas (Crecimiento temprano)',
    'Negocio establecido (Crecimiento)',
    'Expansión/Escalamiento (Madurez)'
  ];

  const sectores = [
    'Agricultura y Ganadería',
    'Alimentos y Bebidas', 
    'Artesanías y Manualidades',
    'Belleza y Cuidado Personal',
    'Comercio y Retail',
    'Construcción y Arquitectura',
    'Educación y Capacitación',
    'Salud y Bienestar',
    'Servicios Profesionales',
    'Tecnología e Innovación',
    'Turismo y Hospitalidad',
    'Transporte y Logística',
    'Otro'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Inscripción exitosa! Te contactaremos en las próximas 24 horas.');
    console.log('Formulario completo:', formData);
  };

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🌟 Programa Norte de Caldas
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-4">
            Programa oficial de formación en Ciencia, Tecnología e Innovación financiado por la 
            <strong> Secretaría de Desarrollo, Empleo e Innovación de Caldas</strong>. 
            6 meses de transformación digital empresarial con metodologías internacionales, 
            herramientas de IA y acompañamiento integral.
          </p>
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-green-800 font-semibold">
              ✅ <strong>18 emprendedores ya inscritos</strong> | Convocatoria abierta hasta el 8 de agosto
            </p>
          </div>
        </div>

        {/* Cronograma del programa */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-4">📅</div>
            <h3 className="font-semibold text-lg mb-2">Cronograma</h3>
            <div className="text-sm text-gray-600">
              <p><strong>Inscripciones:</strong> Hasta 8 agosto</p>
              <p><strong>Entrevistas:</strong> 9-11 agosto</p>
              <p><strong>Inicio:</strong> 12 agosto 2025</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-4">🎓</div>
            <h3 className="font-semibold text-lg mb-2">Academia 5 Niveles</h3>
            <div className="text-sm text-gray-600">
              <p>Fundamentos • Validación</p>
              <p>Modelo • Marketing • Finanzas</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-4">🛠️</div>
            <h3 className="font-semibold text-lg mb-2">Herramientas IA</h3>
            <div className="text-sm text-gray-600">
              <p>Business Canvas • ChatBot</p>
              <p>Evaluador • Marketplace</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl mb-4">🧠</div>
            <h3 className="font-semibold text-lg mb-2">Gestión Emocional</h3>
            <div className="text-sm text-gray-600">
              <p>Programa especializado</p>
              <p>Alianza Psicognitiva</p>
            </div>
          </div>
        </div>

        {/* Información detallada del programa */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
            📋 Sobre el Programa
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-600">🎯 Objetivo Principal</h3>
              <p className="text-gray-700 mb-6">
                Fortalecer las capacidades digitales en la región Norte de Caldas a través de una plataforma 
                de formación innovadora que integra metodologías internacionales, herramientas de inteligencia 
                artificial y acompañamiento personalizado para la transformación digital empresarial.
              </p>

              <h3 className="text-xl font-semibold mb-4 text-purple-600">📚 Metodología de Transformación Digital</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-2 mr-3 mt-1">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Branding con IA</h4>
                    <p className="text-sm text-gray-600">Construcción de identidad digital y propuesta de valor</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-2 mr-3 mt-1">
                    <span className="text-green-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Modelo de Negocio</h4>
                    <p className="text-sm text-gray-600">Business Model Canvas y validación de mercado</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-orange-100 rounded-full p-2 mr-3 mt-1">
                    <span className="text-orange-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Marketing Digital</h4>
                    <p className="text-sm text-gray-600">Estrategias de posicionamiento y ventas digitales</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-red-600">🛠️ Herramientas de IA Incluidas</h3>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="bg-blue-500 text-white rounded-lg p-3 mb-2">💡</div>
                    <h5 className="font-semibold text-sm">Generador de Ideas</h5>
                    <p className="text-xs text-gray-600">Ideas de negocio personalizadas</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-500 text-white rounded-lg p-3 mb-2">📝</div>
                    <h5 className="font-semibold text-sm">Creador de Contenido</h5>
                    <p className="text-xs text-gray-600">Posts y marketing automatizado</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-500 text-white rounded-lg p-3 mb-2">📊</div>
                    <h5 className="font-semibold text-sm">Análisis de Mercado</h5>
                    <p className="text-xs text-gray-600">Estudios de competencia</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-orange-500 text-white rounded-lg p-3 mb-2">💼</div>
                    <h5 className="font-semibold text-sm">Plan de Negocios</h5>
                    <p className="text-xs text-gray-600">Canvas y estrategias completas</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-indigo-600">🎓 5 Niveles de Formación</h3>
              <div className="space-y-2">
                <div className="bg-blue-50 border-l-4 border-blue-400 p-3">
                  <h4 className="font-semibold text-blue-800">Nivel 1: Fundamentos IA</h4>
                  <p className="text-sm text-blue-600">Bases de inteligencia artificial para emprendedores</p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-400 p-3">
                  <h4 className="font-semibold text-green-800">Nivel 2: Emprendedor Aumentado</h4>
                  <p className="text-sm text-green-600">Uso práctico de herramientas IA en el negocio</p>
                </div>
                <div className="bg-purple-50 border-l-4 border-purple-400 p-3">
                  <h4 className="font-semibold text-purple-800">Nivel 3: Modelo de Negocio</h4>
                  <p className="text-sm text-purple-600">Canvas, validación y estructuración empresarial</p>
                </div>
                <div className="bg-orange-50 border-l-4 border-orange-400 p-3">
                  <h4 className="font-semibold text-orange-800">Nivel 4: Marketing Digital</h4>
                  <p className="text-sm text-orange-600">Estrategias de posicionamiento y ventas online</p>
                </div>
                <div className="bg-red-50 border-l-4 border-red-400 p-3">
                  <h4 className="font-semibold text-red-800">Nivel 5: Finanzas y Escalamiento</h4>
                  <p className="text-sm text-red-600">Gestión financiera y crecimiento empresarial</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            📝 Formulario de Inscripción
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Información Personal */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">👤 Información Personal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => updateField('nombre', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.telefono}
                    onChange={(e) => updateField('telefono', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="300 123 4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Municipio *
                  </label>
                  <select
                    required
                    value={formData.municipio}
                    onChange={(e) => updateField('municipio', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecciona tu municipio</option>
                    {municipios.map(muni => (
                      <option key={muni} value={muni}>{muni}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Información del Emprendimiento */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-600">🚀 Tu Emprendimiento</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Negocio/Idea *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nombreNegocio}
                      onChange={(e) => updateField('nombreNegocio', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Nombre de tu empresa o idea"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Etapa de Desarrollo *
                    </label>
                    <select
                      required
                      value={formData.etapaDesarrollo}
                      onChange={(e) => updateField('etapaDesarrollo', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecciona la etapa</option>
                      {etapasDesarrollo.map(etapa => (
                        <option key={etapa} value={etapa}>{etapa}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sector/Categoría *
                    </label>
                    <select
                      required
                      value={formData.sectorcategoria}
                      onChange={(e) => updateField('sectorcategoria', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecciona el sector</option>
                      {sectores.map(sector => (
                        <option key={sector} value={sector}>{sector}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiempo en el Negocio
                    </label>
                    <select
                      value={formData.tiempoExperiencia}
                      onChange={(e) => updateField('tiempoExperiencia', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecciona</option>
                      <option value="Menos de 6 meses">Menos de 6 meses</option>
                      <option value="6 meses - 1 año">6 meses - 1 año</option>
                      <option value="1 - 2 años">1 - 2 años</option>
                      <option value="2 - 5 años">2 - 5 años</option>
                      <option value="Más de 5 años">Más de 5 años</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Empleados
                    </label>
                    <select
                      value={formData.numeroEmpleados}
                      onChange={(e) => updateField('numeroEmpleados', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecciona</option>
                      <option value="Solo yo">Solo yo</option>
                      <option value="2-5 empleados">2-5 empleados</option>
                      <option value="6-10 empleados">6-10 empleados</option>
                      <option value="11-20 empleados">11-20 empleados</option>
                      <option value="Más de 20">Más de 20</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Historia de tu Marca *
                  </label>
                  <textarea
                    required
                    value={formData.historiaMarca}
                    onChange={(e) => updateField('historiaMarca', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Cuéntanos cómo nació tu idea, qué problema resuelve, qué te motivó a emprender..."
                  />
                </div>
              </div>
            </div>

            {/* Presencia Digital */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-purple-600">🌐 Presencia Digital</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sitio Web
                  </label>
                  <input
                    type="url"
                    value={formData.sitioWeb}
                    onChange={(e) => updateField('sitioWeb', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://tusitio.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook
                  </label>
                  <input
                    type="text"
                    value={formData.facebook}
                    onChange={(e) => updateField('facebook', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="@tunegocio"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram
                  </label>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => updateField('instagram', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="@tunegocio"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    TikTok
                  </label>
                  <input
                    type="text"
                    value={formData.tiktok}
                    onChange={(e) => updateField('tiktok', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="@tunegocio"
                  />
                </div>
              </div>
            </div>

            {/* Objetivos y Expectativas */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-orange-600">🎯 Objetivos y Expectativas</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Principales Desafíos de tu Negocio *
                  </label>
                  <textarea
                    required
                    value={formData.principalesDesafios}
                    onChange={(e) => updateField('principalesDesafios', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: Conseguir clientes, financiación, marketing digital, gestión del tiempo..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Qué esperas lograr en los próximos 6 meses? *
                  </label>
                  <textarea
                    required
                    value={formData.objetivos6meses}
                    onChange={(e) => updateField('objetivos6meses', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Objetivos específicos, metas de ventas, lanzamientos, expansión..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Qué esperas específicamente de este programa? *
                  </label>
                  <textarea
                    required
                    value={formData.expectativasPrograma}
                    onChange={(e) => updateField('expectativasPrograma', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Herramientas, conocimientos, contactos, mentoría que buscas..."
                  />
                </div>
              </div>
            </div>

            {/* Términos y Condiciones */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-red-600">📋 Términos y Condiciones</h3>
              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <h4 className="font-semibold mb-3 text-gray-800">Compromiso de Participación</h4>
                <div className="text-sm text-gray-700 space-y-2">
                  <p>• <strong>Dedicación mínima:</strong> Me comprometo a dedicar al menos <strong>2 horas semanales</strong> al programa durante los 6 meses de duración.</p>
                  <p>• <strong>Asistencia:</strong> Participaré activamente en las sesiones programadas y actividades del programa.</p>
                  <p>• <strong>Uso de herramientas:</strong> Haré uso responsable de las herramientas de IA y plataforma educativa proporcionadas.</p>
                  <p>• <strong>Confidencialidad:</strong> Mantendré la confidencialidad de la información compartida por otros participantes.</p>
                  <p>• <strong>Aplicación de conocimientos:</strong> Me comprometo a aplicar los conocimientos adquiridos en mi emprendimiento.</p>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    required
                    checked={formData.aceptaTerminos}
                    onChange={(e) => updateField('aceptaTerminos', e.target.checked)}
                    className="mr-3 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded mt-1"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    <strong>Acepto los términos y condiciones</strong> y me comprometo a dedicar al menos 2 horas semanales al programa durante los 6 meses de duración. Entiendo que este compromiso es fundamental para mi éxito en el programa. *
                  </span>
                </label>
              </div>
            </div>

            {/* Botón de envío */}
            <div className="text-center pt-6">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white px-12 py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:via-purple-700 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
              >
                🚀 Inscribirme al Programa Norte de Caldas
              </button>
              <p className="text-sm text-gray-500 mt-4">
                * Te contactaremos en las próximas 24 horas para confirmar tu inscripción
              </p>
            </div>
          </form>
        </div>

        {/* Programa complementario de Gestión Emocional */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8 mb-12 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              🧠 Programa Complementario: Gestión Emocional para Empresarios
            </h2>
            <p className="text-lg opacity-90">
              <strong>Exclusivo para participantes inscritos en el Programa Norte de Caldas</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Alianza Estratégica con Psicognitiva
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Programa especializado para desarrollar inteligencia emocional, resiliencia y 
                liderazgo efectivo en tu emprendimiento. Disponible como complemento una vez 
                inscrito en el programa principal.
              </p>
              
              <h4 className="text-lg font-semibold mb-4">📚 Módulos del Programa:</h4>
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span>Inteligencia Emocional Empresarial</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span>Liderazgo y Gestión de Equipos</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span>Comunicación Efectiva y Persuasión</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span>Manejo del Estrés y Resiliencia</span>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-sm text-center">
                  <strong>⚠️ Acceso exclusivo:</strong> Para acceder a este programa complementario, 
                  primero debes inscribirte y ser seleccionado en el Programa Norte de Caldas.
                </p>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4">¿Por qué es importante?</h3>
              <div className="space-y-4 text-sm">
                <div className="bg-white/10 rounded-lg p-3">
                  <p><strong>90%</strong> de los emprendimientos fracasan por factores emocionales y falta de resiliencia</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p><strong>Estrés y ansiedad</strong> son los principales obstáculos del empresario exitoso</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p><strong>Liderazgo emocional</strong> mejora hasta un 40% la productividad del equipo</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p><strong>Resiliencia</strong> te permite superar crisis y adaptarte a cambios del mercado</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-500/20 rounded-lg border border-yellow-400/30">
                <h4 className="font-semibold mb-2">🏆 Beneficios Clave:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Mejor toma de decisiones bajo presión</li>
                  <li>• Mayor productividad personal</li>
                  <li>• Relaciones empresariales sólidas</li>
                  <li>• Certificación Psicognitiva</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Links útiles */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              ¿Ya tienes cuenta en MercadoLocal?
            </h2>
            <p className="text-lg mb-6">
              Explora nuestras herramientas empresariales mientras esperamos el inicio del programa
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/herramientas"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                🛠️ Herramientas IA
              </Link>
              <Link 
                href="/academia"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                🎓 Academia
              </Link>
              <Link 
                href="/marketplace"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                🏪 Marketplace
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
