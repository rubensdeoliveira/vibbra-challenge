import { type CreateCompanyDTO } from '@/shared/schemas'
import {
  DeleteItemDTO,
  GetByIdDTO,
  type ListCountDTO,
  type ListPaginatedDTO,
} from '@/shared/schemas/common'
import { type Company } from '@prisma/client'
import { WithRequired } from '@tanstack/react-query'

export interface CompaniesRepositoryContract {
  getById: (
    data: GetCompanyByIdRepositoryContract.Input,
  ) => Promise<GetCompanyByIdRepositoryContract.Output>
  upsert: (
    data: UpsertCompanyRepositoryContract.Input,
  ) => Promise<UpsertCompanyRepositoryContract.Output>
  list: (
    data: ListCompaniesRepositoryContract.Input,
  ) => Promise<ListCompaniesRepositoryContract.Output>
  count: (
    data: CountCompaniesRepositoryContract.Input,
  ) => Promise<CountCompaniesRepositoryContract.Output>
  delete: (data: DeleteCompanyRepositoryContract.Input) => Promise<void>
}

export namespace GetCompanyByIdRepositoryContract {
  export type Input = GetByIdDTO
  export type Output = Company | null
}

export namespace UpsertCompanyRepositoryContract {
  export type Input = CreateCompanyDTO & { userId: string; id?: string }
  export type Output = Company
}

export namespace ListCompaniesRepositoryContract {
  export type Input = WithRequired<ListPaginatedDTO, 'search' | 'rowsPerPage'>
  export type Output = Company[]
}

export namespace CountCompaniesRepositoryContract {
  export type Input = WithRequired<ListCountDTO, 'search'>
  export type Output = number
}

export namespace DeleteCompanyRepositoryContract {
  export type Input = DeleteItemDTO
}

export const CompaniesRepositoryContractType = Symbol(
  'CompaniesRepositoryContract',
)
