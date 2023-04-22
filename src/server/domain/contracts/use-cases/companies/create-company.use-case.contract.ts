import { type Company } from '@prisma/client'
import { type CreateCompanyDTO } from '@/shared/schemas'

export interface CreateCompanyUseCaseContract {
  create: (
    input: CreateCompanyUseCaseContract.Input,
  ) => Promise<CreateCompanyUseCaseContract.Output>
}

export namespace CreateCompanyUseCaseContract {
  export type Input = CreateCompanyDTO & {
    userId: string
  }
  export type Output = Company
}

export const CreateCompanyUseCaseContractTypes = {
  CreateCompanyUseCase: Symbol.for('CreateCompanyUseCaseContract'),
  CompaniesRepository: Symbol.for('CompaniesRepositoryContract'),
}
