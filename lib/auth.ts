import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'

const authConfig = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('🔍 AUTHORIZE CALLED!!!')
        
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const user = await db.user.findUnique({
            where: {
              email: (credentials.email as string).toLowerCase(),
              isActive: true
            }
          })
          
          if (!user || !user.password) {
            return null
          }

          const passwordMatch = await bcrypt.compare(
            (credentials.password as string), 
            user.password
          )
          
          if (!passwordMatch) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            role: user.role
          } as any
        } catch (error) {
          console.error('❌ Error:', error)
          return null
        }
      }
    })
  ],
  session: { strategy: 'jwt' as const },
  secret: process.env.NEXTAUTH_SECRET
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)

