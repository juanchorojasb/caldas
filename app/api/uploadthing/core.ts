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
.middleware(async ({ req }) => {
      try {
        const { userId } = await auth();
        
        if (!userId) {
          console.log("❌ No hay usuario autenticado");
          throw new Error("No autenticado");
        }
        
        console.log("✅ Usuario autenticado:", userId.substring(0, 8) + "...");
        return { userId };
      } catch (error) {
console.error("❌ Auth error:", error instanceof Error ? error.message : String(error));
        throw new Error("Autenticación fallida");
      }
    })
.onUploadComplete(async ({ metadata, file }) => {
      try {
        const userId = metadata?.userId || 'unknown';
        const fileUrl = file?.url || 'no-url';
        
        // Logs más seguros
        if (userId !== 'unknown') {
          console.log(`✅ Upload success - User: ${userId}`);
        }
        
        return {
          uploadedBy: userId,
          url: fileUrl
        };
      } catch (error) {
        console.error("❌ Callback error:", error);
        return { uploadedBy: 'error', url: 'error' };
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
