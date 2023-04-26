import { type GetServerSidePropsContext } from 'next'
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { env } from '@/server/infra/env/env.mjs'
import { prisma } from '@/server/infra/database'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user']
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
    async signIn({ user }) {
      const email = user.email
      if (email) {
        const findRegisteredUser = await prisma.user.findUnique({
          where: {
            email,
          },
        })
        if (findRegisteredUser) {
          const findConfig = await prisma.config.findUnique({
            where: { userId: findRegisteredUser.id },
          })
          if (!findConfig) {
            await prisma.config.create({
              data: {
                meiLimit: 81000,
                notifyByEmail: false,
                notifyBySms: false,
                userId: findRegisteredUser.id,
              },
            })
          }
          return true
        } else {
          return true
        }
      }

      return true
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
}

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req']
  res: GetServerSidePropsContext['res']
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions)
}
