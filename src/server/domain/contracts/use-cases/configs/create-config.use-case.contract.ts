import { type Config } from '@prisma/client'
import { CreateConfigDTO } from '@/shared/schemas'

export interface CreateConfigUseCaseContract {
  create: (
    input: CreateConfigUseCaseContract.Input,
  ) => Promise<CreateConfigUseCaseContract.Output>
}

export namespace CreateConfigUseCaseContract {
  export type Input = CreateConfigDTO & { userId: string; id?: string }
  export type Output = Config
}

export const CreateConfigUseCaseContractType = Symbol(
  'CreateConfigUseCaseContract',
)
