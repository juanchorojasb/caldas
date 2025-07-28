import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request)

    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Obtener usuario para verificar que existe
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    // Obtener productos del vendedor
    const productos = await prisma.product.findMany({
      where: { 
        userId: user.id 
      },
      orderBy: { createdAt: 'desc' },
      include: {
        store: {
          select: {
            name: true,
            slug: true
          }
        }
      }
    })

    return NextResponse.json({ 
      productos,
      total: productos.length,
      vendedor: {
        id: user.id,
        nombre: user.firstName + ' ' + user.lastName,
        negocio: user.nombreNegocio
      }
    })
    
  } catch (error) {
    console.error('Error fetching productos:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request)

    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Obtener datos del producto
    const data = await request.json()
    const { name, description, price, category, images, isActive, isFeatured } = data

    // Obtener usuario
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { store: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    // Crear producto
    const producto = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        images: JSON.stringify(images || []),
        isActive: isActive ?? true,
        isFeatured: isFeatured ?? false,
        userId: user.id,
        storeId: user.store?.id || null
      }
    })

    return NextResponse.json({ 
      success: true,
      producto,
      message: 'Producto creado exitosamente'
    })
    
  } catch (error) {
    console.error('Error creating producto:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId } = getAuth(request)

    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const data = await request.json()
    const { id, name, description, price, category, images, isActive, isFeatured } = data

    // Verificar que el producto pertenece al usuario
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    const producto = await prisma.product.findFirst({
      where: { 
        id,
        userId: user.id 
      }
    })

    if (!producto) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })
    }

    // Actualizar producto
    const productoActualizado = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        images: JSON.stringify(images || []),
        isActive,
        isFeatured,
        updatedAt: new Date()
      }
    })

    return NextResponse.json({ 
      success: true,
      producto: productoActualizado,
      message: 'Producto actualizado exitosamente'
    })
    
  } catch (error) {
    console.error('Error updating producto:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = getAuth(request)

    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID de producto requerido' }, { status: 400 })
    }

    // Verificar que el producto pertenece al usuario
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    const producto = await prisma.product.findFirst({
      where: { 
        id,
        userId: user.id 
      }
    })

    if (!producto) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })
    }

    // Eliminar producto
    await prisma.product.delete({
      where: { id }
    })

    return NextResponse.json({ 
      success: true,
      message: 'Producto eliminado exitosamente'
    })
    
  } catch (error) {
    console.error('Error deleting producto:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
