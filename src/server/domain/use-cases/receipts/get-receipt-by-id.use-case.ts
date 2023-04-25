import { injectable, inject } from 'inversify'

import {
  type GetReceiptByIdUseCaseContract,
  type ReceiptsRepositoryContract,
  ReceiptsRepositoryContractType,
} from '@/server/domain/contracts'
import { TRPCError } from '@trpc/server'

@injectable()
export class GetReceiptByIdUseCase implements GetReceiptByIdUseCaseContract {
  constructor(
    @inject(ReceiptsRepositoryContractType)
    private readonly receiptsRepository: ReceiptsRepositoryContract,
  ) {}

  public async getById({
    id,
  }: GetReceiptByIdUseCaseContract.Input): Promise<GetReceiptByIdUseCaseContract.Output> {
    const receipt = await this.receiptsRepository.getById({
      id,
    })
    if (!receipt) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Nota fiscal nāo encontrada!',
      })
    }
    return { ...receipt, value: receipt.value.toNumber() }
  }
}
