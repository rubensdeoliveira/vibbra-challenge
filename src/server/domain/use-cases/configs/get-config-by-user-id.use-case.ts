import { injectable, inject } from 'inversify'

import {
  type GetConfigByUserIdUseCaseContract,
  type ConfigsRepositoryContract,
  ConfigsRepositoryContractType,
} from '@/server/domain/contracts'
import { TRPCError } from '@trpc/server'

@injectable()
export class GetConfigByUserIdUseCase
  implements GetConfigByUserIdUseCaseContract
{
  constructor(
    @inject(ConfigsRepositoryContractType)
    private readonly configsRepository: ConfigsRepositoryContract,
  ) {}

  public async getByUserId({
    userId,
  }: GetConfigByUserIdUseCaseContract.Input): Promise<GetConfigByUserIdUseCaseContract.Output> {
    const config = await this.configsRepository.getByUserId({
      userId,
    })
    if (!config) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Configuraçāo nāo encontrada!',
      })
    }
    return {
      ...config,
      meiLimit: config.meiLimit.toNumber(),
    }
  }
}
