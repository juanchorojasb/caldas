import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function resetUsers() {
  console.log('🧹 Iniciando limpieza de usuarios...')
  
  try {
    // Limpiar en orden correcto (relaciones)
    console.log('🗑️ Limpiando suscripciones...')
    await prisma.userSubscription.deleteMany({})
    
    console.log('🗑️ Limpiando productos...')
    await prisma.product.deleteMany({})
    
    console.log('🗑️ Limpiando tiendas...')
    await prisma.store.deleteMany({})
    
    console.log('🗑️ Limpiando usuarios...')
    await prisma.user.deleteMany({})
    
    console.log('✅ Base de datos de usuarios limpiada exitosamente')
    console.log('ℹ️  Estructura de tablas mantenida intacta')
    
    // Verificar limpieza
    const userCount = await prisma.user.count()
    const storeCount = await prisma.store.count()
    const productCount = await prisma.product.count()
    const subscriptionCount = await prisma.userSubscription.count()
    
    console.log('📊 Estado después de limpieza:')
    console.log(`   Usuarios: ${userCount}`)
    console.log(`   Tiendas: ${storeCount}`)
    console.log(`   Productos: ${productCount}`)
    console.log(`   Suscripciones: ${subscriptionCount}`)
    
  } catch (error) {
    console.error('❌ Error durante la limpieza:', error)
  } finally {
    await prisma.$disconnect()
  }
}

resetUsers()
