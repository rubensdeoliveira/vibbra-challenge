import { type Company } from '@prisma/client'
import { GetByIdDTO } from '@/shared/schemas/common'

export interface GetCompanyByIdUseCaseContract {
  getById: (
    input: GetCompanyByIdUseCaseContract.Input,
  ) => Promise<GetCompanyByIdUseCaseContract.Output>
}

export namespace GetCompanyByIdUseCaseContract {
  export type Input = GetByIdDTO
  export type Output = Company
}

export const GetCompanyByIdUseCaseContractType = Symbol(
  'GetCompanyByIdUseCaseContract',
)
