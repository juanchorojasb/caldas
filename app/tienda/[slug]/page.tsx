import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { StoreHeader } from '@/components/store/StoreHeader'
import { StoreProducts } from '@/components/store/StoreProducts'
import { StoreContact } from '@/components/store/StoreContact'
import { stringToImages } from '@/lib/image-utils'

interface StorePageProps {
  params: {
    slug: string
  }
}

async function getStore(slug: string) {
  try {
    const store = await prisma.store.findUnique({
      where: { 
        slug,
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
          orderBy: { createdAt: 'desc' }
        }
      }
    })
    
    // Procesar imágenes de productos
    if (store?.products) {
      store.products = store.products.map(product => ({
        ...product,
        images: stringToImages(product.images)
      }))
    }
    
    return store
  } catch (error) {
    console.error('Error fetching store:', error)
    return null
  }
}

export default async function StorePage({ params }: StorePageProps) {
  const store = await getStore(params.slug)

  if (!store) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header de la tienda */}
      <StoreHeader store={store} />
      
      {/* Productos de la tienda */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StoreProducts products={store.products} />
      </div>
      
      {/* Información de contacto */}
      <StoreContact store={store} />
    </div>
  )
}

// Generar metadata dinámica para SEO
export async function generateMetadata({ params }: StorePageProps) {
  const store = await getStore(params.slug)
  
  if (!store) {
    return {
      title: 'Tienda no encontrada - MercadoLocal'
    }
  }

  return {
    title: `${store.name} - MercadoLocal Caldas`,
    description: store.description || `Conoce los productos de ${store.name} en MercadoLocal Caldas`,
    keywords: `${store.name}, tienda, productos, Caldas, ${store.city}, emprendedores`,
    openGraph: {
      title: `${store.name} - MercadoLocal Caldas`,
      description: store.description || `Productos únicos de ${store.name}`,
      images: store.banner ? [store.banner] : [],
    }
  }
}
