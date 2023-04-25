import { type Receipt } from '@prisma/client'
import { type ListPaginatedDTO } from '@/shared/schemas/common'
import { type ListEntitiesModel } from '@/server/domain/models/common'

export interface ListReceiptsUseCaseContract {
  list: (
    input: ListReceiptsUseCaseContract.Input,
  ) => Promise<ListReceiptsUseCaseContract.Output>
}

export namespace ListReceiptsUseCaseContract {
  export type Input = ListPaginatedDTO
  export type Output = ListEntitiesModel<Receipt>
}

export const ListReceiptsUseCaseContractType = Symbol(
  'ListReceiptsUseCaseContract',
)