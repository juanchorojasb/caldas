import { notFound } from 'next/navigation'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { StoreHeader } from '@/components/store/StoreHeader'
import { StoreProducts } from '@/components/store/StoreProducts'
import { StoreContact } from '@/components/store/StoreContact'

interface StorePageProps {
  params: Promise<{
    slug: string
  }>
}

// Definir tipo para producto
interface ProcessedProduct {
  id: string
  name: string
  description?: string | null
  price: number
  images: string[]
  category?: string | null
  isFeatured?: boolean
  createdAt: Date
}

// Definir tipo para tienda
interface Store {
  id: string
  name: string
  slug: string
  description?: string | null
  banner?: string | null
  city?: string | null
  isActive: boolean
  user: {
    firstName: string | null
    lastName: string | null
    email: string | null
  }
  products: ProcessedProduct[]
}

async function getStore(userId: string): Promise<Store | null> {
  try {
    const PRODUCTOS_DIR = join(process.cwd(), 'public', 'data', 'productos')
    const userFile = join(PRODUCTOS_DIR, `${userId}.json`)
    
    // Leer productos del usuario
    let productos = []
    try {
      const data = await readFile(userFile, 'utf8')
      productos = JSON.parse(data)
    } catch (error) {
      // Usuario no tiene productos o archivo no existe
      productos = []
    }

    // Filtrar solo productos activos
    const productosActivos = productos.filter((p: any) => p.isActive !== false)

    // Procesar productos para la tienda
    const processedProducts: ProcessedProduct[] = productosActivos.map((product: any) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      images: Array.isArray(product.images) ? product.images : [],
      category: product.category,
      isFeatured: product.isFeatured || false,
      createdAt: new Date(product.createdAt || Date.now())
    }))

    // Crear datos de tienda simulados
    // En una implementación futura, esto podría venir de un archivo de perfil de usuario
    const store: Store = {
      id: userId,
      name: `Tienda de ${userId.split('_')[1]?.substring(0, 8) || 'Usuario'}`, // Nombre simplificado
      slug: userId,
      description: `Productos únicos del Norte de Caldas`,
      banner: productosActivos.length > 0 ? productosActivos[0].images?.[0] : null,
      city: 'Norte de Caldas',
      isActive: true,
      user: {
        firstName: 'Emprendedor',
        lastName: 'Norte de Caldas',
        email: null
      },
      products: processedProducts
    }

    return store

  } catch (error) {
    console.error('Error fetching store:', error)
    return null
  }
}

export default async function StorePage({ params }: StorePageProps) {
  // En Next.js 15, params es una Promise
  const { slug } = await params
  
  // El slug es el userId
  const store = await getStore(slug)
  
  if (!store || store.products.length === 0) {
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
    keywords: `${store.name}, tienda, productos, Caldas, Norte de Caldas, emprendedores`,
    openGraph: {
      title: `${store.name} - MercadoLocal Caldas`,
      description: store.description || `Productos únicos del Norte de Caldas`,
      images: store.banner ? [store.banner] : [],
    }
  }
}
