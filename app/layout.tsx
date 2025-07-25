import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MercadoLocal Caldas',
  description: 'Marketplace y Academia para emprendedores del Norte de Caldas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider 
signUpFallbackRedirectUrl="/onboarding/planes"
signInFallbackRedirectUrl="/dashboard"
    >
      <html lang="es">
        <body className={inter.className}>
          <header className="bg-white shadow-sm border-b p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold text-blue-600">MercadoLocal</h1>
              <div className="flex items-center gap-4">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                      Iniciar Sesión
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:green-700">
                      Registrarse
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
