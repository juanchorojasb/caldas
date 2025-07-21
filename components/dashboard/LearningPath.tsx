import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ChevronRight,
  Play,
  CheckCircle2,
  Lock,
  BookOpen,
  Clock
} from 'lucide-react'
import Link from 'next/link'

interface Course {
  id: string
  title: string
  thumbnail: string
  category: string
  progress: number
  isCompleted: boolean
  isEnrolled: boolean
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado'
  duration: string
  lessons: number
  lastAccessed?: string
}

interface LearningPathProps {
  courses?: Course[]
  maxCourses?: number
}

export function LearningPath({ courses = [], maxCourses = 4 }: LearningPathProps) {
  // Datos de ejemplo hasta tener API
  const defaultCourses: Course[] = [
    {
      id: '1',
      title: 'Fundamentos del Marketing Digital',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300',
      category: 'Marketing',
      progress: 75,
      isCompleted: false,
      isEnrolled: true,
      difficulty: 'Principiante',
      duration: '4h 30m',
      lessons: 12,
      lastAccessed: 'Hace 2h'
    },
    {
      id: '2',
      title: 'Estrategias de Ventas Locales',
      thumbnail: 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=300',
      category: 'Ventas',
      progress: 100,
      isCompleted: true,
      isEnrolled: true,
      difficulty: 'Intermedio',
      duration: '3h 15m',
      lessons: 8,
      lastAccessed: 'Ayer'
    },
    {
      id: '3',
      title: 'Innovación y Creatividad Empresarial',
      thumbnail: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=300',
      category: 'Innovación',
      progress: 0,
      isCompleted: false,
      isEnrolled: false,
      difficulty: 'Avanzado',
      duration: '6h 20m',
      lessons: 15
    },
    {
      id: '4',
      title: 'Finanzas para Emprendedores',
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300',
      category: 'Finanzas',
      progress: 25,
      isCompleted: false,
      isEnrolled: true,
      difficulty: 'Intermedio',
      duration: '5h 45m',
      lessons: 18,
      lastAccessed: 'Hace 5 días'
    }
  ]

  const displayCourses = courses.length > 0 ? courses : defaultCourses
  const limitedCourses = displayCourses.slice(0, maxCourses)

  const getDifficultyVariant = (difficulty: string) => {
    switch (difficulty) {
      case 'Principiante':
        return 'default'
      case 'Intermedio':
        return 'secondary'
      case 'Avanzado':
        return 'outline'
      default:
        return 'outline'
    }
  }

  const getStatusIcon = (course: Course) => {
    if (course.isCompleted) {
      return <CheckCircle2 className="w-5 h-5 text-green-600" />
    }
    if (course.isEnrolled) {
      return <Play className="w-5 h-5 text-blue-600" />
    }
    return <Lock className="w-5 h-5 text-gray-400" />
  }

  const getActionButton = (course: Course) => {
    if (course.isCompleted) {
      return (
        <Link href={`/courses/${course.id}`}>
          <Button variant="outline" size="sm" className="text-green-700 border-green-200 hover:bg-green-50">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Completado
          </Button>
        </Link>
      )
    }
    
    if (course.isEnrolled) {
      return (
        <Link href={`/courses/${course.id}`}>
          <Button size="sm">
            {course.progress > 0 ? 'Continuar' : 'Comenzar'}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      )
    }
    
    return (
      <Button variant="outline" size="sm" disabled>
        <Lock className="w-4 h-4 mr-1" />
        Bloqueado
      </Button>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-500" />
          <span className="font-medium">Tu Ruta de Aprendizaje</span>
        </div>
        <Link href="/courses">
          <Button variant="outline" size="sm">
            Ver todos
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>

      {limitedCourses.map((course) => (
        <Card key={course.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex gap-4">
              {/* Thumbnail */}
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="absolute -top-1 -right-1">
                  {getStatusIcon(course)}
                </div>
              </div>

              {/* Contenido */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      {course.title}
                    </h3>
                    
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                      <Badge variant={getDifficultyVariant(course.difficulty)} className="text-xs">
                        {course.difficulty}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {course.lessons} lecciones
                      </span>
                    </div>

                    {/* Progreso */}
                    {course.isEnrolled && (
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                          <span>Progreso</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Último acceso */}
                    {course.lastAccessed && (
                      <p className="text-xs text-gray-400">
                        Último acceso: {course.lastAccessed}
                      </p>
                    )}
                  </div>

                  {/* Acción */}
                  <div className="ml-4">
                    {getActionButton(course)}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {limitedCourses.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <BookOpen className="w-12 h-12 mx-auto" />
            </div>
            <p className="text-gray-500 text-sm mb-2">
              No tienes cursos en progreso
            </p>
            <Link href="/courses">
              <Button variant="outline">
                Explorar cursos
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
