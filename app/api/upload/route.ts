import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'No autenticado' }, 
        { status: 401 }
      );
    }

    const data = await request.formData();
    const files: File[] = data.getAll('files') as unknown as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No se encontraron archivos' }, 
        { status: 400 }
      );
    }

    if (files.length > 5) {
      return NextResponse.json(
        { error: 'Máximo 5 imágenes permitidas' }, 
        { status: 400 }
      );
    }

    const uploadedFiles = [];

    for (const file of files) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        return NextResponse.json(
          { error: `${file.name} no es una imagen válida` }, 
          { status: 400 }
        );
      }

      // Validar tamaño (4MB)
      if (file.size > 4 * 1024 * 1024) {
        return NextResponse.json(
          { error: `${file.name} excede el tamaño máximo de 4MB` }, 
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generar nombre único
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(7);
      const extension = file.name.split('.').pop();
      const fileName = `${userId}_${timestamp}_${randomString}.${extension}`;

      // Ruta del archivo
      const uploadDir = join(process.cwd(), 'public', 'uploads', 'productos');
      const filePath = join(uploadDir, fileName);
      
      try {
        await writeFile(filePath, buffer);
        uploadedFiles.push({
          name: file.name,
          url: `/uploads/productos/${fileName}`,
          size: file.size
        });
      } catch (writeError) {
        console.error('Error escribiendo archivo:', writeError);
        return NextResponse.json(
          { error: 'Error guardando archivo' }, 
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ 
      success: true, 
      files: uploadedFiles,
      count: uploadedFiles.length
    });

  } catch (error) {
    console.error('Error en upload:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' }, 
      { status: 500 }
    );
  }
}
