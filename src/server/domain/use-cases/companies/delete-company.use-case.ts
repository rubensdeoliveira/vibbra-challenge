import { injectable, inject } from 'inversify'

import {
  type DeleteCompanyUseCaseContract,
  type CompaniesRepositoryContract,
  CompaniesRepositoryContractType,
} from '@/server/domain/contracts'
import { TRPCError } from '@trpc/server'

@injectable()
export class DeleteCompanyUseCase implements DeleteCompanyUseCaseContract {
  constructor(
    @inject(CompaniesRepositoryContractType)
    private readonly companiesRepository: CompaniesRepositoryContract,
  ) {}

  public async delete(data: DeleteCompanyUseCaseContract.Input): Promise<void> {
    const company = await this.companiesRepository.getById({ id: data.id })
    if (!company) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Empresa nāo encontrada!',
      })
    }
    await this.companiesRepository.delete(data)
  }
}
