import React from 'react';

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Panel Vendedor</h1>
          <p className="text-gray-600">MercadoLocal Caldas</p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
}
