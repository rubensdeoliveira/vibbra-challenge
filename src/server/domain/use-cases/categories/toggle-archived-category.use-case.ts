import { injectable, inject } from 'inversify'

import {
  type ToggleArchivedCategoryUseCaseContract,
  type CategoriesRepositoryContract,
  CategoriesRepositoryContractType,
} from '@/server/domain/contracts'
import { TRPCError } from '@trpc/server'

@injectable()
export class ToggleArchivedCategoryUseCase
  implements ToggleArchivedCategoryUseCaseContract
{
  constructor(
    @inject(CategoriesRepositoryContractType)
    private readonly categoriesRepository: CategoriesRepositoryContract,
  ) {}

  public async toggleArchived({
    id,
  }: ToggleArchivedCategoryUseCaseContract.Input): Promise<ToggleArchivedCategoryUseCaseContract.Output> {
    const category = await this.categoriesRepository.getById({ id })
    if (!category) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Categoria nāo encontrada!',
      })
    }
    const updatedCategory = await this.categoriesRepository.upsert({
      ...category,
      archived: !category.archived,
    })
    return updatedCategory
  }
}
