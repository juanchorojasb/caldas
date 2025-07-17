// lib/uploadthing.ts - SIMPLIFICADO
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react"

// Tipo genérico para FileRouter
type FileRouter = any

export const UploadButton = generateUploadButton<FileRouter>()
export const UploadDropzone = generateUploadDropzone<FileRouter>()