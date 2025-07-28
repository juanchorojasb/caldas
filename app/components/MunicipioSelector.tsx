'use client';

import { useState } from 'react';
import { MapPin, Users, AlertCircle } from 'lucide-react';

interface MunicipioSelectorProps {
  onMunicipioChange: (municipio: string) => void;
  municipioSeleccionado: string;
}

const municipiosNorteCaldas = [
  {
    id: 'neira',
    nombre: 'Neira',
    descripcion: 'Puerta de entrada al Norte de Caldas',
    disponibles: 8,
    total: 10
  },
  {
    id: 'aranzazu',
    nombre: 'Aranzazu',
    descripcion: 'Faro del Norte - Tradición fiquera',
    disponibles: 7,
    total: 10
  },
  {
    id: 'salamina',
    nombre: 'Salamina',
    descripcion: 'Ciudad de la Luz - Patrimonio Nacional',
    disponibles: 4,
    total: 10
  },
  {
    id: 'pacora',
    nombre: 'Pácora',
    descripcion: 'La Matraca - Música y tradición',
    disponibles: 9,
    total: 10
  },
  {
    id: 'aguadas',
    nombre: 'Aguadas',
    descripcion: 'Pueblo Patrimonio - Tradición y cultura',
    disponibles: 6,
    total: 10
  }
];

export default function MunicipioSelector({ onMunicipioChange, municipioSeleccionado }: MunicipioSelectorProps) {
  const [mostrarInfo, setMostrarInfo] = useState(false);

  const handleMunicipioSelect = (municipioId: string) => {
    const municipio = municipiosNorteCaldas.find(m => m.id === municipioId);
    if (municipio && municipio.disponibles > 0) {
      onMunicipioChange(municipioId);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-700 flex items-center">
          <MapPin className="w-4 h-4 mr-2 text-green-600" />
          Municipio del Norte de Caldas *
        </label>
        <button
          type="button"
          onClick={() => setMostrarInfo(!mostrarInfo)}
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
        >
          <AlertCircle className="w-4 h-4 mr-1" />
          Ver información
        </button>
      </div>

      {mostrarInfo && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
          <h4 className="font-semibold text-blue-800 mb-2">
            🎯 Programa limitado a 10 emprendedores por municipio
          </h4>
          <p className="text-blue-700 mb-2">
            Esta convocatoria está dirigida exclusivamente a emprendedores residentes 
            en los municipios del Norte de Caldas, como parte del programa de desarrollo 
            territorial financiado por el Fondo de Ciencia, Tecnología e Innovación.
          </p>
          <div className="text-blue-600">
            <strong>Municipios participantes:</strong> Neira, Aranzazu, Salamina, 
            Pácora y Aguadas.
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {municipiosNorteCaldas.map((municipio) => {
          const isSeleccionado = municipioSeleccionado === municipio.id;
          const sinCupos = municipio.disponibles === 0;
          
          return (
            <button
              key={municipio.id}
              type="button"
              onClick={() => handleMunicipioSelect(municipio.id)}
              disabled={sinCupos}
              className={`
                relative p-4 rounded-lg border-2 text-left transition-all duration-200
                ${isSeleccionado 
                  ? 'border-green-500 bg-green-50 ring-2 ring-green-200' 
                  : sinCupos
                  ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                  : 'border-gray-200 hover:border-green-300 hover:bg-green-25'
                }
              `}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className={`font-semibold ${isSeleccionado ? 'text-green-800' : sinCupos ? 'text-gray-400' : 'text-gray-800'}`}>
                    {municipio.nombre}
                  </h3>
                  <p className={`text-sm mt-1 ${isSeleccionado ? 'text-green-600' : sinCupos ? 'text-gray-400' : 'text-gray-600'}`}>
                    {municipio.descripcion}
                  </p>
                </div>
                
                <div className="ml-3 text-right">
                  <div className={`flex items-center text-xs ${sinCupos ? 'text-red-500' : 'text-green-600'}`}>
                    <Users className="w-3 h-3 mr-1" />
                    {municipio.disponibles}/{municipio.total}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {sinCupos ? 'Sin cupos' : 'Cupos disponibles'}
                  </div>
                </div>
              </div>
              
              {sinCupos && (
                <div className="absolute inset-0 bg-gray-100 bg-opacity-50 rounded-lg flex items-center justify-center">
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-semibold">
                    CUPOS AGOTADOS
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {!municipioSeleccionado && (
        <p className="text-sm text-red-600 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          Por favor selecciona tu municipio de residencia
        </p>
      )}
    </div>
  );
}
