"use client"

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

function PagoContent() {
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan')
  const { user } = useUser()

  const planInfo = {
    basico: { name: 'Plan Básico', price: '$20,000', features: 'Marketplace básico' },
    completo: { name: 'Plan Completo', price: '$50,000', features: 'Marketplace + Academia' },
    premium: { name: 'Plan Premium', price: '$120,000', features: 'Todo + Publicidad premium' }
  }

  const currentPlan = planInfo[plan as keyof typeof planInfo]

  if (!currentPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Plan no encontrado</h1>
          <a href="/planes" className="text-blue-600 hover:underline">Volver a planes</a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Pago - {currentPlan.name}
          </h1>
          
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-2">
              {currentPlan.name}
            </h2>
            <p className="text-blue-700 mb-2">{currentPlan.features}</p>
            <p className="text-2xl font-bold text-blue-900">{currentPlan.price}/mes</p>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Para completar tu suscripción al {currentPlan.name}, 
              realiza el pago mediante QR y envía el comprobante.
            </p>
            
            <div className="bg-gray-100 p-8 rounded-lg mb-6">
              <p className="text-gray-700 text-lg">
                📱 Aquí aparecería el QR de pago<br/>
                (Integración con pasarela de pagos)
              </p>
            </div>
            
            <p className="text-sm text-gray-500 mb-6">
              Una vez realizado el pago, nuestro equipo revisará tu comprobante 
              y activará tu plan en un máximo de 24 horas.
            </p>
            
            <a 
              href="/dashboard" 
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 inline-block"
            >
              Ir al Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PagoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <PagoContent />
    </Suspense>
  )
}
