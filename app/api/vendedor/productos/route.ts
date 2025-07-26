import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const formData = await request.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string;
    const category = formData.get('category') as string;
    const imagesJson = formData.get('images') as string;
    
    // Parsear imágenes
    const imageUrls = JSON.parse(imagesJson || '[]');
    const imagesString = JSON.stringify(imageUrls);

    // Crear slug simple
    const slug = name.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50) + '-' + Date.now();

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        images: imagesString,
        vendorId: userId,
        categoryId: category, // Usamos category como categoryId por ahora
        slug,
        isActive: true,
        isFeatured: false,
        stock: 100, // Default stock
      },
    });

    console.log('✅ Producto creado:', {
      id: product.id,
      name: product.name,
      imageCount: imageUrls.length
    });

    return NextResponse.json({ 
      success: true,
      product: {
        id: product.id,
        name: product.name,
        price: product.price
      }
    }, { status: 201 });

  } catch (error) {
    console.error('❌ Error creando producto:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}
