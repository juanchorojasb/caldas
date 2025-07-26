import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stringToImages } from '@/lib/image-utils'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    // En Next.js 15, params es una Promise
    const { slug } = await context.params

    const store = await prisma.store.findUnique({
      where: { 
        slug: slug,
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
          take: 20
        }
      }
    })

    if (!store) {
      return NextResponse.json(
        { error: 'Tienda no encontrada' },
        { status: 404 }
      )
    }

    // Procesar imágenes de productos y convertir tipos
    const processedStore = {
      ...store,
      products: store.products.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: Number(product.price), // Convertir Decimal a number
        images: stringToImages(product.images), // Convertir string a array
        category: product.category,
        isFeatured: product.isFeatured,
        createdAt: product.createdAt
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
