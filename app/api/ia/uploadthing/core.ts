// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next"
import { auth } from "@/lib/auth"

const f = createUploadthing()

export const ourFileRouter = {
  // Imagen de perfil del usuario
  profileImage: f({ 
    image: { 
      maxFileSize: "2MB",
      maxFileCount: 1
    } 
  })
    .middleware(async () => {
      const session = await auth()
      if (!session) throw new Error("No autorizado")
      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Imagen de perfil subida:", file.url, "por usuario:", metadata.userId)
      return { uploadedBy: metadata.userId, fileUrl: file.url }
    }),

  // Logo/imagen del emprendimiento
  businessLogo: f({ 
    image: { 
      maxFileSize: "4MB",
      maxFileCount: 1
    } 
  })
    .middleware(async () => {
      const session = await auth()
      if (!session) throw new Error("No autorizado")
      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Logo de negocio subido:", file.url)
      return { uploadedBy: metadata.userId, fileUrl: file.url }
    }),

  // Documentos del curso/academia
  courseDocument: f({ 
    "application/pdf": { maxFileSize: "16MB" },
    "application/msword": { maxFileSize: "8MB" },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { maxFileSize: "8MB" }
  })
    .middleware(async () => {
      const session = await auth()
      if (!session) throw new Error("No autorizado")
      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Documento de curso subido:", file.url)
      return { uploadedBy: metadata.userId, fileUrl: file.url }
    }),

  // Presentaciones/recursos empresariales
  businessResource: f({ 
    "application/pdf": { maxFileSize: "32MB" },
    "application/vnd.ms-powerpoint": { maxFileSize: "16MB" },
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": { maxFileSize: "16MB" },
    "application/vnd.ms-excel": { maxFileSize: "8MB" },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": { maxFileSize: "8MB" }
  })
    .middleware(async () => {
      const session = await auth()
      if (!session) throw new Error("No autorizado")
      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Recurso empresarial subido:", file.url)
      return { uploadedBy: metadata.userId, fileUrl: file.url }
    }),

  // Imágenes de productos/servicios
  productImage: f({ 
    image: { 
      maxFileSize: "8MB",
      maxFileCount: 5
    } 
  })
    .middleware(async () => {
      const session = await auth()
      if (!session) throw new Error("No autorizado")
      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Imagen de producto subida:", file.url)
      return { uploadedBy: metadata.userId, fileUrl: file.url }
    }),

} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter