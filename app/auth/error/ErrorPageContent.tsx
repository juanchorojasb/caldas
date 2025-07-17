'use client'

import { useSearchParams } from 'next/navigation'

export function ErrorPageContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  // Mapeo de errores comunes de NextAuth
  const errorMessages: Record<string, string> = {
    Configuration: 'Error de configuración del servidor. Contacta al administrador.',
    AccessDenied: 'Acceso denegado. No tienes permisos para acceder a este recurso.',
    Verification: 'Error de verificación. El enlace puede haber expirado o ser inválido.',
    Default: 'Ha ocurrido un error durante la autenticación. Inténtalo nuevamente.',
    CredentialsSignin: 'Credenciales incorrectas. Verifica tu email y contraseña.',
    EmailSignin: 'Error al enviar el email de verificación. Verifica tu dirección de correo.',
    Callback: 'Error en el proceso de autenticación. Inténtalo nuevamente.',
    OAuthSignin: 'Error al iniciar sesión con el proveedor OAuth.',
    OAuthCallback: 'Error en el callback de OAuth. Verifica la configuración.',
    OAuthCreateAccount: 'Error al crear cuenta con OAuth. La cuenta puede ya existir.',
    EmailCreateAccount: 'Error al crear cuenta con email. El email puede ya estar registrado.',
    SessionRequired: 'Sesión requerida. Debes iniciar sesión para continuar.',
    Signin: 'Error general de inicio de sesión.',
    OAuthAccountNotLinked: 'Esta cuenta OAuth no está vinculada. Usa el método original de registro.',
  }

  const errorMessage = error ? (errorMessages[error] || errorMessages.Default) : errorMessages.Default

  // Función para obtener sugerencias según el tipo de error
  const getSuggestion = (errorCode: string | null): string => {
    switch (errorCode) {
      case 'CredentialsSignin':
        return 'Verifica que tu email y contraseña sean correctos. Si olvidaste tu contraseña, puedes restablecerla.'
      case 'AccessDenied':
        return 'Tu cuenta puede estar desactivada o no tener los permisos necesarios.'
      case 'OAuthAccountNotLinked':
        return 'Intenta iniciar sesión con el mismo método que usaste originalmente para registrarte.'
      case 'EmailCreateAccount':
        return 'Este email ya está registrado. Intenta iniciar sesión en su lugar.'
      default:
        return 'Si el problema persiste, contacta a nuestro equipo de soporte.'
    }
  }

  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <div className="text-center">
        {/* Icono de error */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
          <svg 
            className="h-6 w-6 text-red-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
        </div>

        {/* Título y mensaje de error */}
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-900">
            Error de Autenticación
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              {errorMessage}
            </p>
          </div>
          
          {/* Sugerencia específica */}
          <div className="mt-3">
            <p className="text-xs text-gray-500 italic">
              {getSuggestion(error)}
            </p>
          </div>
        </div>

        {/* Código de error (si existe) */}
        {error && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <p className="text-xs text-gray-500">
              Código de error: <span className="font-mono font-medium text-gray-700">{error}</span>
            </p>
          </div>
        )}

        {/* Acciones disponibles */}
        <div className="mt-6 space-y-3">
          <a
            href="/auth/login"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Intentar iniciar sesión nuevamente
          </a>
          
          <a
            href="/auth/register"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Crear nueva cuenta
          </a>
          
          <a
            href="/"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Ir al inicio
          </a>
        </div>

        {/* Información de contacto y ayuda */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <p className="text-xs text-gray-500">
            ¿Necesitas ayuda? Contacta a nuestro equipo de soporte:
          </p>
          <div className="mt-2 space-y-1">
            <p className="text-xs">
              <a 
                href="mailto:soporte@mercadolocal.co" 
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                soporte@mercadolocal.co
              </a>
            </p>
            <p className="text-xs text-gray-400">
              Academia Mercado Local Caldas - Norte de Caldas
            </p>
          </div>
        </div>

        {/* Información técnica para debugging (solo en desarrollo) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-2 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-xs text-yellow-700">
              <strong>Debug Info:</strong> Error code: {error || 'No error code'}, 
              URL: {typeof window !== 'undefined' ? window.location.href : 'N/A'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}