'use client'

import React, { useState } from 'react';
import { createProduct } from '../../../actions/products'

export default function NuevoProducto() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: 'EMPRESARIAL'
  });
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('description', formData.description);
    formDataObj.append('price', formData.price);
    formDataObj.append('categoryId', formData.categoryId);
    
    console.log('📝 Form data:', Object.fromEntries(formDataObj));
    
    const result = await createProduct(formDataObj);
    
    console.log('📊 Result:', result);
    
    if (result.success) {
      alert('¡Producto creado exitosamente!');
      // Reset form
      setFormData({ name: '', description: '', price: '', categoryId: 'EMPRESARIAL' });
    } else {
      alert(`Error: ${result.error}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al crear producto');
  } finally {
    setLoading(false);
  }
};
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Nuevo Producto</h1>
      
<form action={createProduct} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Precio</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Categoría</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="EMPRESARIAL">Empresarial</option>
            <option value="HUMANA">Habilidades Humanas</option>
            <option value="TECNICA">Técnica</option>
            <option value="MARKETING">Marketing</option>
            <option value="FINANZAS">Finanzas</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Creando...' : 'Crear Producto'}
        </button>
      </form>
    </div>
  );
}
