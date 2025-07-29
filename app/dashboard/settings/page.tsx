'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'
import { 
  Bell, 
  Shield, 
  Globe, 
  Mail, 
  Smartphone, 
  Eye, 
  Lock,
  Trash2,
  Download,
  AlertTriangle
} from 'lucide-react'

export default function SettingsPage() {
  const { user, isLoaded } = useUser()
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const [settings, setSettings] = useState({
    // Notificaciones
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    programUpdates: true,
    
    // Privacidad
    profileVisible: true,
    showBusinessInfo: true,
    allowMessages: true,
    
    // Preferencias
    language: 'es',
    timezone: 'America/Bogota',
    currency: 'COP'
  })

  useEffect(() => {
    if (!isLoaded) return
    
    if (!user) {
      router.push('/sign-in')
      return
    }

    // Cargar configuraciones desde Clerk metadata
const userSettings = (user.unsafeMetadata?.settings as Record<string, any>) || {}
    setSettings({
      ...settings,
      ...userSettings
    })
  }, [user, isLoaded, router])

  const handleSaveSettings = async () => {
    setSaving(true)
    setMessage('')

    try {
      await user?.update({
        unsafeMetadata: {
...(user.unsafeMetadata as Record<string, any>),
          settings: settings
        }
      })

      setMessage('✅ Configuraciones guardadas exitosamente')
    } catch (error) {
      console.error('Error saving settings:', error)
      setMessage('❌ Error al guardar configuraciones')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteAccount = () => {
    if (confirm('⚠️ ¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      // Aquí implementarías la lógica de eliminación
      alert('Funcionalidad de eliminación de cuenta estará disponible próximamente.')
    }
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando configuraciones...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Configuraciones</h1>
            <div className="flex items-center space-x-4">
              <UserButton afterSignOutUrl="/" />
              <button
                onClick={() => router.push('/dashboard')}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Volver al Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        {message && (
          <div className={`mb-6 p-4 rounded-md ${
            message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <div className="space-y-6">
          {/* Notificaciones */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center mb-4">
                <Bell className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-lg font-medium text-gray-900">Notificaciones</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Notificaciones por email</h4>
                    <p className="text-sm text-gray-500">Recibe actualizaciones importantes por correo</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Notificaciones SMS</h4>
                    <p className="text-sm text-gray-500">Recibe alertas importantes por mensaje de texto</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.smsNotifications}
                    onChange={(e) => setSettings({...settings, smsNotifications: e.target.checked})}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Emails de marketing</h4>
                    <p className="text-sm text-gray-500">Recibe consejos y noticias sobre emprendimiento</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.marketingEmails}
                    onChange={(e) => setSettings({...settings, marketingEmails: e.target.checked})}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Actualizaciones del programa</h4>
                    <p className="text-sm text-gray-500">Información sobre el programa Norte de Caldas</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.programUpdates}
                    onChange={(e) => setSettings({...settings, programUpdates: e.target.checked})}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Privacidad */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-green-600 mr-3" />
                <h3 className="text-lg font-medium text-gray-900">Privacidad</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Perfil visible</h4>
                    <p className="text-sm text-gray-500">Otros emprendedores pueden ver tu perfil básico</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.profileVisible}
                    onChange={(e) => setSettings({...settings, profileVisible: e.target.checked})}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Mostrar información del negocio</h4>
                    <p className="text-sm text-gray-500">Permitir que otros vean detalles de tu emprendimiento</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.showBusinessInfo}
                    onChange={(e) => setSettings({...settings, showBusinessInfo: e.target.checked})}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Permitir mensajes</h4>
                    <p className="text-sm text-gray-500">Otros usuarios pueden enviarte mensajes directos</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.allowMessages}
                    onChange={(e) => setSettings({...settings, allowMessages: e.target.checked})}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preferencias */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center mb-4">
                <Globe className="h-6 w-6 text-purple-600 mr-3" />
                <h3 className="text-lg font-medium text-gray-900">Preferencias</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Idioma</label>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings({...settings, language: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Zona horaria</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="America/Bogota">Bogotá (GMT-5)</option>
                    <option value="America/New_York">Nueva York (GMT-5)</option>
                    <option value="Europe/Madrid">Madrid (GMT+1)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Moneda</label>
                  <select
                    value={settings.currency}
                    onChange={(e) => setSettings({...settings, currency: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="COP">Peso Colombiano (COP)</option>
                    <option value="USD">Dólar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Información de la cuenta */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center mb-4">
                <Lock className="h-6 w-6 text-gray-600 mr-3" />
                <h3 className="text-lg font-medium text-gray-900">Información de la cuenta</h3>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Email:</span>
                    <p className="text-gray-900">{user.emailAddresses[0]?.emailAddress}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Plan:</span>

<p className="text-gray-900">{String(user.unsafeMetadata?.plan || 'No seleccionado')}</p>                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Miembro desde:</span>
                    <p className="text-gray-900">{new Date(user.createdAt!).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Última actividad:</span>
                    <p className="text-gray-900">{new Date(user.updatedAt!).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Acciones peligrosas */}
          <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-red-400">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                <h3 className="text-lg font-medium text-gray-900">Zona de peligro</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Descargar mis datos</h4>
                    <p className="text-sm text-gray-500">Obtén una copia de toda tu información</p>
                  </div>
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Eliminar cuenta</h4>
                    <p className="text-sm text-gray-500">Eliminar permanentemente tu cuenta y todos los datos</p>
                  </div>
                  <button 
                    onClick={handleDeleteAccount}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Botón guardar */}
          <div className="flex justify-end">
            <button
              onClick={handleSaveSettings}
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {saving ? 'Guardando...' : 'Guardar Configuraciones'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
