import { type CreateCostDTO } from '@/shared/schemas'
import {
  DeleteItemDTO,
  GetByIdDTO,
  type ListCountDTO,
  type ListPaginatedDTO,
} from '@/shared/schemas/common'
import { Category, Company, type Cost } from '@prisma/client'
import { WithRequired } from '@tanstack/react-query'

export interface CostsRepositoryContract {
  getById: (
    data: GetCostByIdRepositoryContract.Input,
  ) => Promise<GetCostByIdRepositoryContract.Output>
  upsert: (
    data: UpsertCostRepositoryContract.Input,
  ) => Promise<UpsertCostRepositoryContract.Output>
  list: (
    data: ListCostsRepositoryContract.Input,
  ) => Promise<ListCostsRepositoryContract.Output>
  count: (
    data: CountCostsRepositoryContract.Input,
  ) => Promise<CountCostsRepositoryContract.Output>
  delete: (data: DeleteCostRepositoryContract.Input) => Promise<void>
}

export namespace GetCostByIdRepositoryContract {
  export type Input = GetByIdDTO
  export type Output =
    | (Cost & {
        category: Category
        company: Company | null
      })
    | null
}

export namespace UpsertCostRepositoryContract {
  export type Input = CreateCostDTO & { userId: string; id?: string }
  export type Output = Cost
}

export namespace ListCostsRepositoryContract {
  export type Input = WithRequired<
    ListPaginatedDTO,
    'search' | 'rowsPerPage'
  > & { userId: string }
  export type Output = Cost[]
}

export namespace CountCostsRepositoryContract {
  export type Input = WithRequired<ListCountDTO, 'search'> & { userId: string }
  export type Output = number
}

export namespace DeleteCostRepositoryContract {
  export type Input = DeleteItemDTO
}

export const CostsRepositoryContractType = Symbol('CostsRepositoryContract')
