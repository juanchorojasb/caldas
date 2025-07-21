import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

const authConfig = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('🔍 AUTHORIZE CALLED - Email:', credentials?.email)
        
        if (!credentials?.email || !credentials?.password) {
          console.log('❌ Missing credentials')
          return null
        }

        try {
          const user = await db.user.findUnique({
            where: {
              email: (credentials.email as string).toLowerCase()
            }
          })

          if (!user || !user.password) {
            console.log('❌ User not found or no password')
            return null
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          )

          if (!passwordMatch) {
            console.log('❌ Password mismatch')
            return null
          }

          console.log('✅ Auth successful for:', user.email)
          
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          } as any
        } catch (error) {
          console.error('❌ Auth error:', error)
          return null
        }
      }
    })
  ],
  
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/error"
  },
  
  session: { 
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60
  },
  
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id
        token.role = user.role
        console.log('✅ JWT created for user:', user.email)
      }
      return token
    },
    
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.id
        session.user.role = token.role
        console.log('✅ Session created for user:', session.user.email)
      }
      return session
    },
    
    async redirect({ url, baseUrl }: any) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  
  events: {
    async signIn({ user }: any) {
      console.log('📝 User signed in:', user?.email)
    },
    async signOut() {
      console.log('📝 User signed out')
    }
  },
  
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  debug: process.env.NODE_ENV === "development"
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)

// Helper functions simplificadas
export async function getCurrentUser() {
  try {
    const session = await auth()
    return session?.user || null
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export async function requireAuth() {
  const session = await auth()
  if (!session?.user) {
    throw new Error('Authentication required')
  }
  return session.user
}
