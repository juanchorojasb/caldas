'use client';
import { useState } from 'react';
import { useChat } from '@/lib/useChat';

export default function IdeasPage() {
  const { messages, sendMessage, isLoading } = useChat('ideas');
  const [inputMessage, setInputMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      await sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const categorias = [
    { emoji: "🌱", nombre: "Agricultura", ejemplo: "Cultivos orgánicos en Salamina" },
    { emoji: "🏨", nombre: "Turismo", ejemplo: "Turismo rural en Aguadas" },
    { emoji: "🛍️", nombre: "Comercio", ejemplo: "Tienda virtual regional" },
    { emoji: "🍯", nombre: "Productos locales", ejemplo: "Miel de abejas artesanal" },
    { emoji: "🎓", nombre: "Educación", ejemplo: "Cursos online especializados" },
    { emoji: "🔧", nombre: "Servicios", ejemplo: "Reparaciones a domicilio" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            💡 Evaluador de Ideas de Negocio
          </h1>
          <p className="text-gray-600">
            Comparte tu idea y recibe un análisis personalizado para el Norte de Caldas. 
            Evaluamos viabilidad, mercado potencial y oportunidades regionales.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat principal */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg h-[600px] flex flex-col">
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 mt-8">
                    <div className="text-4xl mb-4">🚀</div>
                    <p>¡Cuéntame tu idea de negocio!</p>
                    <p className="text-sm mt-2">La evaluaré considerando las oportunidades específicas del Norte de Caldas.</p>
                  </div>
                )}
                
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-purple-500 text-white' 
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
                    placeholder="Describe tu idea de negocio..."
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputMessage.trim()}
                    className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50"
                  >
                    Evaluar
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categorías */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">🎯 Sectores populares</h3>
              <div className="space-y-3">
                {categorias.map((categoria, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(`Quiero evaluar una idea de ${categoria.nombre.toLowerCase()}: ${categoria.ejemplo}`)}
                    className="w-full text-left p-3 hover:bg-gray-50 rounded-md transition-colors border border-gray-100"
                  >
                    <div className="font-medium text-sm">
                      {categoria.emoji} {categoria.nombre}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {categoria.ejemplo}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Metodología */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">📊 Evaluamos</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div>✅ Viabilidad técnica</div>
                <div>💰 Potencial financiero</div>
                <div>🎯 Mercado regional</div>
                <div>📈 Escalabilidad</div>
                <div>🤝 Recursos necesarios</div>
                <div>🌍 Impacto social</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
