import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

// GET - Obtener todas las suscripciones (para admin)
export async function GET() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const subscriptions = await db.userSubscription.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ 
      success: true, 
      subscriptions 
    })
  } catch (error) {
    console.error('Error al obtener suscripciones:', error)
    return NextResponse.json({ 
      error: 'Error al obtener suscripciones' 
    }, { status: 500 })
  }
}

// POST - Crear nueva suscripción
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { selectedPlan, email, name } = await req.json()

    // Verificar si ya existe suscripción para este usuario
    const existingSubscription = await db.userSubscription.findUnique({
      where: { userId }
    })

    if (existingSubscription) {
      // Actualizar suscripción existente
      const subscription = await db.userSubscription.update({
        where: { userId },
        data: {
          selectedPlan,
          email,
          name,
          paymentStatus: 'pending'
        }
      })
      
      return NextResponse.json({ 
        success: true, 
        subscription,
        message: 'Suscripción actualizada' 
      })
    } else {
      // Crear nueva suscripción
      const subscription = await db.userSubscription.create({
        data: {
          userId,
          email,
          name,
          selectedPlan,
          paymentStatus: 'pending'
        }
      })

      return NextResponse.json({ 
        success: true, 
        subscription,
        message: 'Suscripción creada' 
      })
    }
  } catch (error) {
    console.error('Error al crear suscripción:', error)
    return NextResponse.json({ 
      error: 'Error al crear suscripción' 
    }, { status: 500 })
  }
}
