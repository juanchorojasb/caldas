'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { 
  CheckCircle, ArrowRight, Users, BookOpen, Award, 
  Building, Star, Clock, Trophy, Target, MapPin
} from 'lucide-react';
import MunicipioSelector from '../../components/MunicipioSelector';

export default function ProgramaPage() {
  const { user } = useUser();
  const router = useRouter();
  const [cargando, setCargando] = useState(false);
  const [paso, setPaso] = useState(1);
  const [formData, setFormData] = useState({
    municipio: '',
    tipoEmprendimiento: '',
    experiencia: '',
    motivacion: '',
    compromiso: false
  });

  const tiposEmprendimiento = [
    'Tecnología y Software',
    'E-commerce y Marketplace',
    'Productos Artesanales',
    'Servicios Digitales',
    'Agroindustria',
    'Turismo Local',
    'Educación y Formación',
    'Sostenibilidad y Medio Ambiente',
    'Otros'
  ];

  const municipiosNorteCaldas = [
    { id: 'neira', nombre: 'Neira' },
    { id: 'aranzazu', nombre: 'Aranzazu' },
    { id: 'salamina', nombre: 'Salamina' },
    { id: 'pacora', nombre: 'Pácora' },
    { id: 'aguadas', nombre: 'Aguadas' }
  ];

  const handleContinuar = () => {
    if (paso === 1 && formData.municipio) {
      setPaso(2);
    } else if (paso === 2 && formData.tipoEmprendimiento && formData.experiencia) {
      setPaso(3);
    }
  };

  const confirmarPrograma = async () => {
    setCargando(true);
    
    try {
      await user?.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          plan: 'programa',
          programaConfirmado: new Date().toISOString(),
          programaData: formData,
          estado: 'activo'
        }
      });

      // Redirigir al dashboard en lugar del admin
      router.push('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      setCargando(false);
    }
  };

  if (paso === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header con información del programa */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 text-white">
              <div className="text-center">
                <Award className="w-16 h-16 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-2">
                  Programa de Formación en Emprendimiento Digital
                </h1>
                <p className="text-xl opacity-90">
                  Norte de Caldas - Convocatoria Especial 2025
                </p>
              </div>
            </div>

            <div className="p-8">
              {/* Información de la convocatoria */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 mb-6">
                <div className="flex items-start">
                  <Building className="w-8 h-8 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-blue-800 mb-2">
                      🎯 Programa Gratuito Financiado por Caldas
                    </h3>
                    <p className="text-blue-700 mb-3">
                      Este programa es <strong>100% gratuito</strong> gracias a los recursos del 
                      <strong> Fondo Nacional de Financiamiento para la Ciencia, Tecnología e Innovación 
                      "Francisco José de Caldas"</strong> y la <strong>Secretaría de Desarrollo, 
                      Empleo e Innovación de Caldas</strong>, en el marco de la estrategia de 
                      fortalecimiento del ecosistema de emprendimiento del Norte de Caldas.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-green-700">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Financiado por Minciencias</span>
                      </div>
                      <div className="flex items-center text-green-700">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Respaldado por Gobernación de Caldas</span>
                      </div>
                      <div className="flex items-center text-green-700">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Solo 50 cupos disponibles</span>
                      </div>
                      <div className="flex items-center text-green-700">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>10 emprendedores por municipio</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detalles del programa */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center bg-gray-50 rounded-lg p-6">
                  <Clock className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Duración</h3>
                  <p className="text-gray-600">6 meses intensivos</p>
                  <p className="text-sm text-gray-500">Enero - Junio 2025</p>
                </div>
                <div className="text-center bg-gray-50 rounded-lg p-6">
                  <Users className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Modalidad</h3>
                  <p className="text-gray-600">Presencial + Virtual</p>
                  <p className="text-sm text-gray-500">Flexibilidad garantizada</p>
                </div>
                <div className="text-center bg-gray-50 rounded-lg p-6">
                  <Trophy className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Certificación</h3>
                  <p className="text-gray-600">Oficial Minciencias</p>
                  <p className="text-sm text-gray-500">Reconocimiento nacional</p>
                </div>
              </div>

              {/* Componentes del programa */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                    Academia de Emprendimiento Digital
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Inteligencia Artificial para emprendedores
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Marketing digital y redes sociales
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      E-commerce y ventas online
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Finanzas y modelo de negocio
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Herramientas digitales avanzadas
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-green-600" />
                    Acompañamiento Especializado
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Mentorías semanales grupales
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Sesiones 1:1 quincenales
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Red de emprendedores regional
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Acceso a inversores locales
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Tienda online profesional
                    </li>
                  </ul>
                </div>
              </div>

              {/* Valor del programa */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 text-center mb-8">
                <Star className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Valor del Programa Completo
                </h3>
                <div className="text-4xl font-bold mb-2">
                  <span className="line-through text-gray-400">$8,500,000</span>
                  <span className="text-green-600 ml-4">GRATUITO</span>
                </div>
                <p className="text-gray-600">
                  Financiado 100% por el Fondo Francisco José de Caldas y la Gobernación
                </p>
              </div>
            </div>
          </div>

          {/* Formulario de registro */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Paso 1: Selecciona tu Municipio
            </h2>
            
            <MunicipioSelector 
              onMunicipioChange={(municipio) => setFormData({...formData, municipio})}
              municipioSeleccionado={formData.municipio}
            />

            <div className="mt-8 text-center">
              <button
                onClick={handleContinuar}
                disabled={!formData.municipio}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continuar <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (paso === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Paso 2: Cuéntanos sobre tu Emprendimiento
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  ¿En qué área está tu emprendimiento? *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tiposEmprendimiento.map((tipo) => (
                    <button
                      key={tipo}
                      type="button"
                      onClick={() => setFormData({...formData, tipoEmprendimiento: tipo})}
                      className={`p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                        formData.tipoEmprendimiento === tipo
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : 'border-gray-200 hover:border-green-300 hover:bg-green-25'
                      }`}
                    >
                      {tipo}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  ¿Cuál es tu nivel de experiencia emprendiendo? *
                </label>
                <div className="space-y-3">
                  {[
                    'Tengo una idea pero no he empezado',
                    'Tengo un proyecto en desarrollo',
                    'Ya tengo un negocio funcionando',
                    'Soy emprendedor con experiencia previa'
                  ].map((nivel) => (
                    <button
                      key={nivel}
                      type="button"
                      onClick={() => setFormData({...formData, experiencia: nivel})}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                        formData.experiencia === nivel
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      {nivel}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setPaso(1)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Volver
              </button>
              <button
                onClick={handleContinuar}
                disabled={!formData.tipoEmprendimiento || !formData.experiencia}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 disabled:opacity-50"
              >
                Continuar <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Paso 3: Confirmación y Compromiso
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                ¿Por qué quieres participar en este programa?
              </label>
              <textarea
                value={formData.motivacion}
                onChange={(e) => setFormData({...formData, motivacion: e.target.value})}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                rows={4}
                placeholder="Cuéntanos tu motivación y qué esperas del programa..."
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-800 mb-4">
                📋 Resumen de tu aplicación:
              </h3>
              <div className="space-y-2 text-blue-700">
                <p><strong>Municipio:</strong> {municipiosNorteCaldas.find(m => m.id === formData.municipio)?.nombre}</p>
                <p><strong>Área de emprendimiento:</strong> {formData.tipoEmprendimiento}</p>
                <p><strong>Nivel de experiencia:</strong> {formData.experiencia}</p>
              </div>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="compromiso"
                checked={formData.compromiso}
                onChange={(e) => setFormData({...formData, compromiso: e.target.checked})}
                className="mt-1 mr-3 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="compromiso" className="text-sm text-gray-700">
                <strong>Me comprometo a:</strong> Participar activamente en el programa por 6 meses, 
                asistir a las sesiones programadas, implementar los aprendizajes en mi emprendimiento 
                y contribuir al fortalecimiento del ecosistema emprendedor del Norte de Caldas.
              </label>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setPaso(2)}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Volver
            </button>
            <button
              onClick={confirmarPrograma}
              disabled={!formData.compromiso || cargando}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              {cargando ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Confirmando aplicación...
                </div>
              ) : (
                <div className="flex items-center">
                  🎓 Aplicar al Programa
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
