import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import Link from "next/link"

export default async function ProfilePage() {
  const session = await auth()
  
  const user = await db.user.findUnique({
    where: { id: session?.user?.id },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      municipality: true,
      businessStage: true,
      businessName: true,
      businessDescription: true,
      businessType: true,
      website: true,
      instagram: true,
      facebook: true,
      whatsapp: true,
      createdAt: true,
      lastLoginAt: true,
    }
  })

  // Parse additional info si existe
  let additionalInfo = {}
  try {
    if (user?.businessType) {
      additionalInfo = JSON.parse(user.businessType)
    }
  } catch (e) {
    // Ignore parsing errors
  }

  const getStageInfo = (stage: string) => {
    const stages: Record<string, { emoji: string, label: string, description: string }> = {
      'PRE_SEMILLA': { emoji: '💡', label: 'Pre-Semilla', description: 'Ideas y conceptos iniciales' },
      'SEMILLA': { emoji: '🌱', label: 'Semilla', description: 'Plan de negocios y prototipos' },
      'TEMPRANA': { emoji: '🚀', label: 'Temprana', description: 'Primeros clientes y ventas' },
      'CRECIMIENTO': { emoji: '📈', label: 'Crecimiento', description: 'Escalando el negocio' },
      'CONSOLIDACION': { emoji: '🏆', label: 'Consolidación', description: 'Empresa establecida' }
    }
    return stages[stage] || { emoji: '🔹', label: stage, description: '' }
  }

  const getMunicipalityName = (municipality: string) => {
    const names: Record<string, string> = {
      'NEIRA': 'Neira',
      'ARANZAZU': 'Aranzazu',
      'PACORA': 'Pácora',
      'SALAMINA': 'Salamina',
      'AGUADAS': 'Aguadas'
    }
    return names[municipality] || municipality
  }

  const stageInfo = getStageInfo(user?.businessStage || '')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
        <Link 
          href="/dashboard"
          className="text-primary-600 hover:text-primary-700 text-sm"
        >
          ← Volver al Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información Personal */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">👤 Información Personal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                <p className="mt-1 text-sm text-gray-900">{user?.firstName} {user?.lastName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                <p className="mt-1 text-sm text-gray-900">{user?.phone || 'No especificado'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Municipio</label>
                <p className="mt-1 text-sm text-gray-900">📍 {getMunicipalityName(user?.municipality || '')}</p>
              </div>
            </div>
          </div>

          {/* Información Empresarial */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">🏢 Información Empresarial</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Etapa del Emprendimiento</label>
                <div className="mt-1 flex items-center">
                  <span className="text-2xl mr-2">{stageInfo.emoji}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{stageInfo.label}</p>
                    <p className="text-xs text-gray-500">{stageInfo.description}</p>
                  </div>
                </div>
              </div>
              
              {user?.businessName && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre del Emprendimiento</label>
                  <p className="mt-1 text-sm text-gray-900">{user.businessName}</p>
                </div>
              )}

              {user?.businessDescription && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Descripción del Negocio</label>
                  <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{user.businessDescription}</p>
                </div>
              )}
            </div>
          </div>

          {/* Presencia Digital */}
          {(user?.website || user?.instagram || user?.facebook || user?.whatsapp) && (
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">🌐 Presencia Digital</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user?.website && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">🌍 Sitio Web</label>
                    <a 
                      href={user.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-1 text-sm text-primary-600 hover:text-primary-700"
                    >
                      {user.website}
                    </a>
                  </div>
                )}
                
                {user?.whatsapp && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">📱 WhatsApp</label>
                    <p className="mt-1 text-sm text-gray-900">{user.whatsapp}</p>
                  </div>
                )}
                
                {user?.instagram && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">📷 Instagram</label>
                    <a 
                      href={`https://instagram.com/${user.instagram}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-1 text-sm text-primary-600 hover:text-primary-700"
                    >
                      @{user.instagram}
                    </a>
                  </div>
                )}
                
                {user?.facebook && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">👥 Facebook</label>
                    <a 
                      href={`https://facebook.com/${user.facebook}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-1 text-sm text-primary-600 hover:text-primary-700"
                    >
                      fb.com/{user.facebook}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Stats */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Mi Cuenta</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Miembro desde</label>
                <p className="text-sm text-gray-900">{user?.createdAt?.toLocaleDateString('es-ES', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
              
              {user?.lastLoginAt && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">Último acceso</label>
                  <p className="text-sm text-gray-900">{user.lastLoginAt.toLocaleDateString('es-ES', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Acciones Rápidas</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                ✏️ Editar Perfil
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                🔔 Configurar Notificaciones
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                🎯 Ver Mis Cursos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}