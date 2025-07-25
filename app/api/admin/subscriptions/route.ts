import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

// POST - Aprobar/Rechazar pagos
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { subscriptionUserId, action } = await req.json()

    const subscription = await db.userSubscription.update({
      where: { userId: subscriptionUserId },
      data: {
        paymentStatus: action === 'approve' ? 'approved' : 'rejected',
        approvedAt: action === 'approve' ? new Date() : null,
        approvedBy: userId
      }
    })

    return NextResponse.json({ 
      success: true, 
      subscription,
      message: `Pago ${action === 'approve' ? 'aprobado' : 'rechazado'}` 
    })
  } catch (error) {
    console.error('Error al actualizar suscripción:', error)
    return NextResponse.json({ 
      error: 'Error al actualizar suscripción' 
    }, { status: 500 })
  }
}
