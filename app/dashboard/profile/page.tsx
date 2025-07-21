'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
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
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/auth/login')
      return
    }

    const userInfo = JSON.parse(userData)
    fetchProfile(userInfo.id)
  }, [router])

  const fetchProfile = async (userId: string) => {
    try {
      const response = await fetch(`/api/profile?userId=${userId}`)
      const data = await response.json()
      
      if (data.user) {
        setUser(data.user)
        setFormData({
          firstName: data.user.firstName || '',
          lastName: data.user.lastName || '',
          phone: data.user.phone || '',
          businessName: data.user.businessName || '',
          businessType: data.user.businessType || '',
          businessDescription: data.user.businessDescription || '',
          municipality: data.user.municipality || '',
          businessStage: data.user.businessStage || '',
          website: data.user.website || '',
          instagram: data.user.instagram || '',
          facebook: data.user.facebook || '',
          whatsapp: data.user.whatsapp || ''
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, ...formData })
      })

      const data = await response.json()
      
      if (data.success) {
        setMessage('✅ Perfil actualizado exitosamente')
        // Actualizar localStorage
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
        localStorage.setItem('user', JSON.stringify({ ...currentUser, ...formData }))
      } else {
        setMessage('❌ Error al actualizar perfil')
      }
    } catch (error) {
      setMessage('❌ Error de conexión')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="p-8">Cargando perfil...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Volver al Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Apellido</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Municipio</label>
                  <select
                    value={formData.municipality}
                    onChange={(e) => setFormData({...formData, municipality: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo de Negocio</label>
                  <input
                    type="text"
                    value={formData.businessType}
                    onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Ej: Restaurante, Tienda, Servicios"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Etapa del Negocio</label>
                  <select
                    value={formData.businessStage}
                    onChange={(e) => setFormData({...formData, businessStage: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Seleccionar etapa</option>
                    <option value="PRE_SEMILLA">Pre-semilla</option>
                    <option value="SEMILLA">Semilla</option>
                    <option value="TEMPRANA">Temprana</option>
                    <option value="CRECIMIENTO">Crecimiento</option>
                    <option value="CONSOLIDACION">Consolidación</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Sitio Web</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Instagram</label>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="@usuario"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Facebook</label>
                  <input
                    type="text"
                    value={formData.facebook}
                    onChange={(e) => setFormData({...formData, facebook: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="facebook.com/pagina"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">WhatsApp</label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="+57 300 123 4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción del Negocio</label>
                <textarea
                  value={formData.businessDescription}
                  onChange={(e) => setFormData({...formData, businessDescription: e.target.value})}
                  rows={4}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Describe tu negocio..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
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
