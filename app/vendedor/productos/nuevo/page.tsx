"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { ImageUpload } from "@/components/ui/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NuevoProducto() {
  const { user } = useUser();
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Crear objeto JSON en lugar de FormData
      const productData = {
        name: formData.get('name'),
        description: formData.get('description'),
        price: formData.get('price'),
        category: formData.get('category'),
        images: images, // Array directo
        isActive: true,
        isFeatured: false
      };

      console.log("🔍 Frontend - Enviando datos:", productData);

      const response = await fetch('/api/vendedor/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData), // ← Enviar JSON
      });

      console.log("🔍 Frontend - Response status:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Frontend - Producto creado:", result);
        alert('¡Producto creado exitosamente!');
        setImages([]);
        e.currentTarget.reset();
      } else {
        const errorText = await response.text();
        console.error("❌ Frontend - Error response:", errorText);
        alert('Error creando producto: ' + errorText);
      }
    } catch (error) {
      console.error("❌ Frontend - Error catch:", error);
      alert('Error: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🛍️ Crear Nuevo Producto</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Nombre del Producto</label>
          <Input name="name" required placeholder="Ej: Café orgánico de Manizales" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Descripción</label>
          <Textarea
            name="description"
            required
            rows={4}
            placeholder="Describe tu producto, ingredientes, proceso de elaboración..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Precio (COP)</label>
          <Input
            name="price"
            type="number"
            step="0.01"
            required
            placeholder="25000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Categoría</label>
          <select
            name="category"
            required
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccionar categoría</option>
            <option value="comida">🍽️ Comida</option>
            <option value="bebidas">🥤 Bebidas</option>
            <option value="ropa">👕 Ropa</option>
            <option value="artesanias">🎨 Artesanías</option>
            <option value="servicios">🔧 Servicios</option>
            <option value="otros">📦 Otros</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            📷 Imágenes del Producto ({images.length}/5)
          </label>
          <ImageUpload
            value={images}
            onChange={setImages}
            maxFiles={5}
          />
          {images.length === 0 && (
            <p className="text-sm text-red-500 mt-2">* Debes subir al menos 1 imagen</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={loading || images.length === 0}
          className="w-full"
        >
          {loading ? '⏳ Creando...' : '✨ Crear Producto'}
        </Button>
      </form>
    </div>
  );
}
