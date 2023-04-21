import { authOptions } from '@/server/infra/auth'
import NextAuth from 'next-auth'

export default NextAuth(authOptions)
