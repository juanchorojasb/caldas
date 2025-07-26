import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Verificar que es admin (puedes agregar lógica adicional aquí)
    const subscriptions = await prisma.userSubscription.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(subscriptions)
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
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { subscriptionId, action } = body

    if (!subscriptionId || !action) {
      return NextResponse.json(
        { error: 'subscriptionId y action son requeridos' },
        { status: 400 }
      )
    }

    // Actualizar usando el ID de la suscripción, no el userId
    const subscription = await prisma.userSubscription.update({
      where: { id: subscriptionId }, // Corregido: usar id en lugar de userId
      data: {
        status: action === 'approve' ? 'active' : 'cancelled', // Usar 'status' según nuestro schema
        adminNotes: action === 'approve' ? 'Aprobado por administrador' : 'Rechazado por administrador'
      }
    })

    return NextResponse.json({ 
      success: true, 
      subscription,
      message: action === 'approve' ? 'Suscripción aprobada' : 'Suscripción rechazada'
    })
  } catch (error) {
    console.error('Error updating subscription:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { plan, amount, paymentMethod, paymentProof, userClerkId } = body

    // Buscar usuario por clerkId
    const user = await prisma.user.findUnique({
      where: { clerkId: userClerkId }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      )
    }

    // Crear nueva suscripción
    const subscription = await prisma.userSubscription.create({
      data: {
        userId: user.id,
        plan,
        amount,
        paymentMethod,
        paymentProof,
        status: 'pending'
      }
    })

    return NextResponse.json({ 
      success: true, 
      subscription,
      message: 'Suscripción creada exitosamente'
    })
  } catch (error) {
    console.error('Error creating subscription:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
