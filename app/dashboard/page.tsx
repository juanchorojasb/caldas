'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    
    if (!userData || !isLoggedIn) {
      router.push('/auth/login')
      return
    }
    
    setUser(JSON.parse(userData))
  }, [router])

  if (!user) {
    return <div className="p-8">Cargando...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              🎓 Academia Mercado Local Caldas
            </h1>
            <button
              onClick={() => {
                localStorage.removeItem('user')
                localStorage.removeItem('isLoggedIn')
                router.push('/auth/login')
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                ¡Bienvenido, {user.email}!
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    🤖 Herramientas IA
                  </h3>
                  <p className="text-blue-700 mb-4">
                    Generador de contenido, branding y más
                  </p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Acceder
                  </button>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
  <h3 className="text-lg font-semibold text-green-900 mb-2">
    📚 Cursos
  </h3>
  <p className="text-green-700 mb-4">
    Formación para emprendedores
  </p>
  {/* ✅ BOTÓN CONVERTIDO A ENLACE */}
  <a
    href="https://psicognitiva.thinkific.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
  >
    Ver Cursos
  </a>
</div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">
                    👤 Mi Perfil
                  </h3>
                  <p className="text-purple-700 mb-4">
                    Configuración de cuenta
                  </p>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                    Editar Perfil
                  </button>
                </div>
              </div>

              <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-800">🎉 ¡LOGIN FUNCIONANDO!</h4>
                <p className="text-yellow-700">
                  Usuario: {user.email} | ID: {user.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
