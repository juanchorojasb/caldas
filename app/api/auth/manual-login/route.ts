import { NextRequest, NextResponse } from 'next/server'
import { compare } from 'bcryptjs'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    console.log('📧 Manual login attempt')
    
    const body = await request.json()
    console.log('📧 Body received:', body)
    
    const { email, password } = body
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 })
    }
    
    console.log('🔍 Searching user:', email)
    
    const user = await db.user.findUnique({
      where: {
        email: email.toLowerCase(),
        isActive: true
      }
    })
    
    console.log('👤 User found:', !!user)
    
    if (!user || !user.password) {
      return NextResponse.json({ error: 'User not found or no password' }, { status: 400 })
    }
    
    const passwordMatch = await compare(password, user.password)
    console.log('🔐 Password match:', passwordMatch)
    
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Wrong password' }, { status: 400 })
    }
    
    console.log('✅ LOGIN SUCCESS!')
    
    return NextResponse.json({ 
      success: true, 
      user: { id: user.id, email: user.email } 
    })
    
  } catch (error) {
    console.error('❌ Error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
