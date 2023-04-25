import { type Receipt } from '@prisma/client'
import { type CreateReceiptDTO } from '@/shared/schemas'

export interface CreateReceiptUseCaseContract {
  create: (
    input: CreateReceiptUseCaseContract.Input,
  ) => Promise<CreateReceiptUseCaseContract.Output>
}

export namespace CreateReceiptUseCaseContract {
  export type Input = CreateReceiptDTO & {
    userId: string
  }
  export type Output = Receipt
}

export const CreateReceiptUseCaseContractType = Symbol(
  'CreateReceiptUseCaseContract',
)
