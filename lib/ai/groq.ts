import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!
})

export class GroqAPI {
  async generateBusinessContent(tool: string, prompt: string, userInput: string): Promise<string> {
    try {
      const systemPrompt = `Eres un experto asesor de emprendimiento para el municipio de Caldas, Colombia. Conoces el contexto local, la cultura, los recursos disponibles y las necesidades específicas de la región. Proporciona respuestas prácticas, específicas y adaptadas al contexto local de Caldas.`

      const fullPrompt = `${prompt}\n\nInput del usuario: ${userInput}`

      console.log('🚀 Calling Groq API...')

      const completion = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: fullPrompt }
        ],
        model: 'llama3-70b-8192',
        temperature: 0.7,
        max_tokens: 2000,
      })

      const result = completion.choices[0]?.message?.content || 'No response generated'
      console.log('✅ Groq response received')
      
      return result
    } catch (error) {
      console.error('❌ Groq API Error:', error)
      throw new Error('Failed to generate content with Groq')
    }
  }
}
