import { type Cost } from '@prisma/client'
import { type ListPaginatedDTO } from '@/shared/schemas/common'
import { type ListEntitiesModel } from '@/server/domain/models/common'

export interface ListCostsUseCaseContract {
  list: (
    input: ListCostsUseCaseContract.Input,
  ) => Promise<ListCostsUseCaseContract.Output>
}

export namespace ListCostsUseCaseContract {
  export type Input = ListPaginatedDTO & { userId: string }
  export type Output = ListEntitiesModel<Cost>
}

export const ListCostsUseCaseContractType = Symbol('ListCostsUseCaseContract')
