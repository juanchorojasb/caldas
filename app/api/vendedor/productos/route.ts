import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { imagesToString } from '@/lib/image-utils'

export async function GET() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    // Obtener productos del usuario
    const products = await prisma.product.findMany({
      where: {
        userId: user.id,
        isActive: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
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

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    const body = await request.json()
    const { name, description, price, category, images } = body

    // Validar datos requeridos
    if (!name || !price) {
      return NextResponse.json(
        { error: 'Nombre y precio son requeridos' },
        { status: 400 }
      )
    }

    // Crear producto con schema actual
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category, // Usar category directamente (string)
        images: imagesToString(images || []), // Convertir array a JSON string
        userId: user.id, // Corregido: usar userId en lugar de vendorId
        isActive: true
      }
    })

    return NextResponse.json({
      success: true,
      product,
      message: 'Producto creado exitosamente'
    })

  } catch (error) {
    console.error('Error creating product:', error)
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

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    const body = await request.json()
    const { productId, name, description, price, category, images } = body

    // Verificar que el producto pertenece al usuario
    const existingProduct = await prisma.product.findFirst({
      where: {
        id: productId,
        userId: user.id
      }
    })

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Producto no encontrado o no tienes permisos' },
        { status: 404 }
      )
    }

    // Actualizar producto
    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        images: imagesToString(images || [])
      }
    })

    return NextResponse.json({
      success: true,
      product,
      message: 'Producto actualizado exitosamente'
    })

  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('id')

    if (!productId) {
      return NextResponse.json(
        { error: 'ID de producto requerido' },
        { status: 400 }
      )
    }

    // Verificar que el producto pertenece al usuario
    const existingProduct = await prisma.product.findFirst({
      where: {
        id: productId,
        userId: user.id
      }
    })

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Producto no encontrado o no tienes permisos' },
        { status: 404 }
      )
    }

    // Soft delete (marcar como inactivo)
    await prisma.product.update({
      where: { id: productId },
      data: { isActive: false }
    })

    return NextResponse.json({
      success: true,
      message: 'Producto eliminado exitosamente'
    })

  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
