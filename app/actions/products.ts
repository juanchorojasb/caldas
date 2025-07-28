'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { imagesToString } from '@/lib/image-utils'

export async function createProduct(formData: FormData) {
  try {
    // En Next.js 15, auth() es asíncrono
    const { userId } = await auth()
    
    if (!userId) {
      throw new Error('Usuario no autenticado')
    }

    // Buscar el usuario en nuestra base de datos
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    // Extraer datos del formulario
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const category = formData.get('category') as string
    const images = formData.getAll('images') as string[]

    // Crear el producto
    const product = await prisma.product.create({
      data: {
        userId: user.id,
        name,
        description,
        price,
        category,
        images: imagesToString(images),
        isActive: true
      }
    })

    revalidatePath('/vendedor/productos')
    return { success: true, product }
    
  } catch (error) {
    console.error('Error creating product:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error desconocido' 
    }
  }
}

export async function updateProduct(productId: string, formData: FormData) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      throw new Error('Usuario no autenticado')
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    const existingProduct = await prisma.product.findFirst({
      where: {
        id: productId,
        userId: user.id
      }
    })

    if (!existingProduct) {
      throw new Error('Producto no encontrado o no tienes permisos')
    }

    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const category = formData.get('category') as string
    const images = formData.getAll('images') as string[]

    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        description,
        price,
        category,
        images: imagesToString(images)
      }
    })

    revalidatePath('/vendedor/productos')
    return { success: true, product }
    
  } catch (error) {
    console.error('Error updating product:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error desconocido' 
    }
  }
}

export async function deleteProduct(productId: string) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      throw new Error('Usuario no autenticado')
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    const existingProduct = await prisma.product.findFirst({
      where: {
        id: productId,
        userId: user.id
      }
    })

    if (!existingProduct) {
      throw new Error('Producto no encontrado o no tienes permisos')
    }

    await prisma.product.update({
      where: { id: productId },
      data: { isActive: false }
    })

    revalidatePath('/vendedor/productos')
    return { success: true }
    
  } catch (error) {
    console.error('Error deleting product:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error desconocido' 
    }
  }
}

export async function getUserProducts() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      throw new Error('Usuario no autenticado')
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    const products = await prisma.product.findMany({
      where: {
        userId: user.id,
        isActive: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return { success: true, products }
    
  } catch (error) {
    console.error('Error fetching products:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error desconocido' 
    }
  }
}
