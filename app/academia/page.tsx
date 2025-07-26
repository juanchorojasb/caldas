"use client";

import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

export default function AcademiaPage() {
  const { user } = useUser();

  const niveles = [
    {
      id: 'nivel-1',
      titulo: 'Nivel 1: Fundamentos del Emprendimiento',
      descripcion: 'Aprende los conceptos básicos para iniciar tu negocio',
      duracion: '2 semanas',
      lecciones: 8,
      disponible: true,
      color: 'bg-green-500'
    },
    {
      id: 'nivel-2', 
      titulo: 'Nivel 2: Validación de Ideas',
      descripcion: 'Valida tu idea de negocio con metodologías probadas',
      duracion: '3 semanas',
      lecciones: 12,
      disponible: true,
      color: 'bg-blue-500'
    },
    {
      id: 'nivel-3',
      titulo: 'Nivel 3: Modelo de Negocio',
      descripcion: 'Construye tu Business Model Canvas paso a paso',
      duracion: '3 semanas', 
      lecciones: 15,
      disponible: true,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎓 Academia MercadoLocal
          </h1>
          <p className="text-xl text-gray-600">
            Programa completo de formación empresarial para emprendedores del Norte de Caldas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {niveles.map((nivel, index) => (
            <div key={nivel.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className={`h-2 ${nivel.color}`}></div>
              <div className="p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {nivel.titulo}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {nivel.descripcion}
                </p>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>📚 {nivel.lecciones} lecciones</span>
                  <span>⏱️ {nivel.duracion}</span>
                </div>
                <Link 
                  href={`/courses/${nivel.id}`}
                  className={`block w-full text-center py-2 px-4 rounded-lg font-medium text-white ${nivel.color} hover:opacity-90`}
                >
                  Acceder
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
