import { NextResponse } from 'next/server'

// Stub temporal - Estadísticas en desarrollo  
export async function GET() {
  return NextResponse.json({ 
    message: 'Estadísticas en desarrollo',
    stats: {
      totalUsers: 0,
      totalProducts: 0,
      totalStores: 0,
      totalRevenue: 0
    }
  })
}
