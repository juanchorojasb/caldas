"use client"

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'

export default function OnboardingContent() {
  const { user } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan')
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    telefono: '',
    municipio: '',
    nombreNegocio: '',
    nombreTienda: '',
    etapa: '',
    sector: '',
    desafios: '',
    objetivos: '',
    planSeleccionado: plan || 'programa'
  })

  const isPrograma = plan === 'programa'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          userId: user?.id,
          email: user?.emailAddresses[0]?.emailAddress,
          firstName: user?.firstName,
          lastName: user?.lastName
        })
      })
      
      if (response.ok) {
        if (isPrograma) {
          router.push('/dashboard?bienvenida=programa')
        } else {
          router.push('/dashboard?bienvenida=marketplace')
        }
      }
    } catch (error) {
      console.error('Error saving onboarding:', error)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando información del usuario...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          {isPrograma ? (
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-6 px-8 rounded-lg mb-6">
              <h1 className="text-4xl font-bold mb-2">
                ¡Bienvenido al Programa {user.firstName}!
              </h1>
              <p className="text-xl text-blue-100">
                Programa de Formación Empresarial - Norte de Caldas
              </p>
              <p className="text-lg text-blue-200 mt-2">
                6 meses de formación integral - Completamente gratuito
              </p>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 px-8 rounded-lg mb-6">
              <h1 className="text-4xl font-bold mb-2">
                ¡Bienvenido {user.firstName}!
              </h1>
              <p className="text-xl text-blue-100">
                MercadoLocal Caldas - Marketplace
              </p>
            </div>
          )}
          <p className="text-lg text-gray-600">
            Completa tu información para personalizar tu experiencia
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                Información Personal
              </span>
              <span className={`text-sm font-medium ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                Tu Negocio
              </span>
              <span className={`text-sm font-medium ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                {isPrograma ? 'Objetivos del Programa' : 'Configuración'}
              </span>
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                  📋 Información Personal
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <input 
                      type="tel" 
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.telefono}
                      onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                      placeholder="300 123 4567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isPrograma ? 'Municipio del Norte de Caldas *' : 'Municipio *'}
                    </label>
                    <select 
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.municipio}
                      onChange={(e) => setFormData({...formData, municipio: e.target.value})}
                    >
                      <option value="">Selecciona tu municipio</option>
                      <option value="manizales">Manizales</option>
                      <option value="villamaria">Villa María</option>
                      <option value="chinchina">Chinchiná</option>
                      <option value="palestina">Palestina</option>
                      <option value="santarosa">Santa Rosa de Cabal</option>
                      <option value="marsella">Marsella</option>
                      <option value="dosquebradas">Dosquebradas</option>
                      <option value="pereira">Pereira</option>
                      <option value="neira">Neira</option>
                      <option value="anserma">Anserma</option>
                      <option value="risaralda">Risaralda</option>
                    </select>
                  </div>
                </div>
                
                <div className="text-right">
                  <button 
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 text-lg font-semibold"
                    disabled={!formData.telefono || !formData.municipio}
                  >
                    Continuar →
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                  🏢 Tu Negocio
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del negocio *
                    </label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.nombreNegocio}
                      onChange={(e) => setFormData({...formData, nombreNegocio: e.target.value})}
                      placeholder="Nombre de tu negocio"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sector empresarial *
                    </label>
                    <select 
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.sector}
                      onChange={(e) => setFormData({...formData, sector: e.target.value})}
                    >
                      <option value="">Selecciona sector</option>
                      <option value="alimentos">Alimentos y Bebidas</option>
                      <option value="textil">Textil y Confección</option>
                      <option value="artesanias">Artesanías</option>
                      <option value="servicios">Servicios</option>
                      <option value="tecnologia">Tecnología</option>
                      <option value="turismo">Turismo</option>
                      <option value="agricultura">Agricultura</option>
                      <option value="comercio">Comercio</option>
                      <option value="construccion">Construcción</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Etapa actual de tu negocio *
                    </label>
                    <select 
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.etapa}
                      onChange={(e) => setFormData({...formData, etapa: e.target.value})}
                    >
                      <option value="">Selecciona etapa</option>
                      <option value="idea">Tengo una idea de negocio</option>
                      <option value="inicio">Negocio en etapa inicial (menos de 1 año)</option>
                      <option value="crecimiento">Negocio en crecimiento (1-3 años)</option>
                      <option value="consolidado">Negocio consolidado (+3 años)</option>
                      <option value="expansion">Buscando expandir o digitalizar</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="bg-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-400 font-semibold"
                  >
                    ← Anterior
                  </button>
                  <button 
                    type="button"
                    onClick={() => setStep(3)}
                    className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 font-semibold"
                    disabled={!formData.nombreNegocio || !formData.sector || !formData.etapa}
                  >
                    Continuar →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                  {isPrograma ? '🎯 Objetivos del Programa de Formación' : '⚙️ Configuración Final'}
                </h2>
                
                {isPrograma && (
                  <div className="bg-blue-50 p-6 rounded-lg mb-6">
                    <h3 className="font-semibold text-blue-900 mb-2">
                      Programa de Formación Empresarial - Norte de Caldas
                    </h3>
                    <p className="text-blue-700 text-sm">
                      6 meses de formación integral con academia IA, mentorías personalizadas 
                      y herramientas para digitalizar y hacer crecer tu negocio.
                    </p>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isPrograma 
                      ? '¿Cuáles son tus principales objetivos con este programa? *'
                      : '¿Cuáles son tus objetivos con MercadoLocal? *'
                    }
                  </label>
                  <textarea 
                    required
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.objetivos}
                    onChange={(e) => setFormData({...formData, objetivos: e.target.value})}
                    placeholder={isPrograma 
                      ? "Ejemplo: Quiero digitalizar mi negocio, aprender marketing digital, aumentar mis ventas online, conectar con más clientes..."
                      : "Ejemplo: Quiero vender online, llegar a más clientes, digitalizar mi negocio..."
                    }
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Cuáles son tus principales desafíos empresariales? (Opcional)
                  </label>
                  <textarea 
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.desafios}
                    onChange={(e) => setFormData({...formData, desafios: e.target.value})}
                    placeholder="Ejemplo: Falta de presencia digital, dificultad para llegar a nuevos clientes, necesidad de herramientas tecnológicas..."
                  />
                </div>
                
                <div className="flex justify-between">
                  <button 
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-400 font-semibold"
                  >
                    ← Anterior
                  </button>
                  <button 
                    type="submit"
                    className={`px-8 py-3 rounded-md text-lg font-semibold ${
                      isPrograma 
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                    disabled={!formData.objetivos}
                  >
                    {isPrograma ? '🎉 Completar Registro al Programa' : '🚀 Completar Registro'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
