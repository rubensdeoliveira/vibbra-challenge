import { getMinValueMessage } from '@/shared/contansts'
import { z } from 'zod'

const upsertFields = {
  value: z.number().max(10, getMinValueMessage('valor', 10)),
  name: z.string().trim().min(6, getMinValueMessage('número da nota', 6)),
  competenceDate: z.date(),
  paymentDate: z.date(),
  companyId: z.string().uuid(),
  categoryId: z.string().uuid(),
}

export const CreateCostSchema = z.object(upsertFields)

export type CreateCostDTO = z.infer<typeof CreateCostSchema>

export const UpdateCostSchema = z.object({
  ...upsertFields,
  id: z.string().uuid(),
})

export type UpdateCostDTO = z.infer<typeof UpdateCostSchema>
