import { type Category } from '@prisma/client'
import { type ToggleItemDTO } from '@/shared/schemas'

export interface ToggleArchivedCategoryUseCaseContract {
  toggleArchived: (
    input: ToggleArchivedCategoryUseCaseContract.Input,
  ) => Promise<ToggleArchivedCategoryUseCaseContract.Output>
}

export namespace ToggleArchivedCategoryUseCaseContract {
  export type Input = ToggleItemDTO
  export type Output = Category
}

export const ToggleArchivedCategoryUseCaseContractType = Symbol(
  'ToggleArchivedCategoryUseCaseContract',
)
