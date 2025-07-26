/**
 * Utilidades para manejar imágenes en productos
 * Como MySQL no soporta arrays, almacenamos como JSON string
 */

export function imagesToString(images: string[]): string {
  return JSON.stringify(images)
}

export function stringToImages(imagesString: string | null): string[] {
  if (!imagesString) return []
  
  try {
    const parsed = JSON.parse(imagesString)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('Error parsing images:', error)
    return []
  }
}

export function addImageToProduct(currentImages: string | null, newImage: string): string {
  const images = stringToImages(currentImages)
  images.push(newImage)
  return imagesToString(images)
}

export function removeImageFromProduct(currentImages: string | null, imageToRemove: string): string {
  const images = stringToImages(currentImages)
  const filtered = images.filter(img => img !== imageToRemove)
  return imagesToString(filtered)
}

// Utilidad para obtener la primera imagen de un producto
export function getFirstImage(imagesString: string | null): string | null {
  const images = stringToImages(imagesString)
  return images.length > 0 ? images[0] : null
}

// Utilidad para verificar si un producto tiene imágenes
export function hasImages(imagesString: string | null): boolean {
  return stringToImages(imagesString).length > 0
}
