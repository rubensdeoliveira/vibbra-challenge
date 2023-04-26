import { type Category } from '@prisma/client'
import { type ListPaginatedDTO } from '@/shared/schemas/common'
import { type ListEntitiesModel } from '@/server/domain/models/common'

export interface ListCategoriesUseCaseContract {
  list: (
    input: ListCategoriesUseCaseContract.Input,
  ) => Promise<ListCategoriesUseCaseContract.Output>
}

export namespace ListCategoriesUseCaseContract {
  export type Input = ListPaginatedDTO & { userId: string }
  export type Output = ListEntitiesModel<Category>
}

export const ListCategoriesUseCaseContractType = Symbol(
  'ListCategoriesUseCaseContract',
)
