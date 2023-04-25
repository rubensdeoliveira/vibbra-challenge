import { injectable, inject } from 'inversify'

import {
  type ListReceiptsUseCaseContract,
  type ReceiptsRepositoryContract,
  ReceiptsRepositoryContractType,
} from '@/server/domain/contracts'

@injectable()
export class ListReceiptsUseCase implements ListReceiptsUseCaseContract {
  constructor(
    @inject(ReceiptsRepositoryContractType)
    private readonly receiptsRepository: ReceiptsRepositoryContract,
  ) {}

  public async list({
    page,
    rowsPerPage = 10,
    search = '',
  }: ListReceiptsUseCaseContract.Input): Promise<ListReceiptsUseCaseContract.Output> {
    const receipts = await this.receiptsRepository.list({
      page,
      rowsPerPage,
      search,
    })
    const receiptsCount = await this.receiptsRepository.count({ search })
    return {
      data: receipts,
      lastPage: Math.ceil(receiptsCount / rowsPerPage),
      page,
      recordsCount: receiptsCount,
      rowsPerPage,
    }
  }
}
