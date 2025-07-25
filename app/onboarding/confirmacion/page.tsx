'use client'

import { useUser } from '@clerk/nextjs'
import { Clock, CheckCircle, MessageCircle, ArrowRight } from 'lucide-react'

export default function ConfirmacionPage() {
  const { user } = useUser()
  
  const planData = {
    plan_a: { name: 'Plan Básico', price: 20000, features: ['Marketplace'] },
    plan_b: { name: 'Plan Profesional', price: 50000, features: ['Marketplace', 'Academia'] },
    plan_c: { name: 'Plan Premium', price: 120000, features: ['Marketplace', 'Academia', 'Publicidad'] }
  }

  const selectedPlan = user?.publicMetadata?.selectedPlan as keyof typeof planData
  const plan = planData[selectedPlan]
  const paymentStatus = user?.publicMetadata?.paymentStatus

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="mb-8">
            <Clock className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              ¡Pago en Verificación!
            </h1>
            <p className="text-gray-600">
              Hola <span className="font-semibold">{user?.firstName}</span>, 
              estamos verificando tu pago
            </p>
          </div>

          {plan && (
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {plan.name}
              </h3>
              <div className="text-2xl font-bold text-blue-600 mb-4">
                ${plan.price.toLocaleString()} COP
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {plan.features.map((feature, index) => (
                  <span 
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center text-green-600">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Pago enviado correctamente</span>
            </div>
            <div className="flex items-center justify-center text-yellow-600">
              <Clock className="w-5 h-5 mr-2" />
              <span>En verificación (máximo 24 horas)</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h4 className="font-semibold text-blue-900 mb-2">¿Qué sigue?</h4>
            <ul className="text-sm text-blue-800 space-y-2 text-left">
              <li>• Verificaremos tu pago en las próximas 24 horas</li>
              <li>• Te enviaremos un email cuando sea aprobado</li>
              <li>• Podrás acceder inmediatamente a tu plan</li>
              <li>• Si hay problemas, te contactaremos</li>
            </ul>
          </div>

          <div className="space-y-4">
            
              href={`https://wa.me/573001234567?text=Hola! Quiero consultar el estado de mi pago del ${plan?.name}. Usuario: ${user?.emailAddresses[0]?.emailAddress}`}
              target="_blank"
              className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Consultar Estado por WhatsApp
            </a>

            <button
              onClick={() => window.location.href = '/dashboard'}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-5 h-5" />
              Ir al Dashboard (modo de espera)
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            Horario de verificación: Lunes a Viernes 8:00 AM - 6:00 PM
          </p>
        </div>
      </div>
    </div>
  )
}
