import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request)
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    
    // Crear o actualizar usuario con campos que existen en el schema
    const user = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {
        telefono: data.telefono,
        municipio: data.municipio,
        nombreNegocio: data.nombreNegocio,
        nombreTienda: data.nombreTienda || data.nombreNegocio,
        etapa: data.etapa || 'inicial',
        sector: data.sector,
        desafios: data.desafios || '',
        objetivos: data.objetivos,
        // Solo campos que existen en el schema actual
        updatedAt: new Date()
      },
      create: {
        clerkId: userId,
        email: data.email,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        telefono: data.telefono,
        municipio: data.municipio,
        nombreNegocio: data.nombreNegocio,
        nombreTienda: data.nombreTienda || data.nombreNegocio,
        etapa: data.etapa || 'inicial',
        sector: data.sector,
        desafios: data.desafios || '',
        objetivos: data.objetivos
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Onboarding completed successfully',
      userId: user.id 
    })
    
  } catch (error) {
    console.error('Onboarding error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
