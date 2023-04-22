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

  public async list(
    data: ListCompaniesUseCaseContract.Input,
  ): Promise<ListCompaniesUseCaseContract.Output> {
    const companies = await this.companiesRepository.list(data)
    const companiesCount = await this.companiesRepository.count(data)
    const rowsPerPage = 50
    return {
      data: companies,
      last_page: Math.ceil(companiesCount / rowsPerPage),
      page: data.page,
      record_count: companiesCount,
    }
  }
}
