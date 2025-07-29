import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

const PRODUCTOS_DIR = join(process.cwd(), 'public', 'data', 'productos')

// Asegurar que el directorio existe
async function ensureDir() {
  try {
    await mkdir(PRODUCTOS_DIR, { recursive: true })
  } catch (error) {
    // Directorio ya existe
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    await ensureDir()

    // Leer archivo del usuario
    const userFile = join(PRODUCTOS_DIR, `${userId}.json`)
    
    try {
      const data = await readFile(userFile, 'utf8')
      const productos = JSON.parse(data)
      
      return NextResponse.json({
        productos: productos || [],
        total: productos?.length || 0,
        vendedor: {
          id: userId,
          nombre: "Usuario",
          negocio: "Negocio"
        }
      })
    } catch (error) {
      // Archivo no existe, devolver array vacío
      return NextResponse.json({
        productos: [],
        total: 0,
        vendedor: {
          id: userId,
          nombre: "Usuario", 
          negocio: "Negocio"
        }
      })
    }

  } catch (error) {
    console.error('Error fetching productos:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("✅ API PRODUCTOS JSON - Iniciando creación");
    
    const { userId } = await auth()

    if (!userId) {
      console.log("❌ No hay userId");
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    console.log("✅ Usuario autenticado:", userId);

    // Obtener datos del producto
    const data = await request.json()
    console.log("✅ Datos recibidos:", data);
    
    const { name, description, price, category, images, isActive, isFeatured } = data

    // Crear producto
    const producto = {
      id: uuidv4(),
      name,
      description,
      price: parseFloat(price || 0),
      category,
      images: images || [],
      isActive: isActive ?? true,
      isFeatured: isFeatured ?? false,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    console.log("✅ Producto a crear:", producto);

    await ensureDir()

    // Leer productos existentes del usuario
    const userFile = join(PRODUCTOS_DIR, `${userId}.json`)
    let productos = []
    
    try {
      const data = await readFile(userFile, 'utf8')
      productos = JSON.parse(data)
    } catch (error) {
      // Archivo no existe, crear nuevo array
      productos = []
    }

    // Añadir nuevo producto
    productos.push(producto)

    // Guardar archivo actualizado
    await writeFile(userFile, JSON.stringify(productos, null, 2))

    console.log("✅ Producto guardado exitosamente");

    return NextResponse.json({
      success: true,
      producto,
      message: 'Producto creado exitosamente'
    })

  } catch (error) {
    console.error('❌ Error creating producto:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const data = await request.json()
    const { id, name, description, price, category, images, isActive, isFeatured } = data

    await ensureDir()

    // Leer productos del usuario
    const userFile = join(PRODUCTOS_DIR, `${userId}.json`)
    let productos = []
    
    try {
      const fileData = await readFile(userFile, 'utf8')
      productos = JSON.parse(fileData)
    } catch (error) {
      return NextResponse.json({ error: 'Productos no encontrados' }, { status: 404 })
    }

    // Buscar y actualizar producto
    const index = productos.findIndex((p: any) => p.id === id)
    
    if (index === -1) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })
    }

    productos[index] = {
      ...productos[index],
      name,
      description,
      price: parseFloat(price),
      category,
      images: images || [],
      isActive,
      isFeatured,
      updatedAt: new Date().toISOString()
    }

    // Guardar archivo actualizado
    await writeFile(userFile, JSON.stringify(productos, null, 2))

    return NextResponse.json({
      success: true,
      producto: productos[index],
      message: 'Producto actualizado exitosamente'
    })

  } catch (error) {
    console.error('Error updating producto:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID de producto requerido' }, { status: 400 })
    }

    await ensureDir()

    // Leer productos del usuario
    const userFile = join(PRODUCTOS_DIR, `${userId}.json`)
    let productos = []
    
    try {
      const fileData = await readFile(userFile, 'utf8')
      productos = JSON.parse(fileData)
    } catch (error) {
      return NextResponse.json({ error: 'Productos no encontrados' }, { status: 404 })
    }

    // Filtrar producto a eliminar
    const productosActualizados = productos.filter((p: any) => p.id !== id)
    
    if (productosActualizados.length === productos.length) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })
    }

    // Guardar archivo actualizado
    await writeFile(userFile, JSON.stringify(productosActualizados, null, 2))

    return NextResponse.json({
      success: true,
      message: 'Producto eliminado exitosamente'
    })

  } catch (error) {
    console.error('Error deleting producto:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
