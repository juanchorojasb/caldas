import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request)

    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Verificar si el usuario es admin (puedes personalizar esta lógica)
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    // Obtener todas las suscripciones
    const subscriptions = await prisma.userSubscription.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            nombreNegocio: true,
            municipio: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ subscriptions })
    
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { userId } = getAuth(request)

    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { subscriptionId, status, adminNotes } = await request.json()

    // Actualizar suscripción
    const subscription = await prisma.userSubscription.update({
      where: { id: subscriptionId },
      data: {
        status,
        adminNotes,
        updatedAt: new Date()
      },
      include: {
        user: true
      }
    })

    return NextResponse.json({ 
      success: true,
      subscription,
      message: `Suscripción ${status === 'active' ? 'aprobada' : 'actualizada'} exitosamente`
    })
    
  } catch (error) {
    console.error('Error updating subscription:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
