import {
  CreateCompanySchema,
  DeleteItemSchema,
  GetByIdSchema,
  ListPaginatedSchema,
  UpdateCompanySchema,
} from '@/shared/schemas'
import { createTRPCRouter, protectedProcedure } from '@/server/infra/trpc'
import {
  CreateCompanyUseCaseContract,
  CreateCompanyUseCaseContractType,
  DeleteCompanyUseCaseContract,
  DeleteCompanyUseCaseContractType,
  GetCompanyByIdUseCaseContract,
  GetCompanyByIdUseCaseContractType,
  ListCompaniesUseCaseContract,
  ListCompaniesUseCaseContractType,
  UpdateCompanyUseCaseContract,
  UpdateCompanyUseCaseContractType,
} from '@/server/domain/contracts'
import { container } from '@/server/infra/container'

export const companiesRouter = createTRPCRouter({
  getById: protectedProcedure.input(GetByIdSchema).query(async ({ input }) => {
    const getCompanyByIdUseCase = container.get<GetCompanyByIdUseCaseContract>(
      GetCompanyByIdUseCaseContractType,
    )
    const companies = await getCompanyByIdUseCase.getById(input)
    return companies
  }),
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
  update: protectedProcedure
    .input(UpdateCompanySchema)
    .mutation(async ({ input, ctx }) => {
      const updateCompanyUseCase = container.get<UpdateCompanyUseCaseContract>(
        UpdateCompanyUseCaseContractType,
      )
      const updatedCompany = await updateCompanyUseCase.update({
        ...input,
        userId: ctx.session.user.id,
      })
      return updatedCompany
    }),
  delete: protectedProcedure
    .input(DeleteItemSchema)
    .mutation(async ({ input }) => {
      const deleteCompanyUseCase = container.get<DeleteCompanyUseCaseContract>(
        DeleteCompanyUseCaseContractType,
      )
      const deletedCompany = await deleteCompanyUseCase.delete(input)
      return deletedCompany
    }),
})
