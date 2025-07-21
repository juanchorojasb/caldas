import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const session = await auth()
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: 'No autorizado' },
        { status: 401 }
      )
    }

    const { lessonId } = await params
    const user = session.user

    // Verificar que la lección existe
    const lesson = await db.lesson.findUnique({
      where: { 
        id: lessonId,
        isActive: true 
      },
      include: {
        course: {
          select: {
            id: true,
            title: true
          }
        }
      }
    })

    if (!lesson) {
      return NextResponse.json(
        { success: false, message: 'Lección no encontrada' },
        { status: 404 }
      )
    }

    // Verificar que el usuario está inscrito en el curso
    const enrollment = await db.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: lesson.courseId
        }
      }
    })

    if (!enrollment) {
      return NextResponse.json(
        { success: false, message: 'No estás inscrito en este curso' },
        { status: 403 }
      )
    }

    // Buscar progreso existente
    const existingProgress = await db.lessonProgress.findUnique({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId: lessonId
        }
      }
    })

    let progress

    if (existingProgress) {
      // Togglear el estado de completado
      progress = await db.lessonProgress.update({
        where: {
          userId_lessonId: {
            userId: user.id,
            lessonId: lessonId
          }
        },
        data: {
          isCompleted: !existingProgress.isCompleted,
          completedAt: !existingProgress.isCompleted ? new Date() : null,
          updatedAt: new Date()
        }
      })
    } else {
      // Crear nuevo progreso como completado
      progress = await db.lessonProgress.create({
        data: {
          userId: user.id,
          lessonId: lessonId,
          isCompleted: true,
          completedAt: new Date()
        }
      })
    }

    // Actualizar el progreso general del curso
    await updateCourseProgress(user.id, lesson.courseId)

    return NextResponse.json({
      success: true,
      message: progress.isCompleted ? 'Lección marcada como completada' : 'Lección marcada como no completada',
      progress: {
        isCompleted: progress.isCompleted,
        completedAt: progress.completedAt
      }
    })

  } catch (error) {
    console.error('Error en toggle completion:', error)
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// Función auxiliar para actualizar el progreso del curso
async function updateCourseProgress(userId: string, courseId: string) {
  try {
    // Obtener todas las lecciones del curso
    const totalLessons = await db.lesson.count({
      where: {
        courseId: courseId,
        isActive: true
      }
    })

    // Obtener lecciones completadas por el usuario
    const completedLessons = await db.lessonProgress.count({
      where: {
        userId: userId,
        isCompleted: true,
        lesson: {
          courseId: courseId,
          isActive: true
        }
      }
    })

    // Calcular porcentaje de progreso
    const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

    // Actualizar el enrollment
    const updateData: any = {
      progress: progressPercentage
    }

    // Si completó el 100%, marcar como completado
    if (progressPercentage === 100) {
      updateData.completedAt = new Date()
    }

    await db.enrollment.update({
      where: {
        userId_courseId: {
          userId: userId,
          courseId: courseId
        }
      },
      data: updateData
    })

  } catch (error) {
    console.error('Error updating course progress:', error)
    // No lanzar error para no afectar la función principal
  }
}
