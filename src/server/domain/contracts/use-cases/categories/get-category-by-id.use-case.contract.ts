import { type Category } from '@prisma/client'
import { GetByIdDTO } from '@/shared/schemas/common'

export interface GetCategoryByIdUseCaseContract {
  getById: (
    input: GetCategoryByIdUseCaseContract.Input,
  ) => Promise<GetCategoryByIdUseCaseContract.Output>
}

export namespace GetCategoryByIdUseCaseContract {
  export type Input = GetByIdDTO
  export type Output = Category
}

export const GetCategoryByIdUseCaseContractType = Symbol(
  'GetCategoryByIdUseCaseContract',
)
