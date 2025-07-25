import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, type, context } = await request.json();

    // Respuestas personalizadas por tipo de herramienta
    const responses = {
      orientacion: getOrientacionResponse(message),
      ideas: getIdeasResponse(message),
      modelo: getModeloResponse(message)
    };

    const response = responses[type as keyof typeof responses] || 
      "Gracias por tu consulta. Te ayudo con información específica del programa Norte de Caldas.";

    return NextResponse.json({ response });

  } catch (error) {
    console.error('Error en chat API:', error);
    return NextResponse.json(
      { error: 'Error procesando solicitud' },
      { status: 500 }
    );
  }
}

function getOrientacionResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('fecha') || lowerMessage.includes('cuando')) {
    return `📅 **Fechas importantes del programa Norte de Caldas:**

- **Inscripciones:** Hasta el 8 de agosto de 2025
- **Entrevistas:** 9, 10 y 11 de agosto de 2025  
- **Inicio del programa:** 12 de agosto de 2025
- **Duración:** 6 meses de acompañamiento

¿Necesitas información sobre alguna fecha específica?`;
  }
  
  return `Gracias por tu pregunta sobre el programa Norte de Caldas. 

Puedo ayudarte con:
- 📅 Fechas e inscripciones
- 📋 Requisitos y proceso
- 🏘️ Municipios participantes  
- 🎓 Academia (5 niveles)
- 🤝 Instituciones de apoyo

¿Qué te gustaría saber específicamente?`;
}

function getIdeasResponse(message: string): string {
  return `💡 **Análisis de tu idea de negocio**

Para darte una evaluación más precisa, cuéntame:

🎯 **¿Cuál es tu idea específica?**
🏘️ **¿En qué municipio la desarrollarías?**
💰 **¿Qué presupuesto inicial tienes?**
👥 **¿A quién está dirigida?**

**SECTORES CON POTENCIAL en Norte de Caldas:**
- 🌱 Agricultura sostenible
- 🏨 Turismo rural  
- 🛍️ Comercio especializado

¡Comparte más detalles y te doy un análisis completo!`;
}

function getModeloResponse(message: string): string {
  return `📊 **Business Model Canvas**

**LOS 9 BLOQUES ESENCIALES:**

1️⃣ Segmentos de clientes 👥
2️⃣ Propuesta de valor 💎  
3️⃣ Canales 📱
4️⃣ Relaciones con clientes 🤝

**¿QUÉ QUIERES HACER?**
- 🚀 Empezar desde cero
- 💡 Tengo una idea, ayúdame a estructurarla

¡Dime cómo puedo ayudarte!`;
}
