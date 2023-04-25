import { getMinValueMessage } from '@/shared/contansts'
import { z } from 'zod'

const upsertFields = {
  companyId: z.string().uuid(),
  value: z.number().max(10, getMinValueMessage('valor', 10)),
  number: z.string().trim().min(6, getMinValueMessage('número da nota', 6)),
  description: z.string().trim().min(6, getMinValueMessage('descriçāo', 6)),
  competenceDate: z.date(),
  paymentDate: z.date(),
}

export const CreateReceiptSchema = z.object(upsertFields)

export type CreateReceiptDTO = z.infer<typeof CreateReceiptSchema>

export const UpdateReceiptSchema = z.object({
  ...upsertFields,
  id: z.string().uuid(),
})

export type UpdateReceiptDTO = z.infer<typeof UpdateReceiptSchema>
