'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const municipiosNorteCaldas = [
  { value: 'AGUADAS', label: 'Aguadas' },
  { value: 'ARANZAZU', label: 'Aranzazu' },
  { value: 'NEIRA', label: 'Neira' },
  { value: 'PACORA', label: 'Pácora' },
  { value: 'SALAMINA', label: 'Salamina' }
]

const etapasNegocio = [
  { value: 'PRE_SEMILLA', label: 'Pre-semilla (Idea de negocio)' },
  { value: 'SEMILLA', label: 'Semilla (Validando idea)' },
  { value: 'TEMPRANA', label: 'Temprana (Primeros clientes)' },
  { value: 'CRECIMIENTO', label: 'Crecimiento (Escalando)' },
  { value: 'CONSOLIDACION', label: 'Consolidación (Establecido)' }
]

const tiposNegocio = [
  'Agricultura y Ganadería', 'Agroindustria', 'Artesanías', 'Comercio al por menor',
  'Comercio al por mayor', 'Construcción', 'Educación', 'Entretenimiento',
  'Manufactura', 'Restaurante/Alimentación', 'Salud y Bienestar', 'Servicios',
  'Tecnología', 'Textil y Confección', 'Turismo y Hotelería', 'Transporte', 'Otro'
]

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)

    // ✅ SOLUCIÓN DEFINITIVA: Campos separados desde el inicio
    const data = {
      first_name: (formData.get('first_name') as string).trim(),
      last_name: (formData.get('last_name') as string).trim() || 'N/A', // ✅ Garantizar apellido
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      municipality: formData.get('municipality') as string,
      business_stage: formData.get('business_stage') as string,
      business_name: formData.get('business_name') as string,
      business_type: formData.get('business_type') as string,
      phone: formData.get('phone') as string || '',
      website: formData.get('website') as string || '',
      instagram: formData.get('instagram') as string || '',
      facebook: formData.get('facebook') as string || '',
      whatsapp: formData.get('whatsapp') as string || '',
      accepted_terms: formData.get('acceptedTerms') === 'on'
    }

    console.log('📤 Enviando datos:', data)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      console.log('📥 Respuesta:', result)

      if (result.success) {
        router.push('/auth/login?message=Usuario registrado exitosamente')
      } else {
        setError(result.error || 'Error en el registro')
        console.error('❌ Error detalles:', result.details)
      }
    } catch (error) {
      console.error('❌ Error de red:', error)
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Únete a Academia Mercado Local Caldas
          </CardTitle>
          <CardDescription>
            Crea tu cuenta y accede a herramientas IA especializadas para emprendedores del Norte de Caldas
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ✅ CAMPOS SEPARADOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name">Nombre *</Label>
                <Input id="first_name" name="first_name" type="text" required />
              </div>
              <div>
                <Label htmlFor="last_name">Apellido</Label>
                <Input id="last_name" name="last_name" type="text" placeholder="Opcional" />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" required />
            </div>

            <div>
              <Label htmlFor="password">Contraseña *</Label>
              <Input id="password" name="password" type="password" required minLength={6} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="business_name">Nombre del Negocio *</Label>
                <Input id="business_name" name="business_name" type="text" required />
              </div>
              <div>
                <Label htmlFor="municipality">Municipio del Norte de Caldas *</Label>
                <select
                  id="municipality"
                  name="municipality"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Selecciona tu municipio</option>
                  {municipiosNorteCaldas.map(municipio => (
                    <option key={municipio.value} value={municipio.value}>
                      {municipio.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="business_stage">Etapa del Negocio *</Label>
                <select
                  id="business_stage"
                  name="business_stage"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Selecciona la etapa</option>
                  {etapasNegocio.map(etapa => (
                    <option key={etapa.value} value={etapa.value}>
                      {etapa.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="business_type">Tipo de Negocio *</Label>
                <select
                  id="business_type"
                  name="business_type"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Selecciona el tipo de negocio</option>
                  {tiposNegocio.map(tipo => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" name="phone" type="tel" placeholder="3123456789" />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Presencia Digital (Opcional)</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="website">Sitio Web</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    placeholder="https://ejemplo.com"
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp Business</Label>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    placeholder="3123456789"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    name="instagram"
                    type="text"
                    placeholder="usuario_instagram"
                  />
                </div>
                <div>
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    name="facebook"
                    type="url"
                    placeholder="https://facebook.com/pagina"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <input
                id="acceptedTerms"
                name="acceptedTerms"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <Label htmlFor="acceptedTerms" className="text-sm leading-5">
                Acepto los{' '}
                <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                  términos y condiciones
                </Link>{' '}
                y la{' '}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                  política de privacidad
                </Link>{' '}
                de la Academia Mercado Local Caldas.
              </Label>
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Creando Cuenta...' : 'Crear Mi Cuenta'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <Link href="/auth/login" className="text-blue-600 hover:text-blue-500 font-medium">
                Inicia sesión aquí
              </Link>
            </p>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <div className="text-center space-y-2">
              <div className="flex justify-around text-sm">
                <div>
                  <div className="font-bold text-blue-600">350+</div>
                  <div className="text-gray-600">Emprendedores</div>
                </div>
                <div>
                  <div className="font-bold text-blue-600">5</div>
                  <div className="text-gray-600">Municipios</div>
                </div>
                <div>
                  <div className="font-bold text-blue-600">100%</div>
                  <div className="text-gray-600">Gratuito</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
