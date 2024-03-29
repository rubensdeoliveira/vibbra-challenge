import { type Company } from '@prisma/client'
import { type ListPaginatedDTO } from '@/shared/schemas/common'
import { type ListEntitiesModel } from '@/server/domain/models/common'

export interface ListCompaniesUseCaseContract {
  list: (
    input: ListCompaniesUseCaseContract.Input,
  ) => Promise<ListCompaniesUseCaseContract.Output>
}

export namespace ListCompaniesUseCaseContract {
  export type Input = ListPaginatedDTO & { userId: string }
  export type Output = ListEntitiesModel<Company>
}

export const ListCompaniesUseCaseContractType = Symbol(
  'ListCompaniesUseCaseContract',
)
