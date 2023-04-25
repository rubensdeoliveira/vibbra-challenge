import {
  CreateReceiptSchema,
  DeleteItemSchema,
  GetByIdSchema,
  ListPaginatedSchema,
  UpdateReceiptSchema,
} from '@/shared/schemas'
import { createTRPCRouter, protectedProcedure } from '@/server/infra/trpc'
import {
  CreateReceiptUseCaseContract,
  CreateReceiptUseCaseContractType,
  DeleteReceiptUseCaseContract,
  DeleteReceiptUseCaseContractType,
  GetReceiptByIdUseCaseContract,
  GetReceiptByIdUseCaseContractType,
  ListReceiptsUseCaseContract,
  ListReceiptsUseCaseContractType,
  UpdateReceiptUseCaseContract,
  UpdateReceiptUseCaseContractType,
} from '@/server/domain/contracts'
import { container } from '@/server/infra/container'

export const receiptsRouter = createTRPCRouter({
  getById: protectedProcedure.input(GetByIdSchema).query(async ({ input }) => {
    const getReceiptByIdUseCase = container.get<GetReceiptByIdUseCaseContract>(
      GetReceiptByIdUseCaseContractType,
    )
    const receipt = await getReceiptByIdUseCase.getById(input)
    return receipt
  }),
  list: protectedProcedure
    .input(ListPaginatedSchema)
    .query(async ({ input }) => {
      const listReceiptsUseCase = container.get<ListReceiptsUseCaseContract>(
        ListReceiptsUseCaseContractType,
      )
      const receipts = await listReceiptsUseCase.list(input)
      return receipts
    }),
  create: protectedProcedure
    .input(CreateReceiptSchema)
    .mutation(async ({ input, ctx }) => {
      const createReceiptUseCase = container.get<CreateReceiptUseCaseContract>(
        CreateReceiptUseCaseContractType,
      )
      const createdReceipt = await createReceiptUseCase.create({
        ...input,
        userId: ctx.session.user.id,
      })
      return createdReceipt
    }),
  update: protectedProcedure
    .input(UpdateReceiptSchema)
    .mutation(async ({ input, ctx }) => {
      const updateReceiptUseCase = container.get<UpdateReceiptUseCaseContract>(
        UpdateReceiptUseCaseContractType,
      )
      const updatedReceipt = await updateReceiptUseCase.update({
        ...input,
        userId: ctx.session.user.id,
      })
      return updatedReceipt
    }),
  delete: protectedProcedure
    .input(DeleteItemSchema)
    .mutation(async ({ input }) => {
      const deleteReceiptUseCase = container.get<DeleteReceiptUseCaseContract>(
        DeleteReceiptUseCaseContractType,
      )
      await deleteReceiptUseCase.delete(input)
    }),
})
