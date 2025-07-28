import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

export const ourFileRouter = {
  productImageUploader: f({ 
    image: { 
      maxFileSize: "4MB", 
      maxFileCount: 5 
    } 
  })
    .middleware(async () => {
      try {
        const { userId } = auth();
        
        if (!userId) {
          throw new Error("Usuario no autenticado");
        }

        console.log("UploadThing middleware - userId:", userId);
        return { userId };
      } catch (error) {
        console.error("Error en middleware UploadThing:", error);
        throw new Error("Error de autenticación");
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload completo para usuario:", metadata.userId);
      console.log("Archivo URL:", file.url);
      
      // Aquí podrías guardar en base de datos si necesitas
      // await db.image.create({ data: { url: file.url, userId: metadata.userId } })
      
      return { 
        uploadedBy: metadata.userId,
        url: file.url 
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
