import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthRedirect from './components/AuthRedirect'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MercadoLocal - Norte de Caldas',
  description: 'Marketplace y Academia para emprendedores del Norte de Caldas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      afterSignUpUrl="/onboarding/planes"
      afterSignInUrl="/dashboard"
    >
      <html lang="es">
        <body className={inter.className}>
          <AuthRedirect />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
