// prisma/seed-improved.ts - Categorías mejoradas y específicas

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Actualizando categorías...')

  // ===== CATEGORÍAS MEJORADAS =====
  const categories = [
    // PRODUCTOS FÍSICOS
    {
      name: "Accesorios y Artesanías",
      slug: "accesorios-artesanias",
      description: "Productos únicos hechos a mano por artesanos caldenses",
      icon: "🎨",
      color: "#EF4444",
      order: 1
    },
    {
      name: "Alimentos",
      slug: "alimentos",
      description: "Productos alimenticios, café, dulces y gastronomía local",
      icon: "🍯",
      color: "#F59E0B",
      order: 2
    },
    {
      name: "Ropa y Calzado",
      slug: "ropa-calzado",
      description: "Vestimenta, calzado y accesorios de moda",
      icon: "👗",
      color: "#EC4899",
      order: 3
    },
    {
      name: "Salud y Belleza",
      slug: "salud-belleza",
      description: "Productos y servicios de cuidado personal y bienestar",
      icon: "💄",
      color: "#8B5CF6",
      order: 4
    },
    {
      name: "Autos y Motos",
      slug: "autos-motos",
      description: "Vehículos, repuestos, accesorios y servicios automotrices",
      icon: "🚗",
      color: "#6B7280",
      order: 5
    },
    {
      name: "Mascotas",
      slug: "mascotas",
      description: "Todo para el cuidado y bienestar de tus mascotas",
      icon: "🐕",
      color: "#F97316",
      order: 6
    },
    {
      name: "Tecnología",
      slug: "tecnologia",
      description: "Equipos, accesorios y servicios tecnológicos",
      icon: "💻",
      color: "#3B82F6",
      order: 7
    },
    {
      name: "Hogar y Construcción",
      slug: "hogar-construccion",
      description: "Materiales, herramientas y productos para el hogar",
      icon: "🏠",
      color: "#059669",
      order: 8
    },
    {
      name: "Agricultura y Café",
      slug: "agricultura-cafe",
      description: "Productos agrícolas, café especial y herramientas de campo",
      icon: "☕",
      color: "#92400E",
      order: 9
    },
    {
      name: "Deportes y Recreación",
      slug: "deportes-recreacion",
      description: "Equipos deportivos, outdoor y actividades recreativas",
      icon: "⚽",
      color: "#DC2626",
      order: 10
    },

    // SERVICIOS ESPECÍFICOS
    {
      name: "Servicios Profesionales",
      slug: "servicios-profesionales",
      description: "Contadores, abogados, arquitectos y consultores",
      icon: "💼",
      color: "#1F2937",
      order: 11
    },
    {
      name: "Servicios Técnicos",
      slug: "servicios-tecnicos",
      description: "Plomería, electricidad, reparaciones y mantenimiento",
      icon: "🔧",
      color: "#374151",
      order: 12
    },
    {
      name: "Servicios Domésticos",
      slug: "servicios-domesticos",
      description: "Limpieza, jardinería, cuidado del hogar",
      icon: "🧹",
      color: "#6B7280",
      order: 13
    },
    {
      name: "Educación y Cursos",
      slug: "educacion-cursos",
      description: "Tutorías, cursos, talleres y formación",
      icon: "📚",
      color: "#7C3AED",
      order: 14
    },
    {
      name: "Eventos y Entretenimiento",
      slug: "eventos-entretenimiento",
      description: "Organización de eventos, música, fotografía",
      icon: "🎉",
      color: "#DB2777",
      order: 15
    },

    // TURISMO Y HOSPITALIDAD
    {
      name: "Restaurantes y Cafeterías",
      slug: "restaurantes-cafeterias",
      description: "Gastronomía local, cafeterías y experiencias culinarias",
      icon: "🍽️",
      color: "#EA580C",
      order: 16
    },
    {
      name: "Hoteles y Alojamiento",
      slug: "hoteles-alojamiento",
      description: "Hoteles, hostales, fincas y experiencias turísticas",
      icon: "🏨",
      color: "#10B981",
      order: 17
    },
    {
      name: "Transporte y Logística",
      slug: "transporte-logistica",
      description: "Servicios de movilidad, mudanzas y logística",
      icon: "🚛",
      color: "#0EA5E9",
      order: 18
    },
    {
      name: "Turismo y Experiencias",
      slug: "turismo-experiencias",
      description: "Tours, actividades turísticas y experiencias únicas",
      icon: "🌄",
      color: "#059669",
      order: 19
    }
  ]

  // Primero, eliminar categorías existentes
  console.log('🗑️ Limpiando categorías anteriores...')
  await prisma.category.deleteMany({})

  // Crear nuevas categorías
  for (const category of categories) {
    await prisma.category.create({
      data: category
    })
  }

  console.log(`✅ ${categories.length} categorías creadas exitosamente`)

  // Mostrar resumen por grupos
  console.log('\n📊 Resumen de categorías:')
  console.log('🛍️ PRODUCTOS FÍSICOS (10):')
  console.log('   🎨 Accesorios y Artesanías')
  console.log('   🍯 Alimentos') 
  console.log('   👗 Ropa y Calzado')
  console.log('   💄 Salud y Belleza')
  console.log('   🚗 Autos y Motos')
  console.log('   🐕 Mascotas')
  console.log('   💻 Tecnología')
  console.log('   🏠 Hogar y Construcción')
  console.log('   ☕ Agricultura y Café')
  console.log('   ⚽ Deportes y Recreación')
  
  console.log('\n🔧 SERVICIOS (5):')
  console.log('   💼 Servicios Profesionales')
  console.log('   🔧 Servicios Técnicos')
  console.log('   🧹 Servicios Domésticos')
  console.log('   📚 Educación y Cursos')
  console.log('   🎉 Eventos y Entretenimiento')
  
  console.log('\n🏨 TURISMO Y HOSPITALIDAD (4):')
  console.log('   🍽️ Restaurantes y Cafeterías')
  console.log('   🏨 Hoteles y Alojamiento')
  console.log('   🚛 Transporte y Logística')
  console.log('   🌄 Turismo y Experiencias')

  console.log('\n🎉 Categorías actualizadas exitosamente!')
}

main()
  .catch((e) => {
    console.error('❌ Error updating categories:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
