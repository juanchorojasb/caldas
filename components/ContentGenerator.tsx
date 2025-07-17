'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

interface GeneratedContent {
  content: string
  tokens_used: number
  type: string
  timestamp: Date
}

export default function ContentGenerator() {
  const [prompt, setPrompt] = useState('')
  const [businessInfo, setBusinessInfo] = useState('')
  const [result, setResult] = useState<GeneratedContent | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('branding')

  const generateContent = async (type: string) => {
    if (!prompt.trim()) {
      alert('Por favor, escribe una descripción de lo que necesitas generar')
      return
    }
    
    setLoading(true)
    try {
      const response = await fetch('/api/ai/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: prompt.trim(), 
          type,
          businessInfo: businessInfo.trim()
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error en la generación')
      }
      
      const data = await response.json()
      setResult({
        content: data.content,
        tokens_used: data.tokens_used,
        type,
        timestamp: new Date()
      })
    } catch (error) {
      console.error('Error:', error)
      alert(`Error al generar contenido: ${error instanceof Error ? error.message : 'Error desconocido'}`)
    }
    setLoading(false)
  }

  const copyToClipboard = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result.content)
        alert('¡Contenido copiado al portapapeles!')
      } catch (error) {
        // Fallback para navegadores que no soportan clipboard API
        const textArea = document.createElement('textarea')
        textArea.value = result.content
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        alert('¡Contenido copiado!')
      }
    }
  }

  const downloadContent = () => {
    if (result) {
      const blob = new Blob([result.content], { type: 'text/plain;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `contenido-${result.type}-${Date.now()}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const toolsConfig = {
    branding: {
      title: '🎨 Generador de Branding',
      description: 'Nombres, slogans y propuesta de valor',
      color: 'bg-purple-500 hover:bg-purple-600',
      placeholder: 'Ej: Necesito un nombre para mi panadería que vende productos artesanales en Neira...'
    },
    content: {
      title: '📱 Creador de Contenido',
      description: 'Posts, textos web y campañas',
      color: 'bg-blue-500 hover:bg-blue-600',
      placeholder: 'Ej: Crea un post para Instagram sobre mi nuevo producto...'
    },
    canvas: {
      title: '📊 Business Model Canvas',
      description: 'Modelo de negocio estructurado',
      color: 'bg-green-500 hover:bg-green-600',
      placeholder: 'Ej: Ayúdame a crear el modelo de negocio para mi tienda...'
    },
    marketing: {
      title: '🚀 Estrategia de Marketing',
      description: 'Planes y tácticas digitales',
      color: 'bg-orange-500 hover:bg-orange-600',
      placeholder: 'Ej: Necesito una estrategia de marketing para mi restaurante...'
    },
    financial: {
      title: '💰 Análisis Financiero',
      description: 'Proyecciones y presupuestos',
      color: 'bg-emerald-500 hover:bg-emerald-600',
      placeholder: 'Ej: Ayúdame con las proyecciones financieras...'
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            ✨ Generador de Contenido IA ✨
          </CardTitle>
          <p className="text-gray-600">
            Potencia tu emprendimiento con inteligencia artificial especializada
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel de Entrada */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>📝 Información de tu negocio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="businessInfo">Datos de tu emprendimiento (opcional)</Label>
                <Input
                  id="businessInfo"
                  placeholder="Ej: Panadería en Neira, 5 años, productos artesanales..."
                  value={businessInfo}
                  onChange={(e) => setBusinessInfo(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="prompt">¿Qué necesitas generar? *</Label>
                <Textarea
                  id="prompt"
                  placeholder={toolsConfig[activeTab as keyof typeof toolsConfig].placeholder}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="mt-1 min-h-[120px]"
                  rows={5}
                />
              </div>

              {/* Tabs simplificados */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {Object.entries(toolsConfig).map(([key, config]) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === key
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {config.title.split(' ')[0]} {config.title.split(' ')[1]}
                    </button>
                  ))}
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">
                    {toolsConfig[activeTab as keyof typeof toolsConfig].title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {toolsConfig[activeTab as keyof typeof toolsConfig].description}
                  </p>
                  <Button
                    onClick={() => generateContent(activeTab)}
                    disabled={loading || !prompt.trim()}
                    className={`${toolsConfig[activeTab as keyof typeof toolsConfig].color} text-white disabled:opacity-50`}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generando...
                      </>
                    ) : (
                      <>
                        ✨ Generar {toolsConfig[activeTab as keyof typeof toolsConfig].title.split(' ')[1]}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel de Resultados */}
        <div>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                📋 Resultado
                {result && (
                  <div className="flex gap-2">
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      size="sm"
                    >
                      📋 Copiar
                    </Button>
                    <Button
                      onClick={downloadContent}
                      variant="outline"
                      size="sm"
                    >
                      💾 Descargar
                    </Button>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
                  <p className="mt-2 text-gray-500">Generando con IA...</p>
                  <p className="text-xs text-gray-400">Esto puede tomar unos segundos</p>
                </div>
              )}

              {result && !loading && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary">
                      {toolsConfig[result.type as keyof typeof toolsConfig]?.title}
                    </Badge>
                    <Badge variant="outline">
                      {result.tokens_used} tokens
                    </Badge>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm">
                      {result.content}
                    </pre>
                  </div>

                  <p className="text-xs text-gray-500">
                    Generado el {result.timestamp.toLocaleString('es-CO')}
                  </p>
                </div>
              )}

              {!result && !loading && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">✨</div>
                  <p>Selecciona una herramienta y describe tu necesidad</p>
                  <p className="text-xs mt-1">Los resultados aparecerán aquí</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}