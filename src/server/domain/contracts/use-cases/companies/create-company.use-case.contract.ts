import { type Company } from '@prisma/client'
import { type CreateCompanyDTO } from '@/shared/schemas'

export interface CreateCompanyUseCaseContract {
  create: (
    input: CreateCompanyUseCaseContract.Input,
  ) => Promise<CreateCompanyUseCaseContract.Output>
}

export namespace CreateCompanyUseCaseContract {
  export type Input = CreateCompanyDTO
  export type Output = Company
}
