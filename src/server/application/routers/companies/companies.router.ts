import { CreateCompanySchema, ListPaginatedSchema } from '@/shared/schemas'
import { createTRPCRouter, protectedProcedure } from '@/server/infra/trpc'
import { container } from '@/server/infra/container'
import {
  CreateCompanyUseCaseContract,
  CreateCompanyUseCaseContractTypes,
  ListCompaniesUseCaseContract,
  ListCompaniesUseCaseContractTypes,
} from '@/server/domain/contracts'

export const companiesRouter = createTRPCRouter({
  list: protectedProcedure
    .input(ListPaginatedSchema)
    .query(async ({ input }) => {
      const listCompaniesUseCase = container.get<ListCompaniesUseCaseContract>(
        ListCompaniesUseCaseContractTypes.ListCompaniesUseCase,
      )
      const companies = await listCompaniesUseCase.list(input)
      return companies
    }),
  create: protectedProcedure
    .input(CreateCompanySchema)
    .mutation(async ({ input, ctx }) => {
      const createCompanyUseCase = container.get<CreateCompanyUseCaseContract>(
        CreateCompanyUseCaseContractTypes.CreateCompanyUseCase,
      )
      const createdCompany = await createCompanyUseCase.create({
        ...input,
        userId: ctx.session.user.id,
      })
      return createdCompany
    }),
})
