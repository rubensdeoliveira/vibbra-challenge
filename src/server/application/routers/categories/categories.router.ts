import {
  CreateCategorySchema,
  DeleteItemSchema,
  GetByIdSchema,
  ListPaginatedSchema,
  ToggleItemSchema,
  UpdateCategorySchema,
} from '@/shared/schemas'
import { createTRPCRouter, protectedProcedure } from '@/server/infra/trpc'
import {
  CreateCategoryUseCaseContract,
  CreateCategoryUseCaseContractType,
  DeleteCategoryUseCaseContract,
  DeleteCategoryUseCaseContractType,
  GetCategoryByIdUseCaseContract,
  GetCategoryByIdUseCaseContractType,
  ListCategoriesUseCaseContract,
  ListCategoriesUseCaseContractType,
  ToggleArchivedCategoryUseCaseContract,
  ToggleArchivedCategoryUseCaseContractType,
  UpdateCategoryUseCaseContract,
  UpdateCategoryUseCaseContractType,
} from '@/server/domain/contracts'
import { container } from '@/server/infra/container'

export const categoriesRouter = createTRPCRouter({
  getById: protectedProcedure.input(GetByIdSchema).query(async ({ input }) => {
    const getCategoryByIdUseCase =
      container.get<GetCategoryByIdUseCaseContract>(
        GetCategoryByIdUseCaseContractType,
      )
    const category = await getCategoryByIdUseCase.getById(input)
    return category
  }),
  list: protectedProcedure
    .input(ListPaginatedSchema)
    .query(async ({ input, ctx }) => {
      const listCategoriesUseCase =
        container.get<ListCategoriesUseCaseContract>(
          ListCategoriesUseCaseContractType,
        )
      const categories = await listCategoriesUseCase.list({
        ...input,
        userId: ctx.session.user.id,
      })
      return categories
    }),
  create: protectedProcedure
    .input(CreateCategorySchema)
    .mutation(async ({ input, ctx }) => {
      const createCategoryUseCase =
        container.get<CreateCategoryUseCaseContract>(
          CreateCategoryUseCaseContractType,
        )
      const createdCategory = await createCategoryUseCase.create({
        ...input,
        userId: ctx.session.user.id,
      })
      return createdCategory
    }),
  update: protectedProcedure
    .input(UpdateCategorySchema)
    .mutation(async ({ input, ctx }) => {
      const updateCategoryUseCase =
        container.get<UpdateCategoryUseCaseContract>(
          UpdateCategoryUseCaseContractType,
        )
      const updatedCategory = await updateCategoryUseCase.update({
        ...input,
        userId: ctx.session.user.id,
      })
      return updatedCategory
    }),
  delete: protectedProcedure
    .input(DeleteItemSchema)
    .mutation(async ({ input }) => {
      const deleteCategoryUseCase =
        container.get<DeleteCategoryUseCaseContract>(
          DeleteCategoryUseCaseContractType,
        )
      await deleteCategoryUseCase.delete(input)
    }),
  toggleArchived: protectedProcedure
    .input(ToggleItemSchema)
    .mutation(async ({ input }) => {
      const toggleArchivedCategoryUseCase =
        container.get<ToggleArchivedCategoryUseCaseContract>(
          ToggleArchivedCategoryUseCaseContractType,
        )
      const deletedCategory =
        await toggleArchivedCategoryUseCase.toggleArchived(input)
      return deletedCategory
    }),
})
