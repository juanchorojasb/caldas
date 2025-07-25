'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Check, Star, Zap } from 'lucide-react'

const planes = [
  {
    id: 'plan_a',
    name: 'Plan Básico',
    price: 20000,
    description: 'Solo marketplace',
    features: [
      'Vender productos',
      'Perfil de vendedor',
      'Gestión de inventario',
      'Soporte básico'
    ],
    icon: '🥉',
    color: 'border-gray-300'
  },
  {
    id: 'plan_b', 
    name: 'Plan Profesional',
    price: 50000,
    description: 'Marketplace + academia',
    features: [
      'Todo del Plan Básico',
      'Crear cursos online',
      'Academia personalizada',
      'Analytics avanzados',
      'Soporte prioritario'
    ],
    icon: '🥈',
    color: 'border-blue-500',
    popular: true
  },
  {
    id: 'plan_c',
    name: 'Plan Premium',
    price: 120000, 
    description: 'Todo incluido + publicidad',
    features: [
      'Todo del Plan Profesional',
      'Publicidad en carrusel',
      'Promoción destacada',
      'SEO optimizado',
      'Soporte 24/7',
      'Consultoría mensual'
    ],
    icon: '🥇',
    color: 'border-yellow-500'
  }
]

export default function PlanesPage() {
  const { user } = useUser()
  const [selectedPlan, setSelectedPlan] = useState('')
  const [loading, setLoading] = useState(false)

const handleSelectPlan = async (planId: string) => {
  setLoading(true)
  try {
    // Guardar suscripción en BD
    const response = await fetch('/api/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        selectedPlan: planId,
        email: user?.emailAddresses[0]?.emailAddress,
        name: user?.firstName + ' ' + (user?.lastName || '')
      })
    })

    const result = await response.json()
    
    if (result.success) {
      // Redirect a página de pago
      window.location.href = `/onboarding/pago?plan=${planId}`
    } else {
      alert(`Error: ${result.error}`)
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Error al seleccionar plan')
  } finally {
    setLoading(false)
  }
}
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ¡Bienvenido a MercadoLocal! 🎉
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Hola <span className="font-semibold">{user?.firstName}</span>, selecciona tu plan ideal
          </p>
          <p className="text-gray-500">
            Puedes cambiar o cancelar en cualquier momento
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {planes.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg border-2 ${plan.color} ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Más Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-2">{plan.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </div>

                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-gray-900">
${plan.price.toLocaleString('es-CO')}
                  </span>
                  <span className="text-gray-600 ml-2">/mes</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  } disabled:opacity-50`}
                >
                  {loading ? 'Procesando...' : `Seleccionar ${plan.name}`}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500">
            ¿Tienes preguntas? <a href="https://wa.me/573001234567" className="text-blue-600 hover:underline">Contáctanos por WhatsApp</a>
          </p>
        </div>
      </div>
    </div>
  )
}
