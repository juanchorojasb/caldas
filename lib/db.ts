import { PrismaClient } from '@prisma/client'

declare global {
  var __db__: PrismaClient | undefined
}

// Configuración del cliente Prisma
const createPrismaClient = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

// Usar singleton pattern para evitar múltiples instancias en desarrollo
export const db = globalThis.__db__ ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.__db__ = db
}