import { type Cost } from '@prisma/client'
import { type CreateCostDTO } from '@/shared/schemas'

export interface CreateCostUseCaseContract {
  create: (
    input: CreateCostUseCaseContract.Input,
  ) => Promise<CreateCostUseCaseContract.Output>
}

export namespace CreateCostUseCaseContract {
  export type Input = CreateCostDTO & {
    userId: string
  }
  export type Output = Cost
}

export const CreateCostUseCaseContractType = Symbol('CreateCostUseCaseContract')
