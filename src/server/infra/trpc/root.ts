import {
  categoriesRouter,
  companiesRouter,
  receiptsRouter,
  costsRouter,
  configsRouter,
} from '@/server/application/routers'
import { createTRPCRouter } from '@/server/infra/trpc'

export const appRouter = createTRPCRouter({
  company: companiesRouter,
  category: categoriesRouter,
  receipt: receiptsRouter,
  cost: costsRouter,
  config: configsRouter,
})

export type AppRouter = typeof appRouter
