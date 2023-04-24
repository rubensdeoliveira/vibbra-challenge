import { injectable, inject } from 'inversify'

import {
  type GetCompanyByIdUseCaseContract,
  type CompaniesRepositoryContract,
  CompaniesRepositoryContractType,
} from '@/server/domain/contracts'
import { TRPCError } from '@trpc/server'

@injectable()
export class GetCompanyByIdUseCase implements GetCompanyByIdUseCaseContract {
  constructor(
    @inject(CompaniesRepositoryContractType)
    private readonly companiesRepository: CompaniesRepositoryContract,
  ) {}

  public async getById({
    id,
  }: GetCompanyByIdUseCaseContract.Input): Promise<GetCompanyByIdUseCaseContract.Output> {
    const company = await this.companiesRepository.getById({
      id,
    })
    if (!company) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Empresa nāo encontrada!',
      })
    }
    return company
  }
}
