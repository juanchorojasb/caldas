import { NextResponse } from 'next/server'

// Stub temporal - Perfil en desarrollo
export async function GET() {
  return NextResponse.json({ 
    message: 'Sistema de perfil en desarrollo'
  })
}

export async function PATCH() {
  return NextResponse.json({ 
    message: 'Actualización de perfil en desarrollo'
  })
}
