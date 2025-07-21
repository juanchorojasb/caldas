import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET - Obtener datos de racha del usuario
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Por ahora simular hasta tener el schema completo
    const mockStreakData = {
      currentStreak: 7,
      longestStreak: 12,
      lastActivity: new Date(),
      weeklyPattern: [true, true, false, true, true, true, true], // L, M, X, J, V, S, D
      streakStartDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      stats: {
        totalActiveDays: 45,
        averageStreakLength: 5.2,
        streakFrequency: 0.85,
        bestWeekday: 'Lunes',
        currentMonth: {
          activeDays: 18,
          totalDays: 30,
          percentage: 60
        }
      }
    }

    return NextResponse.json(mockStreakData)

  } catch (error) {
    console.error('Error fetching streak data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch streak data' },
      { status: 500 }
    )
  }
}

// POST - Marcar actividad hoy (actualizar racha)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Por ahora simular actualización hasta tener schema completo
    const updatedStreak = {
      currentStreak: 8, // Incrementado
      longestStreak: 12,
      lastActivity: new Date(),
      message: 'Streak updated successfully!'
    }

    console.log('Streak updated for user:', userId, updatedStreak)

    return NextResponse.json({
      success: true,
      streak: updatedStreak,
      message: '¡Racha actualizada! Continúa así.'
    })

  } catch (error) {
    console.error('Error updating streak:', error)
    return NextResponse.json(
      { error: 'Failed to update streak' },
      { status: 500 }
    )
  }
}
