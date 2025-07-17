import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  if (!session) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center">
                <span className="text-xl font-bold text-primary-600">mercado</span>
                <span className="text-xl font-bold text-secondary-600">local</span>
                <span className="ml-2 text-sm text-gray-500">/ dashboard</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Hola, {session.user?.name}
              </span>
              <Link 
                href="/dashboard/profile"
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Mi Perfil
              </Link>
              <Link 
                href="/api/auth/signout"
                className="text-sm text-red-600 hover:text-red-700"
              >
                Cerrar Sesión
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}