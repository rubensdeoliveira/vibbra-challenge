import { injectable, inject } from 'inversify'

import {
  type UpdateCategoryUseCaseContract,
  type CategoriesRepositoryContract,
  CategoriesRepositoryContractType,
} from '@/server/domain/contracts'
import { TRPCError } from '@trpc/server'

@injectable()
export class UpdateCategoryUseCase implements UpdateCategoryUseCaseContract {
  constructor(
    @inject(CategoriesRepositoryContractType)
    private readonly categoriesRepository: CategoriesRepositoryContract,
  ) {}

  public async update(
    data: UpdateCategoryUseCaseContract.Input,
  ): Promise<UpdateCategoryUseCaseContract.Output> {
    const category = await this.categoriesRepository.getById({ id: data.id })
    if (!category) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Categoria nāo encontrada!',
      })
    }
    const updatedCategory = await this.categoriesRepository.upsert(data)
    return updatedCategory
  }
}
