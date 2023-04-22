import { z } from 'zod'

export const ListPaginatedSchema = z.object({
  page: z.number(),
  search: z.string().optional(),
  rowsPerPage: z.number().optional(),
})

export type ListPaginatedDTO = z.infer<typeof ListPaginatedSchema>

export type ListCountDTO = Omit<
  z.infer<typeof ListPaginatedSchema>,
  'page' | 'rowsPerPage'
>
