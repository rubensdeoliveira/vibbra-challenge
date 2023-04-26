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
    userId,
  }: ListReceiptsUseCaseContract.Input): Promise<ListReceiptsUseCaseContract.Output> {
    const receipts = await this.receiptsRepository.list({
      page,
      rowsPerPage,
      search,
      userId,
    })
    const receiptsCount = await this.receiptsRepository.count({
      search,
      userId,
    })
    return {
      data: receipts,
      lastPage: Math.ceil(receiptsCount / rowsPerPage),
      page,
      recordsCount: receiptsCount,
      rowsPerPage,
    }
  }
}
