// prisma/seed.ts - Datos iniciales para Marketplace

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // ===== CATEGORÍAS PRINCIPALES =====
  const categories = [
    {
      name: "Servicios",
      slug: "servicios",
      description: "Servicios técnicos, profesionales y domésticos",
      icon: "🔧",
      color: "#3B82F6",
      order: 1
    },
    {
      name: "Accesorios y Artesanías", 
      slug: "accesorios-artesanias",
      description: "Productos únicos hechos a mano por artesanos caldenses",
      icon: "🎨",
      color: "#EF4444",
      order: 2
    },
    {
      name: "Restaurantes",
      slug: "restaurantes", 
      description: "Gastronomía local y experiencias culinarias",
      icon: "🍽️",
      color: "#F59E0B",
      order: 3
    },
    {
      name: "Hoteles",
      slug: "hoteles",
      description: "Alojamiento y experiencias turísticas",
      icon: "🏨", 
      color: "#10B981",
      order: 4
    },
    {
      name: "Transporte",
      slug: "transporte",
      description: "Servicios de movilidad y transporte regional",
      icon: "🚗",
      color: "#8B5CF6", 
      order: 5
    }
  ]

  // Crear categorías
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category
    })
  }

  console.log('✅ Categorías creadas')

  // ===== CONFIGURACIONES INICIALES =====
  const settings = [
    { key: 'site_name', value: 'Mercado Local Caldas', type: 'string' },
    { key: 'site_description', value: 'La plataforma oficial de comercio del Departamento de Caldas', type: 'string' },
    { key: 'contact_email', value: 'contacto@mercadolocal.co', type: 'string' },
    { key: 'contact_phone', value: '+57 300 123 4567', type: 'string' },
    { key: 'contact_whatsapp', value: '+57 300 123 4567', type: 'string' },
    
    // Planes de suscripción
    { key: 'plan_basic_price', value: '25000', type: 'number' },
    { key: 'plan_basic_name', value: 'Plan Básico', type: 'string' },
    { key: 'plan_basic_description', value: 'Acceso al marketplace con hasta 20 productos', type: 'string' },
    
    { key: 'plan_complete_price', value: '70000', type: 'number' },
    { key: 'plan_complete_name', value: 'Plan Completo', type: 'string' },
    { key: 'plan_complete_description', value: 'Marketplace + Academia de IA', type: 'string' },
    
    { key: 'plan_premium_price', value: '120000', type: 'number' },
    { key: 'plan_premium_name', value: 'Plan Premium', type: 'string' },
    { key: 'plan_premium_description', value: 'Todo incluido + Publicidad Digital', type: 'string' },
    
    // Configuraciones de límites
    { key: 'basic_product_limit', value: '20', type: 'number' },
    { key: 'complete_product_limit', value: '0', type: 'number' }, // Ilimitado
    { key: 'premium_product_limit', value: '0', type: 'number' }, // Ilimitado
    
    { key: 'max_image_size', value: '5242880', type: 'number' }, // 5MB
    { key: 'max_images_per_product', value: '5', type: 'number' },
    
    // Academia integration
    { key: 'academia_url', value: 'https://caldas.mercadolocal.co', type: 'string' },
    { key: 'academia_enabled', value: 'true', type: 'boolean' },
    
    // Payment gateway
    { key: 'payment_gateway', value: 'wompi', type: 'string' },
    { key: 'currency', value: 'COP', type: 'string' },
    
    // Featured products
    { key: 'featured_products_homepage', value: '12', type: 'number' },
    { key: 'featured_rotation_hours', value: '24', type: 'number' },
    
    // Social features
    { key: 'enable_likes', value: 'true', type: 'boolean' },
    { key: 'enable_comments', value: 'true', type: 'boolean' },
    { key: 'enable_reviews', value: 'true', type: 'boolean' },
    { key: 'enable_favorites', value: 'true', type: 'boolean' },
    
    // Moderation
    { key: 'auto_approve_vendors', value: 'false', type: 'boolean' },
    { key: 'auto_approve_products', value: 'true', type: 'boolean' },
    { key: 'require_phone_verification', value: 'true', type: 'boolean' },
    
    // Regional info
    { key: 'default_city', value: 'Manizales', type: 'string' },
    { key: 'default_department', value: 'Caldas', type: 'string' },
    { key: 'supported_municipalities', value: JSON.stringify([
      'Manizales', 'Neira', 'Aranzazu', 'Pácora', 'Salamina',
      'Villamaría', 'Chinchiná', 'Palestina', 'Supia', 'Riosucio'
    ]), type: 'json' }
  ]

  // Crear configuraciones
  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting
    })
  }

  console.log('✅ Configuraciones iniciales creadas')

  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
