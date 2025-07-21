'use client'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function ResetPasswordForm() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    if (!token) {
      setError('Token no encontrado')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      })

      const data = await response.json()

      if (data.success) {
        setMessage(data.message)
        setTimeout(() => {
          router.push('/auth/login')
        }, 3000)
      } else {
        setError(data.error || 'Error al restablecer contraseña')
      }
    } catch (error) {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded">
        Token no encontrado en la URL
      </div>
    )
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {message && (
        <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded">
          {message}
          <p className="text-sm mt-1">Redirigiendo al login...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Nueva contraseña
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Mínimo 8 caracteres"
          minLength={8}
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirmar contraseña
        </label>
        <input
          id="confirmPassword"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Confirma tu contraseña"
          minLength={8}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? 'Restableciendo...' : 'Restablecer contraseña'}
      </button>
    </form>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Restablecer contraseña
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ingresa tu nueva contraseña
          </p>
        </div>
        
        <Suspense fallback={<div>Cargando...</div>}>
          <ResetPasswordForm />
        </Suspense>

        <div className="text-center">
          <Link
            href="/auth/login"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            ← Volver al login
          </Link>
        </div>
      </div>
    </div>
  )
}
