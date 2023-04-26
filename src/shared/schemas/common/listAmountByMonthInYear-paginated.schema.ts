import { z } from 'zod'

export const ListAmountByMonthInYearPaginatedSchema = z.object({
  year: z.string(),
})

export type ListAmountByMonthInYearPaginatedDTO = z.infer<
  typeof ListAmountByMonthInYearPaginatedSchema
>
