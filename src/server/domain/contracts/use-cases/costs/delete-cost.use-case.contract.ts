import { type DeleteItemDTO } from '@/shared/schemas'

export interface DeleteCostUseCaseContract {
  delete: (input: DeleteCostUseCaseContract.Input) => Promise<void>
}

export namespace DeleteCostUseCaseContract {
  export type Input = DeleteItemDTO
}

export const DeleteCostUseCaseContractType = Symbol('DeleteCostUseCaseContract')
