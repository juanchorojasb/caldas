import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
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
    
    // Convertir array a JSON string para el campo Text
    const imagesString = JSON.stringify(imageUrls);

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        images: imagesString, // Guardamos como JSON string
        vendorId: userId,
        categoryId: category, // Por ahora usamos category como categoryId
        slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        isActive: true,
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
