import { injectable, inject } from 'inversify'

import {
  type CreateConfigUseCaseContract,
  type ConfigsRepositoryContract,
  ConfigsRepositoryContractType,
} from '@/server/domain/contracts'

@injectable()
export class CreateConfigUseCase implements CreateConfigUseCaseContract {
  constructor(
    @inject(ConfigsRepositoryContractType)
    private readonly configsRepository: ConfigsRepositoryContract,
  ) {}

  public async create(
    data: CreateConfigUseCaseContract.Input,
  ): Promise<CreateConfigUseCaseContract.Output> {
    const createdConfig = await this.configsRepository.create(data)
    return createdConfig
  }
}
