'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import {
  Home,
  User,
  Menu,
  X,
  LogOut,
  GraduationCap,
  Brain,
  Settings,
  BookOpen,
  Sparkles,
  Award,
  BarChart3,
  Coffee,
  TrendingUp,
  Users,
  Bell,
  Search
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const navigation = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: Home,
    description: 'Resumen y estadísticas'
  },
  {
    href: '/dashboard/courses',
    label: 'Cursos',
    icon: GraduationCap,
    description: 'Academia especializada',
    badge: 'Nuevo'
  },
  {
    href: '/dashboard/ai',
    label: 'IA Tools',
    icon: Brain,
    description: 'Herramientas inteligentes',
    badge: '6'
  },
  {
    href: '/dashboard/profile',
    label: 'Perfil',
    icon: User,
    description: 'Información personal'
  }
]

const quickLinks = [
  {
    href: '/dashboard/courses?category=emprendimiento',
    label: 'Emprendimiento',
    icon: TrendingUp,
    color: 'text-green-600'
  },
  {
    href: '/dashboard/courses?category=cafe',
    label: 'Industria del Café',
    icon: Coffee,
    color: 'text-amber-600'
  },
  {
    href: '/dashboard/ai?tool=business-ideas',
    label: 'Ideas de Negocio',
    icon: Sparkles,
    color: 'text-purple-600'
  },
  {
    href: '/dashboard/ai?tool=content-creator',
    label: 'Contenido IA',
    icon: BookOpen,
    color: 'text-blue-600'
  }
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const user = session?.user

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-full max-w-xs flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">Academia Caldas</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-4 pb-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  </div>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Quick Links Mobile */}
          <div className="border-t px-4 py-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Acceso Rápido</h3>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setSidebarOpen(false)}
                >
                  <link.icon className={`w-4 h-4 ${link.color}`} />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* User section Mobile */}
          <div className="border-t p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name || 'Usuario'}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
            <Button
              onClick={() => signOut()}
              variant="outline"
              size="sm"
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-80 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 shadow-xl">
          <div className="flex h-16 shrink-0 items-center gap-3">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Academia Caldas</span>
          </div>

          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`group flex items-center justify-between rounded-lg p-3 text-sm font-medium transition-colors ${
                            isActive
                              ? 'bg-green-100 text-green-700'
                              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="w-5 h-5" />
                            <div>
                              <div className="font-medium">{item.label}</div>
                              <div className="text-xs text-gray-500">{item.description}</div>
                            </div>
                          </div>
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>

              {/* Quick Links Section */}
              <li>
                <div className="text-xs font-semibold leading-6 text-gray-400 uppercase tracking-wide">
                  Acceso Rápido
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {quickLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-3 rounded-lg p-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <link.icon className={`w-4 h-4 ${link.color}`} />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* User Section */}
              <li className="mt-auto">
                <div className="border-t pt-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user?.name || 'Usuario'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Link href="/dashboard/profile">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Settings className="w-4 h-4 mr-2" />
                        Configuración
                      </Button>
                    </Link>
                    <Button
                      onClick={() => signOut()}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Cerrar Sesión
                    </Button>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-80">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Separator */}
          <div className="h-6 w-px bg-gray-200 lg:hidden" />

          <div className="flex flex-1 items-center justify-between">
            {/* Breadcrumb or Title */}
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {pathname === '/dashboard' && 'Dashboard'}
                  {pathname === '/dashboard/courses' && 'Cursos'}
                  {pathname === '/dashboard/ai' && 'Herramientas IA'}
                  {pathname === '/dashboard/profile' && 'Mi Perfil'}
                  {pathname.startsWith('/dashboard/courses/') && 'Curso'}
                </h1>
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Search className="w-4 h-4" />
              </Button>

              {/* Notifications */}
              <Button variant="outline" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>

              {/* Profile */}
              <div className="hidden sm:flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{user?.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
