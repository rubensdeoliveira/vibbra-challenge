import { inject, injectable } from 'tsyringe'

import {
  type CreateCompanyUseCaseContract,
  CompaniesRepositoryContract,
} from '@/server/domain/contracts'

@injectable()
export class CreateCompanyUseCase implements CreateCompanyUseCaseContract {
  constructor(
    @inject(CompaniesRepositoryContract)
    private readonly companiesRepository: CompaniesRepositoryContract,
  ) {}

  public async create(
    data: CreateCompanyUseCaseContract.Input,
  ): Promise<CreateCompanyUseCaseContract.Output> {
    const createdCompany = await this.companiesRepository.create(data)
    return createdCompany
  }
}
