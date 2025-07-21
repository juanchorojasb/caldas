import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { db } from '@/lib/db'

// Schema de validación flexible para el registro
const registerSchema = z.object({
  // Acepta tanto name como firstName/lastName
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
  firstName: z.string().min(1, 'El nombre es requerido').optional(),
  lastName: z.string().min(1, 'El apellido es requerido').optional(),
  
  // Email y password obligatorios
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  
  // Campos opcionales
  phone: z.string().optional(),
  municipality: z.string().optional(),
  whatsapp: z.string().optional(),
  
  // Términos (opcional para compatibilidad)
  acceptedTerms: z.boolean().optional()
}).refine(
  (data) => data.name || (data.firstName && data.lastName),
  {
    message: "Debes proporcionar un nombre completo o nombre y apellido",
    path: ["name"]
  }
)

export async function POST(request: NextRequest) {
  try {
    console.log('📝 Iniciando registro de usuario...')
    
    // Parsear el body de la request
    const body = await request.json()
    console.log('📤 Datos recibidos:', { ...body, password: '[HIDDEN]' })
    
    // Validar los datos
    const validation = registerSchema.safeParse(body)
    
    if (!validation.success) {
      console.log('❌ Validación fallida:', validation.error.issues)
      return NextResponse.json(
        { 
          success: false, 
          message: 'Datos inválidos',
          errors: validation.error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
          }))
        },
        { status: 400 }
      )
    }

    const validatedData = validation.data

    // Verificar si el usuario ya existe
    const existingUser = await db.user.findUnique({
      where: {
        email: validatedData.email.toLowerCase()
      }
    })

    if (existingUser) {
      console.log('❌ Usuario ya existe:', validatedData.email)
      return NextResponse.json(
        { 
          success: false, 
          message: 'Este email ya está registrado' 
        },
        { status: 400 }
      )
    }

    // Crear nombre completo
    let fullName: string

    if (validatedData.name) {
      fullName = validatedData.name
    } else if (validatedData.firstName || validatedData.lastName) {
      fullName = `${validatedData.firstName || ''} ${validatedData.lastName || ''}`.trim()
    } else {
      // Fallback: usar parte del email
      fullName = validatedData.email.split('@')[0]
    }

    console.log('👤 Nombre completo generado:', fullName)

    // Hash de la contraseña
    const hashedPassword = await hash(validatedData.password, 12)
    console.log('🔒 Contraseña hasheada')

    // Crear el usuario
    const user = await db.user.create({
      data: {
        name: fullName,
        email: validatedData.email.toLowerCase(),
        password: hashedPassword,
        phone: validatedData.phone || validatedData.whatsapp || null,
        role: 'USER',
        isVerified: false
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    })

    console.log('✅ Usuario creado exitosamente:', user.email)

    // Log de actividad (opcional - no falla si no existe la tabla)
    try {
      await db.activityLog.create({
        data: {
          userId: user.id,
          action: 'USER_REGISTERED',
          description: `Usuario registrado: ${user.email}`,
          metadata: JSON.stringify({
            userAgent: request.headers.get('user-agent'),
            ip: request.headers.get('x-forwarded-for') || 'unknown',
            municipality: validatedData.municipality
          })
        }
      })
      console.log('📊 Log de actividad creado')
    } catch (logError) {
      console.log('⚠️ No se pudo crear log de actividad (tabla no existe):', logError)
      // No fallar el registro por esto
    }

    // Respuesta exitosa
    return NextResponse.json({
      success: true,
      message: 'Usuario registrado exitosamente',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    console.error('❌ Error en registro:', error)

    // Error de Prisma - constraint único
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Este email ya está registrado' 
        },
        { status: 400 }
      )
    }

    // Error de base de datos
    if (error instanceof Error && error.message.includes('database')) {
      console.error('💾 Error de base de datos:', error.message)
      return NextResponse.json(
        { 
          success: false, 
          message: 'Error de conexión con la base de datos' 
        },
        { status: 503 }
      )
    }

    // Error genérico
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error interno del servidor' 
      },
      { status: 500 }
    )
  }
}

// Método GET para verificar disponibilidad de email (opcional)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email requerido' },
        { status: 400 }
      )
    }

    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true }
    })

    return NextResponse.json({
      success: true,
      available: !existingUser,
      message: existingUser ? 'Email no disponible' : 'Email disponible'
    })
  } catch (error) {
    console.error('Error checking email availability:', error)
    return NextResponse.json(
      { success: false, message: 'Error interno' },
      { status: 500 }
    )
  }
}
