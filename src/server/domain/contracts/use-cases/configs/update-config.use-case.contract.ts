import { type Config } from '@prisma/client'
import { type UpdateConfigDTO } from '@/shared/schemas'

export interface UpdateConfigUseCaseContract {
  update: (
    input: UpdateConfigUseCaseContract.Input,
  ) => Promise<UpdateConfigUseCaseContract.Output>
}

export namespace UpdateConfigUseCaseContract {
  export type Input = UpdateConfigDTO & {
    userId: string
  }
  export type Output = Config
}

export const UpdateConfigUseCaseContractType = Symbol(
  'UpdateConfigUseCaseContract',
)
