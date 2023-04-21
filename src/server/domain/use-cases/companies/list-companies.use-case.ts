import { inject, injectable } from 'tsyringe'

import {
  type ListCompaniesUseCaseContract,
  CompaniesRepositoryContract,
} from '@/server/domain/contracts'

@injectable()
export class ListCompaniesUseCase implements ListCompaniesUseCaseContract {
  constructor(
    @inject(CompaniesRepositoryContract)
    private readonly companiesRepository: CompaniesRepositoryContract,
  ) {}

  public async list(
    data: ListCompaniesUseCaseContract.Input,
  ): Promise<ListCompaniesUseCaseContract.Output> {
    const companies = await this.companiesRepository.list(data)
    console.log(companies)
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
