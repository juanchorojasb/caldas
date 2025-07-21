import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const courses = await db.course.findMany({
      where: {
        isActive: true
      },
      include: {
        lessons: {
          where: {
            isActive: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json({
      success: true,
      courses
    })
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json(
      { success: false, message: "Error" },
      { status: 500 }
    )
  }
}
