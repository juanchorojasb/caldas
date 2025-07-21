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

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        avatar: true,
        role: true
      }
    })

    return NextResponse.json({
      success: true,
      user
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error" },
      { status: 500 }
    )
  }
}
