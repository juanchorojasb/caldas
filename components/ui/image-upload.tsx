"use client";

import { useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { X, Upload, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxFiles?: number;
}

export function ImageUpload({ value, onChange, maxFiles = 5 }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadComplete = (files: { url: string }[]) => {
    const newUrls = files.map(file => file.url);
    onChange([...value, ...newUrls]);
    setIsUploading(false);
  };

  const handleRemove = (indexToRemove: number) => {
    onChange(value.filter((_, index) => index !== indexToRemove));
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
                onClick={() => handleRemove(index)}
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
          {isUploading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Subiendo imagen...</p>
            </div>
          ) : (
            <UploadDropzone
              endpoint="productImageUploader"
              onClientUploadComplete={handleUploadComplete}
              onUploadBegin={() => setIsUploading(true)}
              onUploadError={(error) => {
                console.error("Error upload:", error);
                setIsUploading(false);
                alert("Error subiendo imagen: " + error.message);
              }}
              appearance={{
                button: "bg-blue-600 hover:bg-blue-700",
                allowedContent: "text-gray-600",
                label: "text-blue-600 hover:text-blue-700"
              }}
              content={{
                button: ({ ready, isUploading }) => {
                  if (!ready) return "Preparando...";
                  if (isUploading) return "Subiendo...";
                  return `Subir imagen (${value.length}/${maxFiles})`;
                },
                allowedContent: "Imágenes hasta 4MB (PNG, JPG, WEBP)",
                label: "Arrastra imágenes aquí o haz click para seleccionar"
              }}
            />
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
