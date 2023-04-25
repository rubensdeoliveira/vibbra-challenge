import { injectable, inject } from 'inversify'

import {
  type UpdateReceiptUseCaseContract,
  type ReceiptsRepositoryContract,
  ReceiptsRepositoryContractType,
} from '@/server/domain/contracts'
import { TRPCError } from '@trpc/server'

@injectable()
export class UpdateReceiptUseCase implements UpdateReceiptUseCaseContract {
  constructor(
    @inject(ReceiptsRepositoryContractType)
    private readonly receiptsRepository: ReceiptsRepositoryContract,
  ) {}

  public async update(
    data: UpdateReceiptUseCaseContract.Input,
  ): Promise<UpdateReceiptUseCaseContract.Output> {
    const receipt = await this.receiptsRepository.getById({ id: data.id })
    if (!receipt) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Empresa nāo encontrada!',
      })
    }
    const updatedReceipt = await this.receiptsRepository.upsert(data)
    return updatedReceipt
  }
}
