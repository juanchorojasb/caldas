import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Schema de validación para el registro
const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  firstName: z.string().min(1, 'Nombre requerido'),
  lastName: z.string().min(1, 'Apellido requerido'),
  telefono: z.string().optional(),
  municipio: z.string().optional(),
  nombreNegocio: z.string().optional(),
  nombreTienda: z.string().optional(),
  etapa: z.string().optional(),
  sector: z.string().optional(),
  desafios: z.string().optional(),
  objetivos: z.string().optional(),
  historia: z.string().optional(),
  sitioWeb: z.string().optional(),
  redesSociales: z.string().optional(),
  tiempoExperiencia: z.string().optional(),
  empleados: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar datos
    const validatedData = registerSchema.parse(body)
    
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email.toLowerCase() }
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Este email ya está registrado' },
        { status: 400 }
      )
    }

    // Crear usuario con campos del schema actual
    const user = await prisma.user.create({
      data: {
        email: validatedData.email.toLowerCase(),
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        telefono: validatedData.telefono,
        municipio: validatedData.municipio,
        nombreNegocio: validatedData.nombreNegocio,
        nombreTienda: validatedData.nombreTienda,
        etapa: validatedData.etapa,
        sector: validatedData.sector,
        desafios: validatedData.desafios,
        objetivos: validatedData.objetivos,
        historia: validatedData.historia,
        sitioWeb: validatedData.sitioWeb,
        redesSociales: validatedData.redesSociales,
        tiempoExperiencia: validatedData.tiempoExperiencia,
        empleados: validatedData.empleados,
        clerkId: 'temp-' + Date.now()
      }
    })

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      },
      message: 'Usuario registrado exitosamente'
    })

  } catch (error) {
    console.error('Error in registration:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.issues }, // Corregido: usar 'issues' en lugar de 'errors'
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
