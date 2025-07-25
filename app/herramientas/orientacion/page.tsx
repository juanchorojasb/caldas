'use client';
import { useState } from 'react';
import { useChat } from '@/lib/useChat';

export default function OrientacionPage() {
  const { messages, sendMessage, isLoading } = useChat('orientacion');
  const [inputMessage, setInputMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      await sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const sugerencias = [
    "¿Cuáles son las fechas importantes del programa?",
    "¿Cómo funciona la academia de MercadoLocal.co?",
    "¿Qué instituciones apoyan el programa?",
    "¿Cómo me inscribo al programa?",
    "¿Qué municipios pueden participar?"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🤖 Asistente de Orientación
          </h1>
          <p className="text-gray-600">
            Tu guía personalizada para el programa Norte de Caldas. Pregúntame sobre fechas, 
            requisitos, instituciones de apoyo y todo lo relacionado con tu participación.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg h-[600px] flex flex-col">
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 mt-8">
                    <div className="text-4xl mb-4">💬</div>
                    <p>¡Hola! Soy tu asistente para el programa Norte de Caldas.</p>
                    <p className="text-sm mt-2">Pregúntame lo que necesites saber sobre el programa.</p>
                  </div>
                )}
                
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-blue-500 text-white' 
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

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Escribe tu pregunta aquí..."
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputMessage.trim()}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sugerencias */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">💡 Preguntas frecuentes</h3>
              <div className="space-y-2">
                {sugerencias.map((sugerencia, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(sugerencia)}
                    className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {sugerencia}
                  </button>
                ))}
              </div>
            </div>

            {/* Información rápida */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">📅 Fechas importantes</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Inscripciones:</strong>
                  <br />Hasta el 8 de agosto
                </div>
                <div>
                  <strong>Entrevistas:</strong>
                  <br />9-11 de agosto
                </div>
                <div>
                  <strong>Inicio programa:</strong>
                  <br />12 de agosto
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
