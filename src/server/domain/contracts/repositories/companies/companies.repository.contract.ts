import { type CreateCompanyDTO } from '@/shared/schemas'
import {
  type ListCountDTO,
  type ListPaginatedDTO,
} from '@/shared/schemas/common'
import { type Company } from '@prisma/client'

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
  export type Input = ListPaginatedDTO
  export type Output = Company[]
}

export namespace CountCompaniesRepositoryContract {
  export type Input = ListCountDTO
  export type Output = number
}
