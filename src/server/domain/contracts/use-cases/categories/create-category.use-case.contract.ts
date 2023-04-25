import { type Category } from '@prisma/client'
import { type CreateCategoryDTO } from '@/shared/schemas'

export interface CreateCategoryUseCaseContract {
  create: (
    input: CreateCategoryUseCaseContract.Input,
  ) => Promise<CreateCategoryUseCaseContract.Output>
}

export namespace CreateCategoryUseCaseContract {
  export type Input = CreateCategoryDTO & {
    userId: string
  }
  export type Output = Category
}

export const CreateCategoryUseCaseContractType = Symbol(
  'CreateCategoryUseCaseContract',
)
