'use client';
import { useState } from 'react';
import { useChat } from '@/lib/useChat';

export default function ModeloPage() {
  const { messages, sendMessage, isLoading } = useChat('modelo');
  const [inputMessage, setInputMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      await sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const bloques = [
    { id: 1, nombre: "Segmentos de clientes", emoji: "👥", color: "bg-blue-100" },
    { id: 2, nombre: "Propuesta de valor", emoji: "💎", color: "bg-green-100" },
    { id: 3, nombre: "Canales", emoji: "📱", color: "bg-yellow-100" },
    { id: 4, nombre: "Relaciones con clientes", emoji: "🤝", color: "bg-purple-100" },
    { id: 5, nombre: "Fuentes de ingresos", emoji: "💰", color: "bg-green-200" },
    { id: 6, nombre: "Recursos clave", emoji: "🔧", color: "bg-orange-100" },
    { id: 7, nombre: "Actividades clave", emoji: "⚡", color: "bg-red-100" },
    { id: 8, nombre: "Socios clave", emoji: "🏢", color: "bg-indigo-100" },
    { id: 9, nombre: "Estructura de costos", emoji: "📊", color: "bg-gray-100" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            📊 Business Model Canvas
          </h1>
          <p className="text-gray-600">
            Construye tu modelo de negocio con metodología Strategyzer adaptada al Norte de Caldas. 
            Te guío paso a paso por los 9 bloques esenciales.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Canvas visual */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">🎨 Canvas Visual</h2>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {bloques.map((bloque) => (
                  <button
                    key={bloque.id}
                    onClick={() => setInputMessage(`Ayúdame con el bloque ${bloque.id}: ${bloque.nombre}`)}
                    className={`p-3 rounded-lg border-2 ${bloque.color} hover:border-gray-400 transition-colors`}
                  >
                    <div className="text-lg mb-1">{bloque.emoji}</div>
                    <div className="text-xs font-medium text-gray-700">
                      {bloque.id}. {bloque.nombre}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat */}
            <div className="bg-white rounded-lg shadow-lg h-[500px] flex flex-col">
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 mt-8">
                    <div className="text-4xl mb-4">🎯</div>
                    <p>¡Vamos a construir tu Business Model Canvas!</p>
                    <p className="text-sm mt-2">Pregúntame sobre cualquier bloque o empecemos por el principio.</p>
                  </div>
                )}
                
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Pregunta sobre cualquier bloque del canvas..."
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputMessage.trim()}
                    className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
                  >
                    Preguntar
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Acciones rápidas */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">🚀 Comenzar</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setInputMessage("Quiero empezar mi Business Model Canvas desde cero")}
                  className="w-full text-left p-2 text-sm bg-orange-50 hover:bg-orange-100 rounded-md transition-colors"
                >
                  📋 Comenzar desde cero
                </button>
                <button
                  onClick={() => setInputMessage("Tengo una idea de negocio pero no sé cómo estructurarla en el canvas")}
                  className="w-full text-left p-2 text-sm bg-orange-50 hover:bg-orange-100 rounded-md transition-colors"
                >
                  💡 Tengo una idea
                </button>
                <button
                  onClick={() => setInputMessage("Mi negocio ya existe, quiero mejorar mi modelo")}
                  className="w-full text-left p-2 text-sm bg-orange-50 hover:bg-orange-100 rounded-md transition-colors"
                >
                  📈 Mejorar modelo existente
                </button>
              </div>
            </div>

            {/* Metodología */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">📚 Metodología</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <div>✅ Strategyzer oficial</div>
                <div>🎯 Adaptado al contexto regional</div>
                <div>💼 Ejemplos locales</div>
                <div>🤝 Socios regionales</div>
                <div>📊 Análisis de viabilidad</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
