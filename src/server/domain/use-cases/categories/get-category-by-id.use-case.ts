import { injectable, inject } from 'inversify'

import {
  type GetCategoryByIdUseCaseContract,
  type CategoriesRepositoryContract,
  CategoriesRepositoryContractType,
} from '@/server/domain/contracts'
import { TRPCError } from '@trpc/server'

@injectable()
export class GetCategoryByIdUseCase implements GetCategoryByIdUseCaseContract {
  constructor(
    @inject(CategoriesRepositoryContractType)
    private readonly categoriesRepository: CategoriesRepositoryContract,
  ) {}

  public async getById({
    id,
  }: GetCategoryByIdUseCaseContract.Input): Promise<GetCategoryByIdUseCaseContract.Output> {
    const category = await this.categoriesRepository.getById({
      id,
    })
    if (!category) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Categoria nāo encontrada!',
      })
    }
    return category
  }
}
