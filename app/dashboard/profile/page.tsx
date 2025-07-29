'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'

export default function ProfilePage() {
  const { user, isLoaded } = useUser()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    businessName: '',
    businessType: '',
    businessDescription: '',
    municipality: '',
    businessStage: '',
    website: '',
    instagram: '',
    facebook: '',
    whatsapp: ''
  })

  useEffect(() => {
    if (!isLoaded) return

    if (!user) {
      router.push('/sign-in')
      return
    }

    // Cargar datos del usuario desde Clerk
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
phone: String(user.unsafeMetadata?.phone || ''),
businessName: String(user.unsafeMetadata?.businessName || ''),
businessType: String(user.unsafeMetadata?.businessType || ''),
businessDescription: String(user.unsafeMetadata?.businessDescription || ''),
municipality: String(user.unsafeMetadata?.municipality || ''),
businessStage: String(user.unsafeMetadata?.businessStage || ''),
website: String(user.unsafeMetadata?.website || ''),
instagram: String(user.unsafeMetadata?.instagram || ''),
facebook: String(user.unsafeMetadata?.facebook || ''),
whatsapp: String(user.unsafeMetadata?.whatsapp || '')
    })
    
    setLoading(false)
  }, [user, isLoaded, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      // Actualizar datos en Clerk
      await user?.update({
        firstName: formData.firstName,
        lastName: formData.lastName,
        unsafeMetadata: {
          ...user.unsafeMetadata,
          phone: formData.phone,
          businessName: formData.businessName,
          businessType: formData.businessType,
          businessDescription: formData.businessDescription,
          municipality: formData.municipality,
          businessStage: formData.businessStage,
          website: formData.website,
          instagram: formData.instagram,
          facebook: formData.facebook,
          whatsapp: formData.whatsapp
        }
      })

      setMessage('✅ Perfil actualizado exitosamente')
    } catch (error) {
      console.error('Error updating profile:', error)
      setMessage('❌ Error al actualizar perfil')
    } finally {
      setSaving(false)
    }
  }

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Se redirigirá automáticamente
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
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
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {/* Información del usuario desde Clerk */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Información de la cuenta</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Email:</span> {user.emailAddresses[0]?.emailAddress}
                </div>
                <div>
                  <span className="font-medium">Plan:</span> 
{String(user.unsafeMetadata?.plan || 'No seleccionado')}
                </div>
                <div>
                  <span className="font-medium">Miembro desde:</span> {new Date(user.createdAt!).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Última actualización:</span> {new Date(user.updatedAt!).toLocaleDateString()}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {message && (
                <div className={`p-4 rounded-md ${
                  message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  {message}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Apellido</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+57 300 123 4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Municipio *</label>
                  <select
                    value={formData.municipality}
                    onChange={(e) => setFormData({...formData, municipality: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Seleccionar municipio</option>
                    <option value="NEIRA">Neira</option>
                    <option value="ARANZAZU">Aranzazu</option>
                    <option value="PACORA">Pácora</option>
                    <option value="SALAMINA">Salamina</option>
                    <option value="AGUADAS">Aguadas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre del Negocio</label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nombre de tu emprendimiento"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo de Emprendimiento</label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="Tecnología y Software">Tecnología y Software</option>
                    <option value="E-commerce y Marketplace">E-commerce y Marketplace</option>
                    <option value="Productos Artesanales">Productos Artesanales</option>
                    <option value="Servicios Digitales">Servicios Digitales</option>
                    <option value="Agroindustria">Agroindustria</option>
                    <option value="Turismo Local">Turismo Local</option>
                    <option value="Educación y Formación">Educación y Formación</option>
                    <option value="Sostenibilidad y Medio Ambiente">Sostenibilidad y Medio Ambiente</option>
                    <option value="Otros">Otros</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Etapa del Emprendimiento</label>
                  <select
                    value={formData.businessStage}
                    onChange={(e) => setFormData({...formData, businessStage: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Seleccionar etapa</option>
                    <option value="Tengo una idea pero no he empezado">Tengo una idea pero no he empezado</option>
                    <option value="Tengo un proyecto en desarrollo">Tengo un proyecto en desarrollo</option>
                    <option value="Ya tengo un negocio funcionando">Ya tengo un negocio funcionando</option>
                    <option value="Soy emprendedor con experiencia previa">Soy emprendedor con experiencia previa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Sitio Web</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://mi-negocio.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Instagram</label>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="@mi_negocio"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Facebook</label>
                  <input
                    type="text"
                    value={formData.facebook}
                    onChange={(e) => setFormData({...formData, facebook: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="facebook.com/mi-negocio"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">WhatsApp</label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+57 300 123 4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción del Emprendimiento</label>
                <textarea
                  value={formData.businessDescription}
                  onChange={(e) => setFormData({...formData, businessDescription: e.target.value})}
                  rows={4}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe tu emprendimiento, productos o servicios..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {saving ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
