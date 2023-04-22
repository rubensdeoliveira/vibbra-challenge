import { type CreateCompanyDTO } from '@/shared/schemas'
import {
  type ListCountDTO,
  type ListPaginatedDTO,
} from '@/shared/schemas/common'
import { type Company } from '@prisma/client'
import { WithRequired } from '@tanstack/react-query'

export interface CompaniesRepositoryContract {
  create: (
    data: CreateCompanyRepositoryContract.Input,
  ) => Promise<CreateCompanyRepositoryContract.Output>
  list: (
    data: ListCompaniesRepositoryContract.Input,
  ) => Promise<ListCompaniesRepositoryContract.Output>
  count: (
    data: CountCompaniesRepositoryContract.Input,
  ) => Promise<CountCompaniesRepositoryContract.Output>
}

export namespace CreateCompanyRepositoryContract {
  export type Input = CreateCompanyDTO & { userId: string }
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

export const CompaniesRepositoryContractType = Symbol(
  'CompaniesRepositoryContract',
)
