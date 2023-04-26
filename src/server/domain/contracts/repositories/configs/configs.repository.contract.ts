import { CreateConfigDTO, type UpdateConfigDTO } from '@/shared/schemas'
import { GetConfigByUserIdDTO } from '@/shared/schemas'
import { type Config } from '@prisma/client'

export interface ConfigsRepositoryContract {
  getByUserId: (
    data: GetConfigByUserIdRepositoryContract.Input,
  ) => Promise<GetConfigByUserIdRepositoryContract.Output>
  update: (
    data: UpdateConfigRepositoryContract.Input,
  ) => Promise<UpdateConfigRepositoryContract.Output>
  create: (
    data: CreateConfigRepositoryContract.Input,
  ) => Promise<CreateConfigRepositoryContract.Output>
}

export namespace GetConfigByUserIdRepositoryContract {
  export type Input = GetConfigByUserIdDTO
  export type Output = Config | null
}

export namespace UpdateConfigRepositoryContract {
  export type Input = UpdateConfigDTO & { userId: string; id?: string }
  export type Output = Config
}

export namespace CreateConfigRepositoryContract {
  export type Input = CreateConfigDTO & { userId: string; id?: string }
  export type Output = Config
}

export const ConfigsRepositoryContractType = Symbol('ConfigsRepositoryContract')
