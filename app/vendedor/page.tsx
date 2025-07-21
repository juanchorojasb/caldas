import React from 'react';

export default function VendorDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Bienvenido a tu panel de vendedor</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900">Ventas del Mes</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">$1,247,500</p>
          <p className="text-sm text-gray-500 mt-1">+12% vs mes anterior</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900">Pedidos</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">67</p>
          <p className="text-sm text-gray-500 mt-1">3 pendientes</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900">Productos</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">24</p>
          <p className="text-sm text-gray-500 mt-1">12 activos</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pedidos Recientes</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <div>
              <p className="font-medium">#2156 - María González</p>
              <p className="text-sm text-gray-600">Ruana Caldense Tradicional</p>
            </div>
            <div className="text-right">
              <p className="font-bold">$85,000</p>
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Pendiente</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <div>
              <p className="font-medium">#2155 - Carlos Ramírez</p>
              <p className="text-sm text-gray-600">Café Premium 500g</p>
            </div>
            <div className="text-right">
              <p className="font-bold">$25,000</p>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Completado</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">🚀 Panel en Desarrollo</h3>
        <p className="text-gray-700">Próximamente: gestión completa de productos, servicios, estadísticas avanzadas y más.</p>
        <div className="mt-4 space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Agregar Producto
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Ver Estadísticas
          </button>
        </div>
      </div>
    </div>
  );
}
