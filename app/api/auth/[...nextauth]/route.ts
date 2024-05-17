import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const email = credentials?.email.toString()
        const hashPassword = credentials?.password.toString()
        try {
          const user = await prisma.user.findUnique({ where: { email } })
          if (!user) {
            throw new Error('User not found')
          }
          const passwordCorrect = await compare(
            hashPassword || '',
            user.password
          )
          if (passwordCorrect) {
            // Return user data if necessary
            return {
              id: user.id,
              email: user.email,
              // Add other necessary user data
            }
          } else {
            throw new Error('Incorrect password')
          }
        } catch (error) {
          // Handle errors appropriately
          // console.error('Authentication error:', error)
          return null
        }
      },
    }),
  ],
})

export { handler as GET, handler as POST }
