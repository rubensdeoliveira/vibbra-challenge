import { injectable, inject } from 'inversify'

import {
  type GetCostByIdUseCaseContract,
  type CostsRepositoryContract,
  CostsRepositoryContractType,
} from '@/server/domain/contracts'
import { TRPCError } from '@trpc/server'

@injectable()
export class GetCostByIdUseCase implements GetCostByIdUseCaseContract {
  constructor(
    @inject(CostsRepositoryContractType)
    private readonly costsRepository: CostsRepositoryContract,
  ) {}

  public async getById({
    id,
  }: GetCostByIdUseCaseContract.Input): Promise<GetCostByIdUseCaseContract.Output> {
    const cost = await this.costsRepository.getById({
      id,
    })
    if (!cost) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Despesa nāo encontrada!',
      })
    }
    return { ...cost, value: cost.value.toNumber() }
  }
}
