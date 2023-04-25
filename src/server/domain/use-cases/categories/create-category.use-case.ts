import { injectable, inject } from 'inversify'

import {
  type CreateCategoryUseCaseContract,
  type CategoriesRepositoryContract,
  CategoriesRepositoryContractType,
} from '@/server/domain/contracts'

@injectable()
export class CreateCategoryUseCase implements CreateCategoryUseCaseContract {
  constructor(
    @inject(CategoriesRepositoryContractType)
    private readonly categoriesRepository: CategoriesRepositoryContract,
  ) {}

  public async create(
    data: CreateCategoryUseCaseContract.Input,
  ): Promise<CreateCategoryUseCaseContract.Output> {
    const createdCategory = await this.categoriesRepository.upsert(data)
    return createdCategory
  }
}
