import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { StoreHeader } from '@/components/store/StoreHeader'
import { StoreProducts } from '@/components/store/StoreProducts'
import { StoreContact } from '@/components/store/StoreContact'
import { stringToImages } from '@/lib/image-utils'

interface StorePageProps {
  params: Promise<{
    slug: string
  }>
}

// Definir tipo para producto procesado con imágenes convertidas
interface ProcessedProduct {
  id: string
  name: string
  description?: string | null
  price: number
  images: string[] // Array después del procesamiento
  category?: string | null
  isFeatured?: boolean
  createdAt: Date
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
    
    if (!store) return null
    
    // Procesar imágenes de productos y convertir tipos correctamente
    const processedProducts: ProcessedProduct[] = store.products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price), // Convertir Decimal a number
      images: stringToImages(product.images), // Convertir string a array
      category: product.category,
      isFeatured: product.isFeatured,
      createdAt: product.createdAt
    }))
    
    return {
      ...store,
      products: processedProducts
    }
  } catch (error) {
    console.error('Error fetching store:', error)
    return null
  }
}

export default async function StorePage({ params }: StorePageProps) {
  // En Next.js 15, params es una Promise
  const { slug } = await params
  const store = await getStore(slug)

  if (!store) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StoreHeader store={store} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StoreProducts products={store.products} />
      </div>
      
      <StoreContact store={store} />
    </div>
  )
}

// Generar metadata dinámica para SEO
export async function generateMetadata({ params }: StorePageProps) {
  const { slug } = await params
  const store = await getStore(slug)
  
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
