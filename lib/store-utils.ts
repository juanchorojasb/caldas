import { prisma } from './prisma'

/**
 * Genera un slug único para una tienda basado en su nombre
 */
export function generateStoreSlug(storeName: string): string {
  return storeName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remover caracteres especiales
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .replace(/-+/g, '-') // Evitar guiones múltiples
    .replace(/^-|-$/g, '') // Remover guiones al inicio y final
    .slice(0, 50) // Limitar longitud
}

/**
 * Verifica si un slug de tienda está disponible
 */
export async function isStoreSlugAvailable(slug: string): Promise<boolean> {
  try {
    const existingStore = await prisma.store.findUnique({
      where: { slug }
    })
    return !existingStore
  } catch (error) {
    console.error('Error checking slug availability:', error)
    return false
  }
}

/**
 * Genera un slug único, agregando número si es necesario
 */
export async function generateUniqueStoreSlug(storeName: string): Promise<string> {
  let baseSlug = generateStoreSlug(storeName)
  let slug = baseSlug
  let counter = 1
  
  while (!(await isStoreSlugAvailable(slug))) {
    slug = `${baseSlug}-${counter}`
    counter++
    
    // Evitar bucle infinito
    if (counter > 100) {
      slug = `${baseSlug}-${Date.now()}`
      break
    }
  }
  
  return slug
}

/**
 * Crear tienda automáticamente después del registro
 */
export async function createStoreFromUser(userId: string, userData: {
  nombreTienda?: string
  nombreNegocio?: string
  municipio?: string
  telefono?: string
  sitioWeb?: string
}) {
  try {
    if (!userData.nombreTienda && !userData.nombreNegocio) {
      throw new Error('Se requiere nombre de tienda o negocio')
    }

    const storeName = userData.nombreTienda || userData.nombreNegocio || 'Mi Tienda'
    const slug = await generateUniqueStoreSlug(storeName)

    const store = await prisma.store.create({
      data: {
        slug,
        name: storeName,
        city: userData.municipio || undefined,
        phone: userData.telefono || undefined,
        website: userData.sitioWeb || undefined,
        userId,
        isActive: true,
        isVerified: false, // Requiere verificación del admin
      }
    })

    return store
  } catch (error) {
    console.error('Error creating store:', error)
    throw error
  }
}
