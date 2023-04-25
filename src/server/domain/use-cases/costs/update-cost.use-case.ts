import { injectable, inject } from 'inversify'

import {
  type UpdateCostUseCaseContract,
  type CostsRepositoryContract,
  CostsRepositoryContractType,
} from '@/server/domain/contracts'
import { TRPCError } from '@trpc/server'

@injectable()
export class UpdateCostUseCase implements UpdateCostUseCaseContract {
  constructor(
    @inject(CostsRepositoryContractType)
    private readonly costsRepository: CostsRepositoryContract,
  ) {}

  public async update(
    data: UpdateCostUseCaseContract.Input,
  ): Promise<UpdateCostUseCaseContract.Output> {
    const cost = await this.costsRepository.getById({ id: data.id })
    if (!cost) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Despesa nāo encontrada!',
      })
    }
    const updatedCost = await this.costsRepository.upsert(data)
    return updatedCost
  }
}
