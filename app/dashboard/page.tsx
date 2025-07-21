'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  BookOpen,
  Brain,
  Trophy,
  TrendingUp,
  Target,
  Calendar,
  Zap,
  ChevronRight,
  User
} from 'lucide-react'
import Link from 'next/link'
import { ProgressRing } from '@/components/dashboard/ProgressRing'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'
import { LearningPath } from '@/components/dashboard/LearningPath'

// Importar StreakCounter si está en archivo separado
// import { StreakCounter } from '@/components/dashboard/StreakCounter'

interface DashboardStats {
  user: {
    firstName: string
    lastName: string
    municipality: string
  }
  courses: {
    enrolled: number
    completed: number
    totalProgress: number
    recentCourses: any[]
  }
  ai: {
    generationsToday: number
    totalGenerations: number
    favoriteTools: string[]
  }
  achievements: {
    total: number
    recent: string[]
  }
  streak: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carga de datos hasta tener API
    const mockStats: DashboardStats = {
      user: {
        firstName: 'Juan',
        lastName: 'Pérez',
        municipality: 'Manizales'
      },
      courses: {
        enrolled: 4,
        completed: 2,
        totalProgress: 68,
        recentCourses: []
      },
      ai: {
        generationsToday: 3,
        totalGenerations: 45,
        favoriteTools: ['Generador de Ideas', 'Marketing Strategy']
      },
      achievements: {
        total: 5,
        recent: ['Primer Curso', 'Explorador IA']
      },
      streak: 7
    }

    setTimeout(() => {
      setStats(mockStats)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Buenos días'
    if (hour < 18) return 'Buenas tardes'
    return 'Buenas noches'
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {getGreeting()}, {stats?.user?.firstName}! 👋
          </h1>
          <p className="text-gray-600">
            Continuemos transformando el emprendimiento en {stats?.user?.municipality}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-1">
            <Zap className="w-4 h-4" />
            {stats?.streak || 0} días en racha
          </Badge>
          <Link href="/profile">
            <Button variant="outline" size="sm">
              <User className="w-4 h-4 mr-2" />
              Perfil
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Progreso de Cursos */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <span className="font-medium">Cursos</span>
              </div>
              <Badge>{stats?.courses?.enrolled || 0} activos</Badge>
            </div>
            <div className="text-center">
              <ProgressRing
                progress={stats?.courses?.totalProgress || 0}
                size={80}
                strokeWidth={6}
                color="#3B82F6"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                {stats?.courses?.completed || 0} de {stats?.courses?.enrolled || 0} completados
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Actividad IA */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-500" />
                <span className="font-medium">IA Hoy</span>
              </div>
              <Badge variant="secondary">{stats?.ai?.generationsToday || 0}</Badge>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">
                {stats?.ai?.totalGenerations || 0}
              </div>
              <p className="text-sm text-gray-600">generaciones totales</p>
              <div className="pt-2">
                <p className="text-xs text-gray-500">Herramientas favoritas:</p>
                <p className="text-xs font-medium truncate">
                  {stats?.ai?.favoriteTools?.join(', ') || 'Ninguna aún'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logros */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="font-medium">Logros</span>
              </div>
              <Badge variant="outline">{stats?.achievements?.total || 0}</Badge>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-yellow-600">
                {stats?.achievements?.total || 0}
              </div>
              <p className="text-sm text-gray-600">desbloqueados</p>
              {(stats?.achievements?.recent?.length || 0) > 0 && (
                <div className="pt-2">
                  <p className="text-xs text-gray-500">Recientes:</p>
                  {stats?.achievements?.recent?.map((achievement, i) => (
                    <Badge key={i} variant="outline" className="text-xs mr-1 mb-1">
                      {achievement}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Estadísticas Generales */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="font-medium">Progreso</span>
              </div>
              <Badge variant="default">En alza</Badge>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Esta semana</span>
                <span className="font-semibold">+25%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Actividad</span>
                <span className="font-semibold text-green-600">Alta</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Racha actual</span>
                <span className="font-semibold text-orange-600">{stats?.streak || 0}d</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ruta de Aprendizaje */}
        <div className="lg:col-span-2">
          <LearningPath maxCourses={3} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contador de Racha */}
          <div>
            {/* Aquí iría el StreakCounter si está en archivo separado */}
            {/* <StreakCounter currentStreak={stats?.streak} longestStreak={12} streakData={[]} /> */}

            {/* O versión inline simplificada */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-500" />
                  Racha Diaria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-orange-500 mb-1">
                    {stats?.streak || 0}
                    <span className="text-lg ml-1">días</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    ¡Excelente constancia!
                  </p>
                </div>

                {/* Calendario semanal simplificado */}
                <div className="flex justify-center gap-1 mb-4">
                  {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, i) => (
                    <div key={day} className="text-center">
                      <div className="text-xs text-gray-500 mb-1">{day}</div>
                      <div className={`w-6 h-6 rounded flex items-center justify-center text-xs ${
                        i < 6 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {i < 6 ? '✓' : '○'}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <Button size="sm" className="w-full">
                    <Target className="w-4 h-4 mr-1" />
                    ¡Mantén la racha!
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feed de Actividad */}
          <ActivityFeed limit={5} />
        </div>
      </div>

      {/* Accesos Rápidos */}
      <Card>
        <CardHeader>
          <CardTitle>Accesos Rápidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/courses">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                <BookOpen className="w-6 h-6" />
                <span className="text-sm">Cursos</span>
              </Button>
            </Link>
            <Link href="/ai-tools">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                <Brain className="w-6 h-6" />
                <span className="text-sm">Herramientas IA</span>
              </Button>
            </Link>
            <Link href="/community">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                <Target className="w-6 h-6" />
                <span className="text-sm">Comunidad</span>
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                <User className="w-6 h-6" />
                <span className="text-sm">Mi Perfil</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
