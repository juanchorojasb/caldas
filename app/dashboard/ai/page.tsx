'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Lightbulb, 
  FileText, 
  TrendingUp, 
  Target, 
  MessageSquare, 
  BarChart3,
  Sparkles,
  Clock,
  Copy,
  Download,
  Trash2,
  Star,
  Zap,
  Brain,
  Rocket,
  Users,
  Award
} from 'lucide-react'

interface IATool {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  category: 'marketing' | 'business' | 'content' | 'analysis'
  prompt: string
  placeholder: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: string
  premium: boolean
}

interface GenerationHistory {
  id: string
  toolId: string
  toolTitle: string
  input: string
  result: string
  timestamp: Date
  rating?: number
}

const iaTools: IATool[] = [
  {
    id: 'business-ideas',
    title: 'Generador de Ideas de Negocio',
    description: 'Genera ideas innovadoras específicas para el mercado de Caldas',
    icon: <Lightbulb className="w-6 h-6" />,
    category: 'business',
    prompt: 'Como experto en emprendimiento para Caldas, Colombia, genera 5 ideas de negocio innovadoras considerando: recursos locales (café, agricultura, turismo), necesidades de la comunidad, tendencias actuales del mercado, y oportunidades específicas del municipio. Incluye para cada idea: descripción, mercado objetivo, inversión estimada, y pasos iniciales.',
    placeholder: 'Ejemplo: Me interesa el sector agrícola y tengo $5 millones para invertir...',
    difficulty: 'beginner',
    estimatedTime: '2-3 min',
    premium: false
  },
  {
    id: 'content-creator',
    title: 'Creador de Contenido',
    description: 'Crea posts atractivos y contenido para redes sociales',
    icon: <FileText className="w-6 h-6" />,
    category: 'content',
    prompt: 'Crea contenido profesional y atractivo para redes sociales dirigido a emprendedores de Caldas. Incluye: 3 versiones del post (Instagram, Facebook, LinkedIn), hashtags relevantes locales y nacionales, call-to-action efectivo, y consejos para el mejor horario de publicación.',
    placeholder: 'Describe tu producto/servicio, público objetivo y mensaje principal...',
    difficulty: 'beginner',
    estimatedTime: '1-2 min',
    premium: false
  },
  {
    id: 'market-analysis',
    title: 'Análisis de Mercado',
    description: 'Analiza competencia, precios y oportunidades del mercado',
    icon: <TrendingUp className="w-6 h-6" />,
    category: 'analysis',
    prompt: 'Realiza un análisis completo de mercado para un negocio en Caldas, Colombia. Incluye: análisis de competencia local y regional, estrategia de precios recomendada, oportunidades y amenazas del mercado, perfil del cliente ideal, y recomendaciones estratégicas específicas.',
    placeholder: 'Tipo de negocio, ubicación específica en Caldas, presupuesto...',
    difficulty: 'intermediate',
    estimatedTime: '3-5 min',
    premium: true
  },
  {
    id: 'marketing-strategy',
    title: 'Estrategias de Marketing',
    description: 'Diseña campañas de marketing locales efectivas',
    icon: <Target className="w-6 h-6" />,
    category: 'marketing',
    prompt: 'Diseña una estrategia de marketing integral para un negocio en Caldas. Incluye: canales de marketing locales más efectivos, presupuesto sugerido por canal, calendario de activaciones, eventos locales para participar, estrategias de marketing digital y tradicional, y métricas de éxito.',
    placeholder: 'Describe tu negocio, presupuesto de marketing, y objetivos...',
    difficulty: 'intermediate',
    estimatedTime: '4-6 min',
    premium: true
  },
  {
    id: 'business-assistant',
    title: 'Asistente de Emprendimiento',
    description: 'Consultas y asesoría personalizada de emprendimiento',
    icon: <MessageSquare className="w-6 h-6" />,
    category: 'business',
    prompt: 'Actúa como un mentor experto en emprendimiento para negocios en Caldas, Colombia. Proporciona consejos prácticos, específicos y accionables. Considera el contexto económico local, regulaciones colombianas, y oportunidades específicas de la región.',
    placeholder: 'Haz tu pregunta específica sobre emprendimiento, desafíos o decisiones...',
    difficulty: 'beginner',
    estimatedTime: '1-3 min',
    premium: false
  },
  {
    id: 'business-plan',
    title: 'Plan de Negocios Completo',
    description: 'Estructura y desarrolla un plan de negocios profesional',
    icon: <BarChart3 className="w-6 h-6" />,
    category: 'business',
    prompt: 'Crea un plan de negocios detallado y profesional para un emprendimiento en Caldas. Incluye: resumen ejecutivo, análisis de mercado, modelo de negocio, estrategia de marketing, proyecciones financieras a 3 años, análisis de riesgos, y cronograma de implementación.',
    placeholder: 'Describe detalladamente tu idea de negocio, target, recursos disponibles...',
    difficulty: 'advanced',
    estimatedTime: '8-12 min',
    premium: true
  }
]

const categories = [
  { id: 'all', name: 'Todas', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'business', name: 'Negocio', icon: <Rocket className="w-4 h-4" /> },
  { id: 'marketing', name: 'Marketing', icon: <Target className="w-4 h-4" /> },
  { id: 'content', name: 'Contenido', icon: <FileText className="w-4 h-4" /> },
  { id: 'analysis', name: 'Análisis', icon: <BarChart3 className="w-4 h-4" /> }
]

export default function AIPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTool, setSelectedTool] = useState<IATool | null>(null)
  const [userInput, setUserInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [history, setHistory] = useState<GenerationHistory[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [activeTab, setActiveTab] = useState('tools')

  const filteredTools = selectedCategory === 'all' 
    ? iaTools 
    : iaTools.filter(tool => tool.category === selectedCategory)

  useEffect(() => {
    // Cargar historial del localStorage
    const savedHistory = localStorage.getItem('ai-generation-history')
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  const saveToHistory = (toolId: string, toolTitle: string, input: string, result: string) => {
    const newEntry: GenerationHistory = {
      id: Date.now().toString(),
      toolId,
      toolTitle,
      input,
      result,
      timestamp: new Date()
    }
    const updatedHistory = [newEntry, ...history].slice(0, 20) // Mantener solo 20 entradas
    setHistory(updatedHistory)
    localStorage.setItem('ai-generation-history', JSON.stringify(updatedHistory))
  }

  const handleToolSelect = (tool: IATool) => {
    setSelectedTool(tool)
    setResult('')
    setUserInput('')
    setProgress(0)
  }

  const handleGenerate = async () => {
    if (!selectedTool || !userInput.trim()) return

    setLoading(true)
    setProgress(0)
    
    // Simulación de progreso
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 200)

    try {
      const response = await fetch('/api/ia/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tool: selectedTool.id,
          prompt: selectedTool.prompt,
          userInput: userInput,
        }),
      })

      if (!response.ok) {
        throw new Error('Error generating content')
      }

      const data = await response.json()
      setResult(data.result)
      setProgress(100)
      
      // Guardar en historial
      saveToHistory(selectedTool.id, selectedTool.title, userInput, data.result)
      
    } catch (error) {
      console.error('Error:', error)
      setResult('Error generando contenido. Intenta nuevamente.')
      setProgress(0)
    } finally {
      clearInterval(progressInterval)
      setLoading(false)
      setTimeout(() => setProgress(0), 2000)
    }
  }

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    // Aquí podrías agregar una notificación de éxito
  }

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('ai-generation-history')
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                <Brain className="w-10 h-10 text-green-600" />
                IA para Emprendedores
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Herramientas de inteligencia artificial diseñadas para impulsar tu negocio en Caldas
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{iaTools.length}</div>
                <div className="text-sm text-gray-500">Herramientas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{history.length}</div>
                <div className="text-sm text-gray-500">Generaciones</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tools" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Herramientas
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Historial ({history.length})
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Estadísticas
            </TabsTrigger>
          </TabsList>

          {/* Herramientas Tab */}
          <TabsContent value="tools" className="space-y-6">
            {/* Categorías */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  {category.icon}
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Progress Bar */}
            {loading && (
              <div className="w-full">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Generando contenido...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            )}

            {/* Grid de Herramientas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <Card 
                  key={tool.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                    selectedTool?.id === tool.id ? 'ring-2 ring-green-500 bg-green-50' : ''
                  } ${tool.premium ? 'border-yellow-200' : ''}`}
                  onClick={() => handleToolSelect(tool)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg ${
                          tool.category === 'business' ? 'bg-blue-100' :
                          tool.category === 'marketing' ? 'bg-purple-100' :
                          tool.category === 'content' ? 'bg-green-100' :
                          'bg-orange-100'
                        }`}>
                          {tool.icon}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg font-bold flex items-center gap-2">
                            {tool.title}
                            {tool.premium && <Star className="w-4 h-4 text-yellow-500" />}
                          </CardTitle>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-sm mt-2">
                      {tool.description}
                    </CardDescription>
                    <div className="flex items-center justify-between mt-3">
                      <Badge className={getDifficultyColor(tool.difficulty)}>
                        {tool.difficulty}
                      </Badge>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {tool.estimatedTime}
                      </span>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Área de Generación */}
            {selectedTool && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <Card className="h-fit">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      {selectedTool.icon}
                      <span>{selectedTool.title}</span>
                      {selectedTool.premium && <Badge variant="secondary">Premium</Badge>}
                    </CardTitle>
                    <CardDescription>{selectedTool.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder={selectedTool.placeholder}
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      rows={8}
                      className="resize-none"
                    />
                    <div className="flex space-x-2">
                      <Button 
                        onClick={handleGenerate}
                        disabled={loading || !userInput.trim()}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Generando...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Generar Contenido
                          </>
                        )}
                      </Button>
                      <Button 
                        onClick={() => {setUserInput(''); setResult('')}}
                        variant="outline"
                        disabled={loading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="h-fit">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Resultado</span>
                      {result && (
                        <div className="flex space-x-2">
                          <Button 
                            onClick={() => handleCopy(result)}
                            variant="outline"
                            size="sm"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button 
                            onClick={() => handleDownload(result, selectedTool.title)}
                            variant="outline"
                            size="sm"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="min-h-[400px] p-4 bg-gray-50 rounded-lg">
                      {loading ? (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Generando contenido con IA...</p>
                          </div>
                        </div>
                      ) : result ? (
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">{result}</div>
                      ) : (
                        <div className="text-gray-500 text-center mt-32">
                          <div className="mb-4">
                            <MessageSquare className="w-16 h-16 mx-auto text-gray-400" />
                          </div>
                          <p className="text-lg">Selecciona una herramienta y escribe tu consulta</p>
                          <p className="text-sm mt-2">El contenido generado aparecerá aquí</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Historial Tab */}
          <TabsContent value="history" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Historial de Generaciones</h2>
              {history.length > 0 && (
                <Button onClick={clearHistory} variant="outline">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Limpiar Historial
                </Button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-xl text-gray-600">No hay generaciones previas</p>
                <p className="text-gray-500">Usa las herramientas de IA para comenzar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((item) => (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{item.toolTitle}</CardTitle>
                          <CardDescription>
                            {new Date(item.timestamp).toLocaleString('es-CO')}
                          </CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            onClick={() => handleCopy(item.result)}
                            variant="outline"
                            size="sm"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button 
                            onClick={() => handleDownload(item.result, `${item.toolTitle}-${Date.now()}`)}
                            variant="outline"
                            size="sm"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Input:</p>
                          <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                            {item.input}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Resultado:</p>
                          <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded max-h-32 overflow-y-auto">
                            {item.result}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Estadísticas Tab */}
          <TabsContent value="stats" className="space-y-6">
            <h2 className="text-2xl font-bold">Estadísticas de Uso</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <Users className="w-8 h-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-2xl font-bold">{history.length}</p>
                      <p className="text-sm text-gray-600">Generaciones Totales</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <Zap className="w-8 h-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-2xl font-bold">{iaTools.length}</p>
                      <p className="text-sm text-gray-600">Herramientas Disponibles</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <Award className="w-8 h-8 text-yellow-600" />
                    <div className="ml-4">
                      <p className="text-2xl font-bold">{iaTools.filter(t => t.premium).length}</p>
                      <p className="text-sm text-gray-600">Herramientas Premium</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <Clock className="w-8 h-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-2xl font-bold">
                        {history.length > 0 ? Math.round(history.length / 7) : 0}
                      </p>
                      <p className="text-sm text-gray-600">Promedio Semanal</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Herramientas más usadas */}
            <Card>
              <CardHeader>
                <CardTitle>Herramientas Más Utilizadas</CardTitle>
              </CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No hay datos suficientes para mostrar estadísticas
                  </p>
                ) : (
                  <div className="space-y-3">
                    {Object.entries(
                      history.reduce((acc, item) => {
                        acc[item.toolTitle] = (acc[item.toolTitle] || 0) + 1
                        return acc
                      }, {} as Record<string, number>)
                    )
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 5)
                    .map(([toolTitle, count]) => (
                      <div key={toolTitle} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{toolTitle}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${(count / Math.max(...Object.values(history.reduce((acc, item) => {
                                acc[item.toolTitle] = (acc[item.toolTitle] || 0) + 1
                                return acc
                              }, {} as Record<string, number>)))) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
