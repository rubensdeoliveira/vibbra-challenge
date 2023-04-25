import { injectable, inject } from 'inversify'

import {
  type CreateCostUseCaseContract,
  type CostsRepositoryContract,
  CostsRepositoryContractType,
} from '@/server/domain/contracts'

@injectable()
export class CreateCostUseCase implements CreateCostUseCaseContract {
  constructor(
    @inject(CostsRepositoryContractType)
    private readonly costsRepository: CostsRepositoryContract,
  ) {}

  public async create(
    data: CreateCostUseCaseContract.Input,
  ): Promise<CreateCostUseCaseContract.Output> {
    const createdCost = await this.costsRepository.upsert(data)
    return createdCost
  }
}
