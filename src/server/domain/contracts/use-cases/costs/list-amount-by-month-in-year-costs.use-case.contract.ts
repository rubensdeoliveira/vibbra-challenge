import { ListAmountByMonthInYearPaginatedDTO } from '@/shared/schemas'

export interface ListAmountByMonthInYearCostsUseCaseContract {
  listAmountByMonthInYear: (
    input: ListAmountByMonthInYearCostsUseCaseContract.Input,
  ) => Promise<ListAmountByMonthInYearCostsUseCaseContract.Output>
}

export namespace ListAmountByMonthInYearCostsUseCaseContract {
  export type Input = ListAmountByMonthInYearPaginatedDTO & { userId: string }
  export type Output = { month: string; value: number }[]
}

export const ListAmountByMonthInYearCostsUseCaseContractType = Symbol(
  'ListAmountByMonthInYearCostsUseCaseContract',
)
