import { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      clerkId?: string | null
      telefono?: string | null
      municipio?: string | null
      nombreNegocio?: string | null
      nombreTienda?: string | null
      etapa?: string | null
      sector?: string | null
      hasActiveSubscription?: boolean
      currentPlan?: string | null
      hasStore?: boolean
      storeSlug?: string | null
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    id: string
    clerkId?: string | null
    telefono?: string | null
    municipio?: string | null
    nombreNegocio?: string | null
    nombreTienda?: string | null
    etapa?: string | null
    sector?: string | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
  }
}
