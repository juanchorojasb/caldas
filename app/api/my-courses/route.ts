import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "No autorizado" },
        { status: 401 }
      )
    }

    const enrollments = await db.enrollment.findMany({
      where: { userId: session.user.id },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            thumbnail: true,
            level: true,
            createdAt: true
          }
        }
      },
      orderBy: {
        enrolledAt: "desc"
      }
    })

    const coursesWithProgress = enrollments.map(enrollment => ({
      id: enrollment.course.id,
      title: enrollment.course.title,
      description: enrollment.course.description,
      thumbnail: enrollment.course.thumbnail,
      level: enrollment.course.level,
      enrolledAt: enrollment.enrolledAt,
      completedAt: enrollment.completedAt,
      progress: enrollment.progress || 0,
      category: "Academia IA"
    }))

    return NextResponse.json({
      success: true,
      courses: coursesWithProgress,
      total: coursesWithProgress.length
    })
  } catch (error) {
    console.error("Error fetching user courses:", error)
    return NextResponse.json(
      { success: false, message: "Error al obtener cursos" },
      { status: 500 }
    )
  }
}
