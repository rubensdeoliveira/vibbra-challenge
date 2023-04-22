import { injectable, inject } from 'inversify'

import {
  type CreateCompanyUseCaseContract,
  type CompaniesRepositoryContract,
  CompaniesRepositoryContractType,
} from '@/server/domain/contracts'

@injectable()
export class CreateCompanyUseCase implements CreateCompanyUseCaseContract {
  constructor(
    @inject(CompaniesRepositoryContractType)
    private readonly companiesRepository: CompaniesRepositoryContract,
  ) {}

  public async create(
    data: CreateCompanyUseCaseContract.Input,
  ): Promise<CreateCompanyUseCaseContract.Output> {
    const createdCompany = await this.companiesRepository.create(data)
    return createdCompany
  }
}
