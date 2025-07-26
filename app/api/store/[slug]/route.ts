import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stringToImages } from '@/lib/image-utils'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const store = await prisma.store.findUnique({
      where: { 
        slug: params.slug,
        isActive: true 
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        },
        products: {
          where: { isActive: true },
          orderBy: { createdAt: 'desc' },
          take: 20 // Limitar a 20 productos por página
        }
      }
    })

    if (!store) {
      return NextResponse.json(
        { error: 'Tienda no encontrada' },
        { status: 404 }
      )
    }

    // Procesar imágenes de productos
    const processedStore = {
      ...store,
      products: store.products.map(product => ({
        ...product,
        images: stringToImages(product.images)
      }))
    }

    return NextResponse.json(processedStore)
  } catch (error) {
    console.error('Error fetching store:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
