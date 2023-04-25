import { type Category } from '@prisma/client'
import { type UpdateCategoryDTO } from '@/shared/schemas'

export interface UpdateCategoryUseCaseContract {
  update: (
    input: UpdateCategoryUseCaseContract.Input,
  ) => Promise<UpdateCategoryUseCaseContract.Output>
}

export namespace UpdateCategoryUseCaseContract {
  export type Input = UpdateCategoryDTO & {
    userId: string
  }
  export type Output = Category
}

export const UpdateCategoryUseCaseContractType = Symbol(
  'UpdateCategoryUseCaseContract',
)
