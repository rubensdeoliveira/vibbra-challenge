import { injectable, inject } from 'inversify'

import {
  type DeleteCategoryUseCaseContract,
  type CategoriesRepositoryContract,
  CategoriesRepositoryContractType,
} from '@/server/domain/contracts'
import { TRPCError } from '@trpc/server'

@injectable()
export class DeleteCategoryUseCase implements DeleteCategoryUseCaseContract {
  constructor(
    @inject(CategoriesRepositoryContractType)
    private readonly categoriesRepository: CategoriesRepositoryContract,
  ) {}

  public async delete(
    data: DeleteCategoryUseCaseContract.Input,
  ): Promise<void> {
    const category = await this.categoriesRepository.getById({ id: data.id })
    if (!category) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Categoria nāo encontrada!',
      })
    }
    await this.categoriesRepository.delete(data)
  }
}
