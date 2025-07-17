import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { db } from '@/lib/db'

const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Contraseña debe tener al menos 6 caracteres'),
  first_name: z.string().min(1, 'Nombre es requerido'),
  last_name: z.string().optional().default(''),
  municipality: z.enum(['NEIRA', 'ARANZAZU', 'PACORA', 'SALAMINA', 'AGUADAS']),
  business_stage: z.enum(['PRE_SEMILLA', 'SEMILLA', 'TEMPRANA', 'CRECIMIENTO', 'CONSOLIDACION']),
  business_name: z.string().min(1, 'Nombre del negocio es requerido'),
  business_type: z.string().min(1, 'Tipo de negocio es requerido'),
  phone: z.string().optional(),
  website: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  whatsapp: z.string().optional(),
  accepted_terms: z.boolean().refine(val => val === true, {
    message: 'Debes aceptar los términos y condiciones'
  })
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('📥 API recibió:', body)

    const validatedData = registerSchema.parse(body)
    console.log('✅ Validación exitosa:', validatedData)

    const existingUser = await db.user.findUnique({
      where: { email: validatedData.email.toLowerCase() }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Usuario ya registrado con este email' },
        { status: 400 }
      )
    }

    const hashedPassword = await hash(validatedData.password, 12)

    // ✅ CORREGIDO: Usar nombres de columnas exactos de la DB (snake_case)
    const user = await db.user.create({
      data: {
        email: validatedData.email.toLowerCase(),
        password: hashedPassword,
        firstName: validatedData.first_name,      // ✅ snake_case
        lastName: validatedData.last_name || '',  // ✅ snake_case
        phone: validatedData.phone || null,
        website: validatedData.website || null,
        instagram: validatedData.instagram || null,
        facebook: validatedData.facebook || null,
        whatsapp: validatedData.whatsapp || null,
        municipality: validatedData.municipality,
        businessName: validatedData.business_name,    // ✅ snake_case
        businessType: validatedData.business_type,    // ✅ snake_case
        businessStage: validatedData.business_stage,  // ✅ snake_case
        role: 'STUDENT',
        isActive: true,                               // ✅ snake_case
        acceptedTerms: validatedData.accepted_terms   // ✅ snake_case
      }
    })

    console.log('✅ Usuario creado exitosamente')

    return NextResponse.json({
      success: true,
      message: 'Usuario registrado exitosamente',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,   // ✅ snake_case para consistencia
        lastName: user.lastName      // ✅ snake_case para consistencia
      }
    }, { status: 201 })

  } catch (error) {
    console.error('❌ Error en registro:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Datos inválidos',
        details: error.issues
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor'
    }, { status: 500 })
  }
}
