'use client'

import { useSearchParams } from 'next/navigation'

const plansData = {
  plan_a: { name: 'Plan Básico', price: 20000 },
  plan_b: { name: 'Plan Profesional', price: 50000 },
  plan_c: { name: 'Plan Premium', price: 120000 }
}

export default function PagoPage() {
  const searchParams = useSearchParams()
  const planId = searchParams.get('plan') as keyof typeof plansData
  const plan = plansData[planId] || { name: 'Plan no encontrado', price: 0 }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4">Pagar {plan.name}</h1>
        <div className="text-2xl text-blue-600 mb-6">
          ${plan.price.toLocaleString('es-CO')} COP
        </div>
        
        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h3 className="font-semibold mb-2">Instrucciones de Pago:</h3>
          <p>Transfiere ${plan.price.toLocaleString('es-CO')} a Nequi: 300-123-4567</p>
        </div>

        <button 
          onClick={() => alert('Pago confirmado!')}
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700"
        >
          Ya realicé el pago
        </button>
      </div>
    </div>
  )
}
