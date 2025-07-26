import { NextResponse } from 'next/server'

// Stub temporal - Cursos en desarrollo
export async function GET() {
  return NextResponse.json({ 
    message: 'Sistema de cursos en desarrollo',
    courses: []
  })
}
