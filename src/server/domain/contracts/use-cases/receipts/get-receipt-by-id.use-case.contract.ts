import { Company, type Receipt } from '@prisma/client'
import { GetByIdDTO } from '@/shared/schemas/common'

export interface GetReceiptByIdUseCaseContract {
  getById: (
    input: GetReceiptByIdUseCaseContract.Input,
  ) => Promise<GetReceiptByIdUseCaseContract.Output>
}

export namespace GetReceiptByIdUseCaseContract {
  export type Input = GetByIdDTO
  export type Output = Omit<Receipt, 'value'> & { value: number } & {
    company: Company
  }
}

export const GetReceiptByIdUseCaseContractType = Symbol(
  'GetReceiptByIdUseCaseContract',
)
