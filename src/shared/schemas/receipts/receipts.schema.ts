import { convertCurrency } from '@/client/application/helpers'
import { getMaxValueMessage, getMinValueMessage } from '@/shared/contansts'
import { z } from 'zod'
import { validate } from 'uuid'

const upsertFields = {
  companyId: z
    .object({ value: z.string().uuid(), label: z.string() })
    .transform(value => value.value)
    .refine(value => validate(value), {
      message: 'Valor informado nāo é do tipo uuid para companyId',
    }),
  value: z
    .string()
    .transform(str => convertCurrency(str))
    .refine(value => value && value <= 1000000, {
      message: 'Limite máximo de 1.000.000',
    }),
  number: z.string().trim().min(6, getMinValueMessage('número da nota', 6)),
  description: z.string().trim().min(6, getMinValueMessage('descriçāo', 6)),
  competenceDate: z.date(),
  paymentDate: z.date(),
}

export const CreateReceiptFormSchema = z.object({
  ...upsertFields,
  companyId: z.object({ value: z.string().uuid(), label: z.string() }),
  value: z.string(),
})

export type CreateReceiptFormDTO = z.infer<typeof CreateReceiptFormSchema>

export const CreateReceiptSchema = z.object(upsertFields)

export type CreateReceiptDTO = z.infer<typeof CreateReceiptSchema>

export const UpdateReceiptSchema = z.object({
  ...upsertFields,
  id: z.string().uuid(),
})

export type UpdateReceiptDTO = z.infer<typeof UpdateReceiptSchema>
