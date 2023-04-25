import { type Receipt } from '@prisma/client'
import { type UpdateReceiptDTO } from '@/shared/schemas'

export interface UpdateReceiptUseCaseContract {
  update: (
    input: UpdateReceiptUseCaseContract.Input,
  ) => Promise<UpdateReceiptUseCaseContract.Output>
}

export namespace UpdateReceiptUseCaseContract {
  export type Input = UpdateReceiptDTO & {
    userId: string
  }
  export type Output = Receipt
}

export const UpdateReceiptUseCaseContractType = Symbol(
  'UpdateReceiptUseCaseContract',
)
