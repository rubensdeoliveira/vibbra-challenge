import { z } from 'zod'

export const ListPaginatedSchema = z.object({
  search: z.string(),
  page: z.number(),
})

export type ListPaginatedDTO = z.infer<typeof ListPaginatedSchema>

export type ListCountDTO = Omit<z.infer<typeof ListPaginatedSchema>, 'page'>
