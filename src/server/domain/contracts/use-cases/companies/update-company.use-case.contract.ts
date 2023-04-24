import { type Company } from '@prisma/client'
import { type UpdateCompanyDTO } from '@/shared/schemas'

export interface UpdateCompanyUseCaseContract {
  update: (
    input: UpdateCompanyUseCaseContract.Input,
  ) => Promise<UpdateCompanyUseCaseContract.Output>
}

export namespace UpdateCompanyUseCaseContract {
  export type Input = UpdateCompanyDTO & {
    userId: string
  }
  export type Output = Company
}

export const UpdateCompanyUseCaseContractType = Symbol(
  'UpdateCompanyUseCaseContract',
)
