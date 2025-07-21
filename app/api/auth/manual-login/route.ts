import { NextRequest, NextResponse } from "next/server"
import { signIn } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    console.log('📧 Manual login attempt for:', email)
    
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    })
    
    console.log('🔍 SignIn result:', result)

    if (result?.error) {
      console.log('❌ LOGIN FAILED:', result.error)
      return NextResponse.json(
        { success: false, message: "Credenciales inválidas" },
        { status: 401 }
      )
    }

    console.log('✅ LOGIN SUCCESS - Session should be created')
    return NextResponse.json({
      success: true,
      message: "Login exitoso",
      redirect: "/vendedor"
    })
  } catch (error) {
    console.log('❌ LOGIN ERROR:', error)
    return NextResponse.json(
      { success: false, message: "Error interno" },
      { status: 500 }
    )
  }
}
