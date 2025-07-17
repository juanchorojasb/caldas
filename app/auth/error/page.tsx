import { Suspense } from 'react'
import { ErrorPageContent } from './ErrorPageContent'

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Error de Autenticación
          </h2>
        </div>
        
        {/* ✅ ARREGLO: Envolver componente que usa useSearchParams en Suspense */}
        <Suspense fallback={
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Cargando...</p>
          </div>
        }>
          <ErrorPageContent />
        </Suspense>
        
        <div className="text-center">
          <a
            href="/auth/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Volver al inicio de sesión
          </a>
        </div>
      </div>
    </div>
  )
}