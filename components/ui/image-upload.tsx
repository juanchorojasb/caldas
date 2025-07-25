"use client";

import { UploadButton } from "@uploadthing/react";
import { type OurFileRouter } from "@/app/api/uploadthing/core";
import { X, ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxFiles?: number;
}

export function ImageUpload({ value, onChange, maxFiles = 5 }: ImageUploadProps) {
  const onRemove = (url: string) => {
    onChange(value.filter((current) => current !== url));
  };

  return (
    <div className="space-y-4">
      {/* Imágenes actuales */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {value.map((url) => (
            <div key={url} className="relative aspect-square">
              <Image
                src={url}
                alt="Imagen del producto"
                fill
                className="object-cover rounded-lg"
              />
              <button
                onClick={() => onRemove(url)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      {value.length < maxFiles && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <UploadButton<OurFileRouter, "productImageUploader">
            endpoint="productImageUploader"
            onClientUploadComplete={(res) => {
              const newUrls = res?.map((file) => file.url) || [];
              onChange([...value, ...newUrls]);
            }}
            onUploadError={(error: Error) => {
              console.error("Error uploading:", error);
              alert("Error subiendo imagen: " + error.message);
            }}
            appearance={{
              button: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg",
              allowedContent: "text-gray-500 text-sm"
            }}
          />
          <div className="mt-4 flex flex-col items-center text-gray-500">
            <ImageIcon className="h-8 w-8 mb-2" />
            <p className="text-sm">Subir imágenes ({value.length}/{maxFiles})</p>
            <p className="text-xs">PNG, JPG hasta 4MB</p>
          </div>
        </div>
      )}
    </div>
  );
}
