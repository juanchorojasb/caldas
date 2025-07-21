import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "No autorizado" },
        { status: 401 }
      )
    }

    const userId = session.user.id

    // Estadísticas básicas
    const enrollments = await db.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            thumbnail: true
          }
        }
      }
    })

    const lessonProgress = await db.lessonProgress.findMany({
      where: { userId }
    })

    const completedLessons = lessonProgress.filter(p => p.isCompleted).length
    const totalTimeSpent = lessonProgress.reduce((acc, p) => acc + (p.timeSpent || 0), 0)

    const stats = {
      courses: {
        enrolled: enrollments.length,
        completed: enrollments.filter(e => e.completedAt).length
      },
      lessons: {
        completed: completedLessons,
        total: lessonProgress.length
      },
      timeSpent: totalTimeSpent,
      recentCourses: enrollments.slice(0, 3)
    }

    return NextResponse.json({
      success: true,
      stats
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json(
      { success: false, message: "Error interno" },
      { status: 500 }
    )
  }
}
