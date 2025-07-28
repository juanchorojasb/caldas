'use client';

import { useUser } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { 
  BookOpen, Users, Trophy, Star, ArrowRight, 
  Calendar, MessageCircle, TrendingUp, Target,
  MapPin, Clock, Award
} from 'lucide-react';

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [planUsuario, setPlanUsuario] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && user) {
      const plan = user.unsafeMetadata?.plan as string;
      setPlanUsuario(plan);
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const isProgramaGratuito = planUsuario === 'programa';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">MercadoLocal</h1>
              <span className="ml-3 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {isProgramaGratuito ? 'Programa de Formación' : 'Plan Premium'}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                ¡Hola, {user?.firstName || 'Emprendedor'}!
              </span>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isProgramaGratuito ? (
          /* Dashboard para Programa de Formación */
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                🎓 Tu Programa de Formación
              </h2>
              <p className="text-gray-600">
                Bienvenido al programa gratuito del Norte de Caldas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Progreso</p>
                    <p className="text-2xl font-semibold text-gray-900">15%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Próxima Sesión</p>
                    <p className="text-2xl font-semibold text-gray-900">Lun 3</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Compañeros</p>
                    <p className="text-2xl font-semibold text-gray-900">48</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Trophy className="w-8 h-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Logros</p>
                    <p className="text-2xl font-semibold text-gray-900">3</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  📚 Tu Ruta de Aprendizaje
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      ✓
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">Módulo 1: Fundamentos IA</p>
                      <p className="text-sm text-gray-600">Completado</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      2
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">Módulo 2: Marketing Digital</p>
                      <p className="text-sm text-gray-600">En progreso</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      3
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">Módulo 3: E-commerce</p>
                      <p className="text-sm text-gray-600">Próximamente</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  🎯 Próximas Actividades
                </h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="font-medium text-gray-900">Mentoría Grupal</p>
                    <p className="text-sm text-gray-600">Lunes 3 Feb - 2:00 PM</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="font-medium text-gray-900">Taller IA Práctica</p>
                    <p className="text-sm text-gray-600">Miércoles 5 Feb - 10:00 AM</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <p className="font-medium text-gray-900">Networking Regional</p>
                    <p className="text-sm text-gray-600">Viernes 7 Feb - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Dashboard para otros planes */
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                🚀 Tu Marketplace
              </h2>
              <p className="text-gray-600">
                Panel de control de tu negocio en MercadoLocal
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Ventas Este Mes</p>
                    <p className="text-2xl font-semibold text-gray-900">$850K</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Target className="w-8 h-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Productos</p>
                    <p className="text-2xl font-semibold text-gray-900">12</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Clientes</p>
                    <p className="text-2xl font-semibold text-gray-900">246</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Star className="w-8 h-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Rating</p>
                    <p className="text-2xl font-semibold text-gray-900">4.8</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🛍️ Acciones Rápidas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Target className="w-6 h-6 text-blue-600 mr-3" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Agregar Producto</p>
                    <p className="text-sm text-gray-600">Sube un nuevo producto</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
                </button>
                
                <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <MessageCircle className="w-6 h-6 text-green-600 mr-3" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Mensajes</p>
                    <p className="text-sm text-gray-600">5 mensajes nuevos</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
                </button>
                
                <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <TrendingUp className="w-6 h-6 text-purple-600 mr-3" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Estadísticas</p>
                    <p className="text-sm text-gray-600">Ver analíticas</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
