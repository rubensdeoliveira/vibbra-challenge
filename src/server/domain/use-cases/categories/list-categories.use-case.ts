import { injectable, inject } from 'inversify'

import {
  type ListCategoriesUseCaseContract,
  type CategoriesRepositoryContract,
  CategoriesRepositoryContractType,
} from '@/server/domain/contracts'

@injectable()
export class ListCategoriesUseCase implements ListCategoriesUseCaseContract {
  constructor(
    @inject(CategoriesRepositoryContractType)
    private readonly categoriesRepository: CategoriesRepositoryContract,
  ) {}

  public async list({
    page,
    rowsPerPage = 10,
    search = '',
  }: ListCategoriesUseCaseContract.Input): Promise<ListCategoriesUseCaseContract.Output> {
    const categories = await this.categoriesRepository.list({
      page,
      rowsPerPage,
      search,
    })
    const categoriesCount = await this.categoriesRepository.count({ search })
    return {
      data: categories,
      lastPage: Math.ceil(categoriesCount / rowsPerPage),
      page,
      recordsCount: categoriesCount,
      rowsPerPage,
    }
  }
}
