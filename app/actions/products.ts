'use server'

import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createProduct(formData: FormData) {
  try {
    console.log('🚀 Server Action - Creating product')
    
    const { userId } = await auth()
    console.log('👤 Clerk userId:', userId)
    
    // Temporal: usar usuario hardcoded si no hay sesión
    const user = userId ? { id: userId, email: 'clerk-user@mercadolocal.co' } : { id: 'temp-vendor', email: 'vendor@mercadolocal.co' }
    console.log('👤 Using user:', user?.email)
    
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const categoryId = formData.get('categoryId') as string || 'EMPRESARIAL'
    
    console.log('📦 Product data:', { name, price, categoryId })
    
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    const product = await db.product.create({
      data: {
        vendorId: user.id,
        categoryId,
        name,
        slug: `${slug}-${Date.now()}`,
        description,
        price,
        images: JSON.stringify([])
      }
    })

    console.log('✅ Product created:', product.id)
    revalidatePath('/vendedor/productos')
    
    return { success: true, product }
  } catch (error) {
    console.error('❌ Error creating product:', error)
    return { success: false, error: 'Error al crear producto' }
  }
}
