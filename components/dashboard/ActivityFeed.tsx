import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Brain, 
  Trophy, 
  Clock,
  CheckCircle2,
  Zap,
  Target
} from 'lucide-react'

interface ActivityItem {
  id: string
  type: 'course' | 'lesson' | 'ai' | 'achievement' | 'streak'
  title: string
  description: string
  timestamp: string
}

interface ActivityFeedProps {
  activities?: ActivityItem[]
  limit?: number
}

export function ActivityFeed({ activities = [], limit = 5 }: ActivityFeedProps) {
  // Datos de ejemplo hasta tener API
  const defaultActivities: ActivityItem[] = [
    {
      id: '1',
      type: 'lesson',
      title: 'Lección completada',
      description: 'Marketing Digital - Fundamentos',
      timestamp: '2h'
    },
    {
      id: '2',
      type: 'ai',
      title: 'Herramienta IA utilizada',
      description: 'Generador de Ideas de Negocio',
      timestamp: '4h'
    },
    {
      id: '3',
      type: 'course',
      title: 'Curso iniciado',
      description: 'Estrategias de Marketing Local',
      timestamp: '1d'
    },
    {
      id: '4',
      type: 'achievement',
      title: 'Logro desbloqueado',
      description: 'Explorador IA - 5 generaciones',
      timestamp: '2d'
    },
    {
      id: '5',
      type: 'streak',
      title: 'Racha mantenida',
      description: '7 días consecutivos de actividad',
      timestamp: '3d'
    }
  ]

  const displayActivities = activities.length > 0 ? activities : defaultActivities
  const limitedActivities = displayActivities.slice(0, limit)

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <BookOpen className="w-4 h-4" />
      case 'lesson':
        return <CheckCircle2 className="w-4 h-4" />
      case 'ai':
        return <Brain className="w-4 h-4" />
      case 'achievement':
        return <Trophy className="w-4 h-4" />
      case 'streak':
        return <Zap className="w-4 h-4" />
      default:
        return <Target className="w-4 h-4" />
    }
  }

  const getActivityVariant = (type: string) => {
    switch (type) {
      case 'course':
        return 'default'
      case 'lesson':
        return 'default'
      case 'ai':
        return 'secondary'
      case 'achievement':
        return 'destructive'
      case 'streak':
        return 'outline'
      default:
        return 'secondary'
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'course':
        return 'text-blue-600 bg-blue-50'
      case 'lesson':
        return 'text-green-600 bg-green-50'
      case 'ai':
        return 'text-purple-600 bg-purple-50'
      case 'achievement':
        return 'text-yellow-600 bg-yellow-50'
      case 'streak':
        return 'text-orange-600 bg-orange-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-500" />
            <span className="font-medium">Actividad Reciente</span>
          </div>
        </div>

        <div className="space-y-3">
          {limitedActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.title}
                  </p>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {activity.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {limitedActivities.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <Target className="w-12 h-12 mx-auto" />
            </div>
            <p className="text-gray-500 text-sm">
              Aún no hay actividad registrada
            </p>
            <p className="text-gray-400 text-xs">
              Comienza un curso o usa una herramienta IA
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
