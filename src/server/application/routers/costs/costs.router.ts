import {
  CreateCostSchema,
  DeleteItemSchema,
  GetByIdSchema,
  ListPaginatedSchema,
  UpdateCostSchema,
} from '@/shared/schemas'
import { createTRPCRouter, protectedProcedure } from '@/server/infra/trpc'
import {
  CreateCostUseCaseContract,
  CreateCostUseCaseContractType,
  DeleteCostUseCaseContract,
  DeleteCostUseCaseContractType,
  GetCostByIdUseCaseContract,
  GetCostByIdUseCaseContractType,
  ListCostsUseCaseContract,
  ListCostsUseCaseContractType,
  UpdateCostUseCaseContract,
  UpdateCostUseCaseContractType,
} from '@/server/domain/contracts'
import { container } from '@/server/infra/container'

export const costsRouter = createTRPCRouter({
  getById: protectedProcedure.input(GetByIdSchema).query(async ({ input }) => {
    const getCostByIdUseCase = container.get<GetCostByIdUseCaseContract>(
      GetCostByIdUseCaseContractType,
    )
    const cost = await getCostByIdUseCase.getById(input)
    return cost
  }),
  list: protectedProcedure
    .input(ListPaginatedSchema)
    .query(async ({ input }) => {
      const listCostsUseCase = container.get<ListCostsUseCaseContract>(
        ListCostsUseCaseContractType,
      )
      const costs = await listCostsUseCase.list(input)
      return costs
    }),
  create: protectedProcedure
    .input(CreateCostSchema)
    .mutation(async ({ input, ctx }) => {
      const createCostUseCase = container.get<CreateCostUseCaseContract>(
        CreateCostUseCaseContractType,
      )
      const createdCost = await createCostUseCase.create({
        ...input,
        userId: ctx.session.user.id,
      })
      return createdCost
    }),
  update: protectedProcedure
    .input(UpdateCostSchema)
    .mutation(async ({ input, ctx }) => {
      const updateCostUseCase = container.get<UpdateCostUseCaseContract>(
        UpdateCostUseCaseContractType,
      )
      const updatedCost = await updateCostUseCase.update({
        ...input,
        userId: ctx.session.user.id,
      })
      return updatedCost
    }),
  delete: protectedProcedure
    .input(DeleteItemSchema)
    .mutation(async ({ input }) => {
      const deleteCostUseCase = container.get<DeleteCostUseCaseContract>(
        DeleteCostUseCaseContractType,
      )
      await deleteCostUseCase.delete(input)
    }),
})
