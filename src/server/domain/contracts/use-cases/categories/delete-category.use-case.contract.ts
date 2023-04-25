import { type DeleteItemDTO } from '@/shared/schemas'

export interface DeleteCategoryUseCaseContract {
  delete: (input: DeleteCategoryUseCaseContract.Input) => Promise<void>
}

export namespace DeleteCategoryUseCaseContract {
  export type Input = DeleteItemDTO
}

export const DeleteCategoryUseCaseContractType = Symbol(
  'DeleteCategoryUseCaseContract',
)
