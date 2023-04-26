import { ListAmountByMonthInYearPaginatedDTO } from '@/shared/schemas'

export interface ListAmountByMonthInYearReceiptsUseCaseContract {
  listAmountByMonthInYear: (
    input: ListAmountByMonthInYearReceiptsUseCaseContract.Input,
  ) => Promise<ListAmountByMonthInYearReceiptsUseCaseContract.Output>
}

export namespace ListAmountByMonthInYearReceiptsUseCaseContract {
  export type Input = ListAmountByMonthInYearPaginatedDTO & { userId: string }
  export type Output = { month: string; value: number }[]
}

export const ListAmountByMonthInYearReceiptsUseCaseContractType = Symbol(
  'ListAmountByMonthInYearReceiptsUseCaseContract',
)
