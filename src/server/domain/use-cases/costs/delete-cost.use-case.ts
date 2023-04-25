import { injectable, inject } from 'inversify'

import {
  type DeleteCostUseCaseContract,
  type CostsRepositoryContract,
  CostsRepositoryContractType,
} from '@/server/domain/contracts'
import { TRPCError } from '@trpc/server'

@injectable()
export class DeleteCostUseCase implements DeleteCostUseCaseContract {
  constructor(
    @inject(CostsRepositoryContractType)
    private readonly costsRepository: CostsRepositoryContract,
  ) {}

  public async delete(data: DeleteCostUseCaseContract.Input): Promise<void> {
    const cost = await this.costsRepository.getById({ id: data.id })
    if (!cost) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Despesa nāo encontrada!',
      })
    }
    await this.costsRepository.delete(data)
  }
}
