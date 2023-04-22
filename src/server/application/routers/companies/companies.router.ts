import { CreateCompanySchema, ListPaginatedSchema } from '@/shared/schemas'
import { createTRPCRouter, protectedProcedure } from '@/server/infra/trpc'
import {
  CreateCompanyUseCaseContract,
  CreateCompanyUseCaseContractType,
  ListCompaniesUseCaseContract,
  ListCompaniesUseCaseContractType,
} from '@/server/domain/contracts'
import { container } from '@/server/infra/container'

export const companiesRouter = createTRPCRouter({
  list: protectedProcedure
    .input(ListPaginatedSchema)
    .query(async ({ input }) => {
      const listCompaniesUseCase = container.get<ListCompaniesUseCaseContract>(
        ListCompaniesUseCaseContractType,
      )
      const companies = await listCompaniesUseCase.list(input)
      return companies
    }),
  create: protectedProcedure
    .input(CreateCompanySchema)
    .mutation(async ({ input, ctx }) => {
      const createCompanyUseCase = container.get<CreateCompanyUseCaseContract>(
        CreateCompanyUseCaseContractType,
      )
      const createdCompany = await createCompanyUseCase.create({
        ...input,
        userId: ctx.session.user.id,
      })
      return createdCompany
    }),
})
