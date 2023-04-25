import { injectable, inject } from 'inversify'

import {
  type DeleteReceiptUseCaseContract,
  type ReceiptsRepositoryContract,
  ReceiptsRepositoryContractType,
} from '@/server/domain/contracts'
import { TRPCError } from '@trpc/server'

@injectable()
export class DeleteReceiptUseCase implements DeleteReceiptUseCaseContract {
  constructor(
    @inject(ReceiptsRepositoryContractType)
    private readonly receiptsRepository: ReceiptsRepositoryContract,
  ) {}

  public async delete(data: DeleteReceiptUseCaseContract.Input): Promise<void> {
    const receipt = await this.receiptsRepository.getById({ id: data.id })
    if (!receipt) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Nota fiscal nāo encontrada!',
      })
    }
    await this.receiptsRepository.delete(data)
  }
}
