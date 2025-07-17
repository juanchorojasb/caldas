// app/dashboard/ai/page.tsx
import ContentGenerator from '@/components/ContentGenerator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sparkles, Brain, MessageSquare, FileText, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'

export default function AIPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🤖 Academia IA - Mercado Local Caldas
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Inteligencia Artificial especializada para emprendedores del Norte de Caldas
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              ✅ DeepSeek Conectado
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              📁 UploadThing Activo
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              🚀 Academia Online
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Brain className="mx-auto h-8 w-8 text-purple-500 mb-2" />
              <p className="text-2xl font-bold">5</p>
              <p className="text-sm text-gray-600">Herramientas IA</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="mx-auto h-8 w-8 text-blue-500 mb-2" />
              <p className="text-2xl font-bold">150+</p>
              <p className="text-sm text-gray-600">Emprendedores</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <FileText className="mx-auto h-8 w-8 text-green-500 mb-2" />
              <p className="text-2xl font-bold">1000+</p>
              <p className="text-sm text-gray-600">Contenidos Generados</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="mx-auto h-8 w-8 text-orange-500 mb-2" />
              <p className="text-2xl font-bold">85%</p>
              <p className="text-sm text-gray-600">Éxito Empresarial</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Herramientas IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Genera contenido, branding y estrategias con inteligencia artificial</p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <span>🎨</span> Generador de Branding
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span>📱</span> Creador de Contenido
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span>📊</span> Business Canvas
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span>🚀</span> Estrategias de Marketing
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span>💰</span> Análisis Financiero
                </div>
              </div>
              <Button variant="outline" className="w-full bg-white text-purple-600 hover:bg-gray-100">
                🤖 Usar Herramientas IA
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Chat Inteligente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Asistente IA 24/7 especializado en emprendimiento</p>
              <Link href="/dashboard/chat">
                <Button variant="outline" className="w-full bg-white text-blue-600 hover:bg-gray-100">
                  💬 Abrir Chat IA
                </Button>
              </Link>
              <div className="mt-4 space-y-1 text-sm">
                <p>✅ Consultas empresariales</p>
                <p>✅ Soporte de cursos</p>
                <p>✅ Recordatorios automáticos</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recursos & Archivos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Sube y gestiona documentos de tu emprendimiento</p>
              <Link href="/dashboard/files">
                <Button variant="outline" className="w-full bg-white text-green-600 hover:bg-gray-100">
                  📁 Gestionar Archivos
                </Button>
              </Link>
              <div className="mt-4 space-y-1 text-sm">
                <p>📄 Documentos PDF</p>
                <p>🖼️ Imágenes de productos</p>
                <p>📊 Plantillas empresariales</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Generator */}
        <ContentGenerator />

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
                🌟 Academia Mercado Local Caldas
              </h3>
              <p className="text-gray-600 mb-4">
                Formando emprendedores exitosos en el Norte de Caldas con tecnología de vanguardia
              </p>
              <div className="flex justify-center gap-4 text-sm text-gray-500 flex-wrap">
                <span className="flex items-center gap-1">
                  🏢 Manizales, Caldas
                </span>
                <span className="flex items-center gap-1">
                  📧 academia@mercadolocal.co
                </span>
                <span className="flex items-center gap-1">
                  📱 WhatsApp: +57 300 123 4567
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}