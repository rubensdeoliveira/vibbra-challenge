import { injectable, inject } from 'inversify'

import {
  type ListCostsUseCaseContract,
  type CostsRepositoryContract,
  CostsRepositoryContractType,
} from '@/server/domain/contracts'

@injectable()
export class ListCostsUseCase implements ListCostsUseCaseContract {
  constructor(
    @inject(CostsRepositoryContractType)
    private readonly costsRepository: CostsRepositoryContract,
  ) {}

  public async list({
    page,
    rowsPerPage = 10,
    search = '',
    userId,
  }: ListCostsUseCaseContract.Input): Promise<ListCostsUseCaseContract.Output> {
    const costs = await this.costsRepository.list({
      page,
      rowsPerPage,
      search,
      userId,
    })
    const costsCount = await this.costsRepository.count({ search, userId })
    return {
      data: costs,
      lastPage: Math.ceil(costsCount / rowsPerPage),
      page,
      recordsCount: costsCount,
      rowsPerPage,
    }
  }
}
