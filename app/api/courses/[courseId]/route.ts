import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { courseId } = await params

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        isActive: true
      },
      include: {
        lessons: {
          where: {
            isActive: true
          },
          orderBy: {
            order: "asc"
          }
        }
      }
    })

    if (!course) {
      return NextResponse.json(
        { success: false, message: "Curso no encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      course
    })
  } catch (error) {
    console.error("Error fetching course:", error)
    return NextResponse.json(
      { success: false, message: "Error interno" },
      { status: 500 }
    )
  }
}
