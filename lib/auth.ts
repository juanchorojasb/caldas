import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '@/lib/prisma'

export const {
  handlers,
  auth,
  signIn,
  signOut
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        const fullUser = await prisma.user.findUnique({
          where: { id: user.id },
          include: {
            subscriptions: {
              where: { status: 'active' },
              orderBy: { createdAt: 'desc' }
            },
            store: true
          }
        })

        if (fullUser) {
          session.user.id = fullUser.id
          session.user.clerkId = fullUser.clerkId
          session.user.telefono = fullUser.telefono
          session.user.municipio = fullUser.municipio
          session.user.nombreNegocio = fullUser.nombreNegocio
          session.user.nombreTienda = fullUser.nombreTienda
          session.user.etapa = fullUser.etapa
          session.user.sector = fullUser.sector
          
          const hasActiveSubscription = fullUser.subscriptions && fullUser.subscriptions.length > 0
          session.user.hasActiveSubscription = hasActiveSubscription
          session.user.currentPlan = hasActiveSubscription ? fullUser.subscriptions[0].plan : null
          
          const hasStore = fullUser.store !== null
          session.user.hasStore = hasStore
          session.user.storeSlug = hasStore ? fullUser.store?.slug : null
        }
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    }
  },
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-out',
    error: '/auth/error'
  },
  session: {
    strategy: 'database'
  }
})

export async function getAuthUser() {
  const session = await auth()
  return session?.user || null
}

export async function checkUserSubscription(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      subscriptions: {
        where: { status: 'active' },
        orderBy: { createdAt: 'desc' }
      }
    }
  })
  
  return {
    hasActiveSubscription: !!(user?.subscriptions && user.subscriptions.length > 0),
    currentPlan: user?.subscriptions?.[0]?.plan || null
  }
}
