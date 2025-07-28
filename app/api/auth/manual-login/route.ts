import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Redirecting to sign in...',
      redirectUrl: '/api/auth/signin'
    })
  } catch (error) {
    console.error('Manual login error:', error)
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 401 }
    )
  }
}
