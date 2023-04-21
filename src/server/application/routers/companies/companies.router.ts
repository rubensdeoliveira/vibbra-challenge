import { container } from 'tsyringe'

import {
  CreateCompanyUseCase,
  ListCompaniesUseCase,
} from '@/server/domain/use-cases'
import { CreateCompanySchema, ListPaginatedSchema } from '@/shared/schemas'
import { createTRPCRouter, protectedProcedure } from '@/server/infra/trpc'

export const companiesRouter = createTRPCRouter({
  list: protectedProcedure
    .input(ListPaginatedSchema)
    .query(async ({ input }) => {
      const listCompaniesUseCase = container.resolve(ListCompaniesUseCase)
      const companies = await listCompaniesUseCase.list(input)
      return companies
    }),
  create: protectedProcedure
    .input(CreateCompanySchema)
    .mutation(async ({ input }) => {
      const createCompanyUseCase = container.resolve(CreateCompanyUseCase)
      const createdCompany = await createCompanyUseCase.create(input)
      return createdCompany
    }),
})
