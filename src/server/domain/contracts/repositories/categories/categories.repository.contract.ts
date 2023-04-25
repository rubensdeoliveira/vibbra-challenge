import { type CreateCategoryDTO } from '@/shared/schemas'
import {
  DeleteItemDTO,
  GetByIdDTO,
  type ListCountDTO,
  type ListPaginatedDTO,
} from '@/shared/schemas/common'
import { type Category } from '@prisma/client'
import { WithRequired } from '@tanstack/react-query'

export interface CategoriesRepositoryContract {
  getById: (
    data: GetCategoryByIdRepositoryContract.Input,
  ) => Promise<GetCategoryByIdRepositoryContract.Output>
  upsert: (
    data: UpsertCategoryRepositoryContract.Input,
  ) => Promise<UpsertCategoryRepositoryContract.Output>
  list: (
    data: ListCategoriesRepositoryContract.Input,
  ) => Promise<ListCategoriesRepositoryContract.Output>
  count: (
    data: CountCategoriesRepositoryContract.Input,
  ) => Promise<CountCategoriesRepositoryContract.Output>
  delete: (data: DeleteCategoryRepositoryContract.Input) => Promise<void>
}

export namespace GetCategoryByIdRepositoryContract {
  export type Input = GetByIdDTO
  export type Output = Category | null
}

export namespace UpsertCategoryRepositoryContract {
  export type Input = CreateCategoryDTO & {
    userId: string
    id?: string
    archived?: boolean
  }
  export type Output = Category
}

export namespace ListCategoriesRepositoryContract {
  export type Input = WithRequired<ListPaginatedDTO, 'search' | 'rowsPerPage'>
  export type Output = Category[]
}

export namespace CountCategoriesRepositoryContract {
  export type Input = WithRequired<ListCountDTO, 'search'>
  export type Output = number
}

export namespace DeleteCategoryRepositoryContract {
  export type Input = DeleteItemDTO
}

export const CategoriesRepositoryContractType = Symbol(
  'CategoriesRepositoryContract',
)
