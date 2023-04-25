import { categoriesRouter, companiesRouter } from '@/server/application/routers'
import { createTRPCRouter } from '@/server/infra/trpc'

export const appRouter = createTRPCRouter({
  company: companiesRouter,
  category: categoriesRouter,
})

export type AppRouter = typeof appRouter
