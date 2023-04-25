import { getMinValueMessage } from '@/shared/contansts'
import { z } from 'zod'

const upsertFields = {
  name: z.string().trim().min(6, getMinValueMessage('nome', 6)),
  description: z.string().trim().min(10, getMinValueMessage('descriçāo', 10)),
}

export const CreateCategorySchema = z.object(upsertFields)

export type CreateCategoryDTO = z.infer<typeof CreateCategorySchema>

export const UpdateCategorySchema = z.object({
  ...upsertFields,
  id: z.string().uuid(),
})

export type UpdateCategoryDTO = z.infer<typeof UpdateCategorySchema>
