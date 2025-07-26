import { NextResponse } from 'next/server'

// Stub temporal para evitar errores de compilación
// TODO: Implementar cuando se desarrolle el sistema de academia
export async function POST() {
  return NextResponse.json({ message: 'Academia en desarrollo' }, { status: 501 })
}
