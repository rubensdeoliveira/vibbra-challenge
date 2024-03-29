import { type CreateReceiptDTO } from '@/shared/schemas'
import {
  DeleteItemDTO,
  GetByIdDTO,
  ListAmountByMonthInYearPaginatedDTO,
  type ListCountDTO,
  type ListPaginatedDTO,
} from '@/shared/schemas/common'
import { Company, type Receipt } from '@prisma/client'
import { WithRequired } from '@tanstack/react-query'

export interface ReceiptsRepositoryContract {
  getById: (
    data: GetReceiptByIdRepositoryContract.Input,
  ) => Promise<GetReceiptByIdRepositoryContract.Output>
  upsert: (
    data: UpsertReceiptRepositoryContract.Input,
  ) => Promise<UpsertReceiptRepositoryContract.Output>
  list: (
    data: ListReceiptsRepositoryContract.Input,
  ) => Promise<ListReceiptsRepositoryContract.Output>
  listByYear: (
    data: ListByYearReceiptsRepositoryContract.Input,
  ) => Promise<ListByYearReceiptsRepositoryContract.Output>
  count: (
    data: CountReceiptsRepositoryContract.Input,
  ) => Promise<CountReceiptsRepositoryContract.Output>
  delete: (data: DeleteReceiptRepositoryContract.Input) => Promise<void>
}

export namespace GetReceiptByIdRepositoryContract {
  export type Input = GetByIdDTO
  export type Output = (Receipt & { company: Company }) | null
}

export namespace UpsertReceiptRepositoryContract {
  export type Input = CreateReceiptDTO & { userId: string; id?: string }
  export type Output = Receipt
}

export namespace ListReceiptsRepositoryContract {
  export type Input = WithRequired<
    ListPaginatedDTO,
    'search' | 'rowsPerPage'
  > & { userId: string }
  export type Output = (Receipt & { company: Company })[]
}

export namespace ListByYearReceiptsRepositoryContract {
  export type Input = ListAmountByMonthInYearPaginatedDTO & { userId: string }
  export type Output = (Receipt & { company: Company })[]
}

export namespace CountReceiptsRepositoryContract {
  export type Input = WithRequired<ListCountDTO, 'search'> & { userId: string }
  export type Output = number
}

export namespace DeleteReceiptRepositoryContract {
  export type Input = DeleteItemDTO
}

export const ReceiptsRepositoryContractType = Symbol(
  'ReceiptsRepositoryContract',
)
