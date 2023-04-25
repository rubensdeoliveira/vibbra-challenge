import { injectable, inject } from 'inversify'

import {
  type UpdateConfigUseCaseContract,
  type ConfigsRepositoryContract,
  ConfigsRepositoryContractType,
} from '@/server/domain/contracts'
import { TRPCError } from '@trpc/server'

@injectable()
export class UpdateConfigUseCase implements UpdateConfigUseCaseContract {
  constructor(
    @inject(ConfigsRepositoryContractType)
    private readonly configsRepository: ConfigsRepositoryContract,
  ) {}

  public async update(
    data: UpdateConfigUseCaseContract.Input,
  ): Promise<UpdateConfigUseCaseContract.Output> {
    const config = await this.configsRepository.getByUserId({
      userId: data.userId,
    })
    if (!config) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Configuraçāo nāo encontrada!',
      })
    }
    const updatedConfig = await this.configsRepository.update(data)
    return updatedConfig
  }
}
