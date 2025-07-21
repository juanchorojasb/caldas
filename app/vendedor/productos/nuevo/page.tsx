'use client'

import React, { useState, useEffect } from 'react';
import { Upload, X, Plus, DollarSign, Package, Tag, FileText, Camera, Save, ArrowLeft } from 'lucide-react';

interface FormData {
  name: string;
  description: string;
  price: string;
  comparePrice: string;
  categoryId: string;
  stock: string;
  sku: string;
  tags: string;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface ImageFile {
  file: File;
  preview: string;
  id: string;
}

interface FormErrors {
  [key: string]: string | null;
}

const NuevoProducto = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: '',
    comparePrice: '',
    categoryId: '',
    stock: '',
    sku: '',
    tags: '',
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    }
  });

  const [images, setImages] = useState<ImageFile[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Cargar categorías al montar el componente
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Limpiar errores del campo al escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) { // 5MB límite
        alert('La imagen debe ser menor a 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('Solo se permiten imágenes');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setImages(prev => [...prev, {
          file,
          preview: event.target?.result as string,
          id: Math.random().toString(36).substr(2, 9)
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (imageId: string) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Nombre es requerido';
    if (!formData.description.trim()) newErrors.description = 'Descripción es requerida';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Precio válido es requerido';
    if (!formData.categoryId) newErrors.categoryId = 'Categoría es requerida';
    if (images.length === 0) newErrors.images = 'Al menos una imagen es requerida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Preparar datos para envío
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        comparePrice: formData.comparePrice ? parseFloat(formData.comparePrice) : null,
        stock: formData.stock ? parseInt(formData.stock) : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        dimensions: JSON.stringify(formData.dimensions),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        images: images.map(img => img.preview) // Por ahora usar base64, después implementar upload real
      };

      console.log('📦 Datos del producto:', productData);

      const response = await fetch('/api/vendedor/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });

      const result = await response.json();

      if (result.success) {
        alert('¡Producto creado exitosamente!');
        // Redirect to products list
        window.location.href = '/vendedor/productos';
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error al crear el producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => window.history.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Nuevo Producto</h1>
            <p className="text-gray-600">Agrega un nuevo producto a tu tienda</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Información básica */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center space-x-2 mb-4">
                <Package className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Información Básica</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del Producto *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ej: Ruana Caldense Tradicional"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Describe tu producto, materiales, características especiales..."
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoría *
                  </label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.categoryId ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Selecciona una categoría</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Etiquetas
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="artesanía, lana, tradicional, caldas (separadas por comas)"
                  />
                  <p className="text-sm text-gray-500 mt-1">Ayuda a los clientes a encontrar tu producto</p>
                </div>
              </div>
            </div>

            {/* Precios */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center space-x-2 mb-4">
                <DollarSign className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold">Precios</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Precio de Venta *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="1000"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="85000"
                  />
                  {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Precio Antes (Opcional)
                  </label>
                  <input
                    type="number"
                    name="comparePrice"
                    value={formData.comparePrice}
                    onChange={handleInputChange}
                    min="0"
                    step="1000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="100000"
                  />
                  <p className="text-sm text-gray-500 mt-1">Para mostrar descuentos</p>
                </div>
              </div>
            </div>

            {/* Inventario */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center space-x-2 mb-4">
                <Tag className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold">Inventario</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cantidad en Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SKU (Código)
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="RUA-001"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Columna lateral */}
          <div className="space-y-6">
            {/* Imágenes */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center space-x-2 mb-4">
                <Camera className="w-5 h-5 text-pink-600" />
                <h3 className="text-lg font-semibold">Imágenes *</h3>
              </div>

              <div className="space-y-4">
                {/* Upload area */}
                <label className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  errors.images ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                }`}>
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Click para subir imágenes<br />
                    <span className="text-xs">PNG, JPG hasta 5MB</span>
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}

                {/* Preview de imágenes */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {images.map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.preview}
                          alt="Preview"
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Botón de guardar */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Guardar Producto</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NuevoProducto;
