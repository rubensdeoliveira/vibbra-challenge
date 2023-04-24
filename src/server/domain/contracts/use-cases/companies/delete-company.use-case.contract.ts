import { type DeleteItemDTO } from '@/shared/schemas'

export interface DeleteCompanyUseCaseContract {
  delete: (input: DeleteCompanyUseCaseContract.Input) => Promise<void>
}

export namespace DeleteCompanyUseCaseContract {
  export type Input = DeleteItemDTO
}

export const DeleteCompanyUseCaseContractType = Symbol(
  'DeleteCompanyUseCaseContract',
)
