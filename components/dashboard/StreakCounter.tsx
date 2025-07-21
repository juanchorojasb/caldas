import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Flame, Calendar, Target } from 'lucide-react'

interface StreakCounterProps {
  currentStreak: number
  longestStreak: number
  streakData: boolean[] // Últimos 7 días
}

export function StreakCounter({ currentStreak, longestStreak, streakData }: StreakCounterProps) {
  const today = new Date()
  const weekDays = ['D', 'L', 'M', 'M', 'J', 'V', 'S']
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="font-medium">Racha de Actividad</span>
          </div>
          <Badge variant={currentStreak > 0 ? "default" : "secondary"}>
            {currentStreak} días
          </Badge>
        </div>
        
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-orange-500 mb-1">
            {currentStreak}
          </div>
          <div className="text-sm text-gray-600">días consecutivos</div>
        </div>

        <div className="flex justify-center gap-1 mb-4">
          {streakData.map((active, index) => {
            const date = new Date(today)
            date.setDate(date.getDate() - (6 - index))
            const dayIndex = date.getDay()
            
            return (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-500 mb-1">
                  {weekDays[dayIndex]}
                </div>
                <div className={`w-6 h-6 rounded-full ${
                  active ? 'bg-orange-500' : 'bg-gray-200'
                }`} />
              </div>
            )
          })}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Target className="w-4 h-4" />
            <span>Récord: {longestStreak} días</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>Esta semana</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
