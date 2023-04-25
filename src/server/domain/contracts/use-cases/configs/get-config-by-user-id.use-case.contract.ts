import { type Config } from '@prisma/client'
import { GetConfigByUserIdDTO } from '@/shared/schemas'

export interface GetConfigByUserIdUseCaseContract {
  getByUserId: (
    input: GetConfigByUserIdUseCaseContract.Input,
  ) => Promise<GetConfigByUserIdUseCaseContract.Output>
}

export namespace GetConfigByUserIdUseCaseContract {
  export type Input = GetConfigByUserIdDTO
  export type Output = Config
}

export const GetConfigByUserIdUseCaseContractType = Symbol(
  'GetConfigByUserIdUseCaseContract',
)
