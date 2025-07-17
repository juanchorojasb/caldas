// app/api/ia/content/route.ts - TYPESCRIPT CORREGIDO
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ 
      error: 'Acceso denegado. Inicia sesión para usar las herramientas IA.' 
    }, { status: 401 })
  }

  try {
    const { prompt, type, businessInfo } = await request.json()

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json({ 
        error: 'Descripción del proyecto requerida' 
      }, { status: 400 })
    }

    if (prompt.length > 2000) {
      return NextResponse.json({ 
        error: 'La descripción debe tener menos de 2000 caracteres' 
      }, { status: 400 })
    }

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: getSystemPrompt(type)
          },
          {
            role: 'user',
            content: buildUserPrompt(prompt, businessInfo, session.user.name || session.user.email || 'Usuario')
          }
        ],
        max_tokens: 1500,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Error DeepSeek API:', response.status, errorText)
      
      if (response.status === 401) {
        return NextResponse.json({ 
          error: 'Error de configuración de API. Contacta al administrador.' 
        }, { status: 500 })
      }
      
      throw new Error(`DeepSeek API Error: ${response.status}`)
    }

    const data = await response.json()
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Respuesta inválida de DeepSeek API')
    }
    
    console.log(`IA Content Generated - User: ${session.user.email}, Type: ${type}, Tokens: ${data.usage?.total_tokens || 0}`)
    
    return NextResponse.json({
      content: data.choices[0].message.content,
      tokens_used: data.usage?.total_tokens || 0,
      model_used: data.model || 'deepseek-chat',
      generated_by: session.user.name || session.user.email,
      generated_at: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Error en API IA:', error)
    return NextResponse.json({ 
      error: 'Error interno del servidor. Intenta nuevamente en unos minutos.' 
    }, { status: 500 })
  }
}

function buildUserPrompt(prompt: string, businessInfo?: string, userName?: string): string {
  let userPrompt = `Usuario: ${userName || 'Emprendedor'}\n\n`
  userPrompt += `SOLICITUD: ${prompt.trim()}\n\n`
  
  if (businessInfo && businessInfo.trim()) {
    userPrompt += `INFORMACIÓN DEL NEGOCIO:\n${businessInfo.trim()}\n\n`
  }
  
  userPrompt += `CONTEXTO: Emprendedor del Norte de Caldas, Colombia buscando asesoría profesional especializada.`
  
  return userPrompt
}

function getSystemPrompt(type: string): string {
  const prompts: Record<string, string> = {
    'branding': 'Eres un experto en branding para emprendedores del Norte de Caldas. Crea nombres comerciales únicos, slogans memorables y propuestas de valor diferenciadas. Incluye 3 opciones de nombres, slogans principales y alternativos, propuesta de valor clara, paleta de colores sugerida y tono de comunicación recomendado.',
    
    'content': 'Eres un especialista en marketing de contenidos para emprendedores caldenses. Crea contenido atractivo para redes sociales, posts web y campañas. Incluye versiones cortas para stories, medias para posts, largas para blogs, hashtags estratégicos con #NorteDeCaldas, y consejos de distribución.',
    
    'canvas': 'Eres un consultor en Business Model Canvas para emprendedores del Norte de Caldas. Estructura modelos de negocio viables presentando los 9 bloques: segmentos de clientes, propuesta de valor, canales, relación con clientes, fuentes de ingresos, recursos clave, actividades clave, socios clave y estructura de costos.',
    
    'marketing': 'Eres un estratega de marketing digital para pequeñas empresas caldenses. Desarrolla estrategias integrales incluyendo objetivos SMART, estrategia de redes sociales, presupuesto sugerido, cronograma de 90 días, tácticas locales y métricas de seguimiento.',
    
    'financial': 'Eres un asesor financiero para emprendedores del Norte de Caldas. Proporciona análisis prácticos incluyendo proyecciones de ingresos a 12 meses, estructura de costos, punto de equilibrio, flujo de caja, opciones de financiamiento local y ratios financieros clave.'
  }
  
  return prompts[type] || 'Eres un asistente especializado en emprendimiento para el Norte de Caldas, Colombia. Proporciona consejos prácticos y factibles adaptados al contexto regional.'
}