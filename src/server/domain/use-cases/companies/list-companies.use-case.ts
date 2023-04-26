import { injectable, inject } from 'inversify'

import {
  type ListCompaniesUseCaseContract,
  type CompaniesRepositoryContract,
  CompaniesRepositoryContractType,
} from '@/server/domain/contracts'

@injectable()
export class ListCompaniesUseCase implements ListCompaniesUseCaseContract {
  constructor(
    @inject(CompaniesRepositoryContractType)
    private readonly companiesRepository: CompaniesRepositoryContract,
  ) {}

  public async list({
    page,
    rowsPerPage = 10,
    search = '',
    userId,
  }: ListCompaniesUseCaseContract.Input): Promise<ListCompaniesUseCaseContract.Output> {
    const companies = await this.companiesRepository.list({
      page,
      rowsPerPage,
      search,
      userId,
    })
    const companiesCount = await this.companiesRepository.count({
      search,
      userId,
    })
    return {
      data: companies,
      lastPage: Math.ceil(companiesCount / rowsPerPage),
      page,
      recordsCount: companiesCount,
      rowsPerPage,
    }
  }
}
