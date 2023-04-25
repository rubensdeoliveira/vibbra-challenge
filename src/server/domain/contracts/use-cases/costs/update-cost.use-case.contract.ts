import { type Cost } from '@prisma/client'
import { type UpdateCostDTO } from '@/shared/schemas'

export interface UpdateCostUseCaseContract {
  update: (
    input: UpdateCostUseCaseContract.Input,
  ) => Promise<UpdateCostUseCaseContract.Output>
}

export namespace UpdateCostUseCaseContract {
  export type Input = UpdateCostDTO & {
    userId: string
  }
  export type Output = Cost
}

export const UpdateCostUseCaseContractType = Symbol('UpdateCostUseCaseContract')
