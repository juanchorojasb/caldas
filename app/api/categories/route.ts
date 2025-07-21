import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Categorías basadas en el enum CourseCategory
    const categories = [
      { id: 'EMPRESARIAL', name: 'Empresarial', icon: '🏢' },
      { id: 'HUMANA', name: 'Habilidades Humanas', icon: '👥' },
      { id: 'TECNICA', name: 'Técnica', icon: '⚙️' },
      { id: 'MARKETING', name: 'Marketing', icon: '📈' },
      { id: 'FINANZAS', name: 'Finanzas', icon: '💰' }
    ];

    return NextResponse.json({
      success: true,
      categories: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
