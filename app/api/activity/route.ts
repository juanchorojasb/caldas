import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET - Obtener actividades del usuario
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Por ahora simular hasta tener el schema completo
    const mockActivities = [
      {
        id: '1',
        type: 'lesson_complete',
        title: 'Lección completada',
        description: 'Marketing Digital - Fundamentos',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        metadata: { courseId: '1', lessonId: '1' }
      },
      {
        id: '2',
        type: 'ai_generation',
        title: 'Herramienta IA utilizada',
        description: 'Generador de Ideas de Negocio',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        metadata: { aiTool: 'Generador de Ideas' }
      },
      {
        id: '3',
        type: 'course_start',
        title: 'Curso iniciado',
        description: 'Estrategias de Marketing Local',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        metadata: { courseId: '2' }
      },
      {
        id: '4',
        type: 'achievement_unlock',
        title: 'Logro desbloqueado',
        description: 'Explorador IA - 5 generaciones',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        metadata: { achievementId: 'ai_explorer' }
      },
      {
        id: '5',
        type: 'streak',
        title: 'Racha mantenida',
        description: '7 días consecutivos de actividad',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        metadata: { streakDays: 7 }
      }
    ]

    // Filtrar por límite
    const activities = mockActivities.slice(0, limit)

    // Estadísticas simuladas
    const stats = {
      totalActivities: mockActivities.length,
      activitiesThisWeek: 12,
      activitiesToday: 2,
      mostActiveDay: 'Lunes',
      averagePerDay: 1.8
    }

    return NextResponse.json({
      activities,
      stats
    })

  } catch (error) {
    console.error('Error fetching activities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    )
  }
}

// POST - Registrar nueva actividad
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, userId, metadata } = body

    if (!type || !userId) {
      return NextResponse.json(
        { error: 'Type and userId are required' },
        { status: 400 }
      )
    }

    // Por ahora simular registro hasta tener schema completo
    const newActivity = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      userId,
      metadata,
      timestamp: new Date(),
      success: true
    }

    console.log('Activity logged:', newActivity)

    return NextResponse.json({
      success: true,
      activity: newActivity,
      message: 'Activity logged successfully'
    })

  } catch (error) {
    console.error('Error logging activity:', error)
    return NextResponse.json(
      { error: 'Failed to log activity' },
      { status: 500 }
    )
  }
}
