'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Check, Star, Zap, Users, BookOpen, TrendingUp } from 'lucide-react';

const planes = [
  {
    id: 'basico',
    nombre: 'Plan Básico',
    precio: 20000,
    descripcion: 'Acceso al marketplace para vender tus productos',
    caracteristicas: [
      'Publicación de productos',
      'Perfil de vendedor',
      'Chat con compradores',
      'Estadísticas básicas'
    ],
    icono: Users,
    color: 'bg-blue-500'
  },
  {
    id: 'completo',
    nombre: 'Plan Completo',
    precio: 50000,
    descripcion: 'Marketplace + Academia de emprendimiento',
    caracteristicas: [
      'Todo del Plan Básico',
      'Acceso a Academia IA',
      'Cursos de emprendimiento',
      'Mentoría grupal',
      'Herramientas avanzadas'
    ],
    icono: BookOpen,
    color: 'bg-purple-500',
    popular: true
  },
  {
    id: 'premium',
    nombre: 'Plan Premium',
    precio: 120000,
    descripcion: 'Marketplace + Academia + Publicidad destacada',
    caracteristicas: [
      'Todo del Plan Completo',
      'Publicidad destacada',
      'Mentoría personalizada',
      'Analíticas avanzadas',
      'Soporte prioritario',
      'Certificaciones'
    ],
    icono: Star,
    color: 'bg-gold-500'
  },
  {
    id: 'programa',
    nombre: 'Programa de Formación',
    precio: 0,
    precioOriginal: 8500000,
    descripcion: 'Programa especial GRATUITO para el Norte de Caldas',
    caracteristicas: [
      '6 meses de formación integral',
      'Academia IA especializada',
      'Mentorías personalizadas',
      'Tienda online incluida',
      'Red de emprendedores',
      'Certificación Minciencias'
    ],
    icono: Zap,
    color: 'bg-gradient-to-br from-blue-600 to-green-600',
    gratuito: true,
    destacado: true
  }
];

export default function PlanesPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [cargando, setCargando] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando planes...</p>
        </div>
      </div>
    );
  }

  const seleccionarPlan = async (planId: string) => {
    setCargando(planId);
    setError(null);
    
    try {
      if (user) {
        // Usar unsafeMetadata en lugar de publicMetadata para Clerk v5+
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            plan: planId,
            planSeleccionado: new Date().toISOString()
          }
        });

        // Redirigir según el plan
        if (planId === 'programa') {
          router.push('/onboarding/programa');
        } else {
          router.push(`/onboarding/pago?plan=${planId}`);
        }
      } else {
        throw new Error('Usuario no autenticado');
      }
    } catch (error) {
      console.error('Error al seleccionar plan:', error);
      setError('Error al seleccionar el plan. Por favor intenta de nuevo.');
      setCargando(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ¡Bienvenido a MercadoLocal! 🎉
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Elige el plan perfecto para tu emprendimiento
          </p>
          <p className="text-lg text-green-600 font-semibold">
            Norte de Caldas - Impulsando el emprendimiento local
          </p>
        </div>

        {error && (
          <div className="max-w-md mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-center">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {planes.map((plan) => {
            const IconComponent = plan.icono;
            
            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  plan.destacado ? 'ring-4 ring-green-400 ring-opacity-50' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-purple-500 text-white px-3 py-1 text-sm font-semibold rounded-bl-lg">
                    POPULAR
                  </div>
                )}
                
                {plan.gratuito && (
                  <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 text-sm font-semibold rounded-bl-lg">
                    GRATUITO
                  </div>
                )}

                <div className={`${plan.color} p-6 text-white text-center`}>
                  <IconComponent className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">{plan.nombre}</h3>
                  <div className="text-3xl font-bold">
                    {plan.gratuito ? (
                      <div>
                        <span className="line-through text-sm opacity-75">
                          ${plan.precioOriginal?.toLocaleString()}
                        </span>
                        <div className="text-4xl">GRATIS</div>
                      </div>
                    ) : (
                      `$${plan.precio.toLocaleString()}`
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-6">{plan.descripcion}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.caracteristicas.map((caracteristica, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{caracteristica}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => seleccionarPlan(plan.id)}
                    disabled={cargando === plan.id}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                      plan.gratuito
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white'
                        : plan.popular
                        ? 'bg-purple-500 hover:bg-purple-600 text-white'
                        : 'bg-gray-800 hover:bg-gray-900 text-white'
                    } ${cargando === plan.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {cargando === plan.id ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Procesando...
                      </div>
                    ) : plan.gratuito ? (
                      '🎓 Aplicar al Programa'
                    ) : (
                      `Elegir ${plan.nombre}`
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            ¿Necesitas ayuda para elegir? 
            <a href="https://wa.me/573001234567" className="text-green-600 hover:underline ml-1">
              Contacta con nosotros por WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
