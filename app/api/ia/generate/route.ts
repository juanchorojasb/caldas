import { NextRequest, NextResponse } from 'next/server'
import { GroqAPI } from '@/lib/ai/groq'

export async function POST(request: NextRequest) {
  try {
    const { tool, prompt, userInput } = await request.json()

    if (!tool || !prompt || !userInput) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'Groq API key not configured' },
        { status: 500 }
      )
    }

    console.log(`🤖 Generating content for tool: ${tool}`)

    const groq = new GroqAPI()
    const result = await groq.generateBusinessContent(tool, prompt, userInput)

    console.log(`✅ Content generated successfully`)

    return NextResponse.json({
      success: true,
      result: result,
      tool: tool
    })

  } catch (error) {
    console.error('❌ Error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to generate content'
      },
      { status: 500 }
    )
  }
}
