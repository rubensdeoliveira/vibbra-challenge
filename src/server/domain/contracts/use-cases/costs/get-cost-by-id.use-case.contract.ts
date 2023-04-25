import { type Cost } from '@prisma/client'
import { GetByIdDTO } from '@/shared/schemas/common'

export interface GetCostByIdUseCaseContract {
  getById: (
    input: GetCostByIdUseCaseContract.Input,
  ) => Promise<GetCostByIdUseCaseContract.Output>
}

export namespace GetCostByIdUseCaseContract {
  export type Input = GetByIdDTO
  export type Output = Omit<Cost, 'value'> & { value: number }
}

export const GetCostByIdUseCaseContractType = Symbol(
  'GetCostByIdUseCaseContract',
)
