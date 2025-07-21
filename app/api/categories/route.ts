import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const categories = await db.category.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        order: "asc"
      },
      include: {
        _count: {
          select: {
            products: true,
            services: true
          }
        }
      }
    })

    const categoriesWithCount = categories.map(category => ({
      ...category,
      totalCount: category._count.products + category._count.services
    }))

    return NextResponse.json({ 
      success: true, 
      categories: categoriesWithCount 
    })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json(
      { success: false, message: "Error al obtener categorías" }, 
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { success: false, message: "Funcionalidad en desarrollo" },
    { status: 503 }
  )
}
