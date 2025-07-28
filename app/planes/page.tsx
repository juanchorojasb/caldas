"use client"

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Check, Star, Award, Zap, Target, Users } from 'lucide-react'

export default function PlanesPage() {
  const { user } = useUser()
  const router = useRouter()

  const handlePlanSelection = (planId: string) => {
    if (planId === 'programa') {
      // Programa de formación - directo a onboarding
      router.push('/onboarding?plan=programa')
    } else {
      // Planes pagados - a página de pagos
      router.push(`/pago?plan=${planId}`)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando planes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ¡Bienvenido {user.firstName}!
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Elige el plan perfecto para hacer crecer tu negocio
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-blue-800 text-sm">
              <strong>Especial Norte de Caldas:</strong> El programa de formación está disponible 
              completamente gratuito para emprendedores de la región.
            </p>
          </div>
        </div>

        {/* Planes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Plan A - Básico */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="text-center mb-6">
              <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Plan Básico</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">$20,000</div>
              <p className="text-gray-600 text-sm">por mes</p>
            </div>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-sm">
                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                Marketplace para vender
              </li>
              <li className="flex items-center text-sm">
                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                Página de tienda personalizada
              </li>
              <li className="flex items-center text-sm">
                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                Gestión de productos
              </li>
              <li className="flex items-center text-sm">
                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                Soporte básico
              </li>
            </ul>
            
            <button
              onClick={() => handlePlanSelection('basico')}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-semibold transition-colors"
            >
              Elegir Plan
            </button>
          </div>

          {/* Plan B - Completo */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="text-center mb-6">
              <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Plan Completo</h3>
              <div className="text-3xl font-bold text-green-600 mb-2">$50,000</div>
              <p className="text-gray-600 text-sm">por mes</p>
            </div>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-sm">
                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                Todo del Plan Básico
              </li>
              <li className="flex items-center text-sm">
                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                Academia con IA
              </li>
              <li className="flex items-center text-sm">
                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                Herramientas de marketing
              </li>
              <li className="flex items-center text-sm">
                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                Análisis avanzado
              </li>
            </ul>
            
            <button
              onClick={() => handlePlanSelection('completo')}
              className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 font-semibold transition-colors"
            >
              Elegir Plan
            </button>
          </div>

          {/* Plan C - Premium */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="text-center mb-6">
              <Star className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Plan Premium</h3>
              <div className="text-3xl font-bold text-purple-600 mb-2">$120,000</div>
              <p className="text-gray-600 text-sm">por mes</p>
            </div>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-sm">
                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                Todo del Plan Completo
              </li>
              <li className="flex items-center text-sm">
                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                Publicidad destacada
              </li>
              <li className="flex items-center text-sm">
                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                Posicionamiento premium
              </li>
              <li className="flex items-center text-sm">
                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                Soporte prioritario
              </li>
            </ul>
            
            <button
              onClick={() => handlePlanSelection('premium')}
              className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 font-semibold transition-colors"
            >
              Elegir Plan
            </button>
          </div>

          {/* Programa de Formación - DESTACADO */}
          <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-lg shadow-xl p-6 text-white relative transform hover:scale-105 transition-transform">
            <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-bl-lg rounded-tr-lg text-xs font-bold">
              GRATUITO
            </div>
            
            <div className="text-center mb-6">
              <Award className="h-12 w-12 text-yellow-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Programa de Formación</h3>
              <div className="text-2xl font-bold mb-1">
                <span className="line-through text-blue-200 text-lg">$50,000</span>
              </div>
              <div className="text-3xl font-bold text-yellow-300 mb-2">GRATUITO</div>
              <p className="text-blue-100 text-sm">Norte de Caldas</p>
            </div>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-sm">
                <Check className="h-4 w-4 text-yellow-300 mr-2 flex-shrink-0" />
                6 meses de formación integral
              </li>
              <li className="flex items-center text-sm">
                <Check className="h-4 w-4 text-yellow-300 mr-2 flex-shrink-0" />
                Academia IA especializada
              </li>
              <li className="flex items-center text-sm">
                <Check className="h-4 w-4 text-yellow-300 mr-2 flex-shrink-0" />
                Mentorías personalizadas
              </li>
              <li className="flex items-center text-sm">
                <Check className="h-4 w-4 text-yellow-300 mr-2 flex-shrink-0" />
                Tienda online incluida
              </li>
              <li className="flex items-center text-sm">
                <Check className="h-4 w-4 text-yellow-300 mr-2 flex-shrink-0" />
                Red de emprendedores
              </li>
            </ul>
            
            <button
              onClick={() => handlePlanSelection('programa')}
              className="w-full bg-yellow-400 text-blue-900 py-3 rounded-md hover:bg-yellow-300 font-bold transition-colors"
            >
              🎓 Aplicar al Programa
            </button>
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¿No estás seguro qué plan elegir?
          </h2>
          <p className="text-gray-600 mb-6">
            Si eres del Norte de Caldas, te recomendamos empezar con el 
            <span className="font-semibold text-blue-600"> Programa de Formación gratuito</span>. 
            Después puedes cambiar a cualquier plan pagado cuando lo desees.
          </p>
          <div className="flex justify-center items-center space-x-4">
            <Users className="h-6 w-6 text-blue-600" />
            <span className="text-gray-700">Únete a más de 150 emprendedores del Norte de Caldas</span>
          </div>
        </div>
      </div>
    </div>
  )
}
