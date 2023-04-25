import { injectable, inject } from 'inversify'

import {
  type CreateReceiptUseCaseContract,
  type ReceiptsRepositoryContract,
  ReceiptsRepositoryContractType,
} from '@/server/domain/contracts'

@injectable()
export class CreateReceiptUseCase implements CreateReceiptUseCaseContract {
  constructor(
    @inject(ReceiptsRepositoryContractType)
    private readonly receiptsRepository: ReceiptsRepositoryContract,
  ) {}

  public async create(
    data: CreateReceiptUseCaseContract.Input,
  ): Promise<CreateReceiptUseCaseContract.Output> {
    const createdReceipt = await this.receiptsRepository.upsert(data)
    return createdReceipt
  }
}
