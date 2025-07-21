interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

export class DeepSeekAPI {
  private apiKey: string
  private baseURL: string

  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY!
    this.baseURL = 'https://api.deepseek.com/v1'
  }

  async generateContent(messages: DeepSeekMessage[]): Promise<string> {
    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: messages,
          temperature: 0.7,
          max_tokens: 2000,
        }),
      })

      if (!response.ok) {
        throw new Error(`DeepSeek API error: ${response.status}`)
      }

      const data: DeepSeekResponse = await response.json()
      return data.choices[0]?.message?.content || 'No response generated'
    } catch (error) {
      console.error('DeepSeek API Error:', error)
      throw new Error('Failed to generate content')
    }
  }

  async generateBusinessContent(tool: string, prompt: string, userInput: string): Promise<string> {
    const systemPrompt = `Eres un experto asesor de emprendimiento para el municipio de Caldas, Colombia. 
    Conoces el contexto local, la cultura, los recursos disponibles y las necesidades específicas de la región.
    Proporciona respuestas prácticas, específicas y adaptadas al contexto local de Caldas.`

    const fullPrompt = `${prompt}\n\nInput del usuario: ${userInput}`

    const messages: DeepSeekMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: fullPrompt }
    ]

    return await this.generateContent(messages)
  }
}
