import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request)

    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { plan, amount, paymentMethod, paymentProof } = await request.json()

    // Crear suscripción
    const subscription = await prisma.userSubscription.create({
      data: {
        userId: userId,
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

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request)

    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Obtener suscripciones del usuario
    const subscriptions = await prisma.userSubscription.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ subscriptions })
    
  } catch (error) {
    console.error('Error fetching user subscriptions:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
