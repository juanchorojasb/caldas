"use client";

import { useState, useRef } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxFiles?: number;
}

export function ImageUpload({ value = [], onChange, maxFiles = 5 }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    // Verificar límite de archivos
    if (value.length + files.length > maxFiles) {
      alert(`Máximo ${maxFiles} imágenes permitidas`);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      
      Array.from(files).forEach((file) => {
        formData.append('files', file);
      });

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error subiendo archivos');
      }

      const data = await response.json();
      
      if (data.success) {
        const newUrls = data.files.map((file: any) => file.url);
        onChange([...value, ...newUrls]);
        setUploadProgress(100);
        
        // Reset input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }

    } catch (error) {
      console.error('Error uploading:', error);
      alert(error instanceof Error ? error.message : 'Error subiendo imágenes');
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const removeImage = (indexToRemove: number) => {
    const newImages = value.filter((_, index) => index !== indexToRemove);
    onChange(newImages);
  };

  const canUploadMore = value.length < maxFiles;

  return (
    <div className="space-y-4">
      {/* Imágenes subidas */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {value.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Imagen ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border border-gray-200"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Uploader */}
      {canUploadMore && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files)}
            disabled={isUploading}
            className="hidden"
            id="image-upload"
          />
          
          <label 
            htmlFor="image-upload" 
            className={`cursor-pointer block ${isUploading ? 'cursor-not-allowed' : ''}`}
          >
            <div className="space-y-2 text-center">
              <div className="mx-auto w-12 h-12 text-gray-400">
                <Upload className="w-full h-full" />
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {isUploading ? 'Subiendo imágenes...' : 'Selecciona imágenes'}
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, WEBP (máx. 4MB cada una)
                </p>
                <p className="text-xs text-gray-400">
                  {value.length}/{maxFiles} imágenes
                </p>
              </div>
              
              {!isUploading && (
                <div className="mt-2">
                  <span className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Elegir Archivos
                  </span>
                </div>
              )}
            </div>
          </label>

          {/* Progress Bar */}
          {isUploading && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{uploadProgress}%</p>
            </div>
          )}
        </div>
      )}

      {/* Info */}
      <div className="text-sm text-gray-600">
        <p>• Máximo {maxFiles} imágenes</p>
        <p>• Tamaño máximo: 4MB por imagen</p>
        <p>• Formatos: PNG, JPG, WEBP</p>
      </div>
    </div>
  );
}
