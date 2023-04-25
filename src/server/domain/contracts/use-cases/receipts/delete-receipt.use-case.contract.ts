import { type DeleteItemDTO } from '@/shared/schemas'

export interface DeleteReceiptUseCaseContract {
  delete: (input: DeleteReceiptUseCaseContract.Input) => Promise<void>
}

export namespace DeleteReceiptUseCaseContract {
  export type Input = DeleteItemDTO
}

export const DeleteReceiptUseCaseContractType = Symbol(
  'DeleteReceiptUseCaseContract',
)
