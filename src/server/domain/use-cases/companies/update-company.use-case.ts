import { injectable, inject } from 'inversify'

import {
  type UpdateCompanyUseCaseContract,
  type CompaniesRepositoryContract,
  CompaniesRepositoryContractType,
} from '@/server/domain/contracts'
import { TRPCError } from '@trpc/server'

@injectable()
export class UpdateCompanyUseCase implements UpdateCompanyUseCaseContract {
  constructor(
    @inject(CompaniesRepositoryContractType)
    private readonly companiesRepository: CompaniesRepositoryContract,
  ) {}

  public async update(
    data: UpdateCompanyUseCaseContract.Input,
  ): Promise<UpdateCompanyUseCaseContract.Output> {
    const company = await this.companiesRepository.getById({ id: data.id })
    if (!company) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Empresa nāo encontrada!',
      })
    }
    const updatedCompany = await this.companiesRepository.upsert(data)
    return updatedCompany
  }
}
