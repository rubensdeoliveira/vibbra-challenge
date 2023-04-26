import { convertCurrency } from '@/client/application/helpers'
import { getMinValueMessage } from '@/shared/contansts'
import { validate } from 'uuid'
import { z } from 'zod'

const upsertFields = {
  value: z
    .string()
    .transform(str => convertCurrency(str))
    .refine(value => value && value <= 1000000, {
      message: 'Limite máximo de 1.000.000',
    }),
  name: z.string().trim().min(6, getMinValueMessage('nome de despesa', 6)),
  competenceDate: z.date(),
  paymentDate: z.date(),
  categoryId: z
    .object({ value: z.string().uuid(), label: z.string() })
    .transform(value => value.value)
    .refine(value => validate(value), {
      message: 'Valor informado nāo é do tipo uuid para categoryId',
    }),
  companyId: z
    .object({ value: z.string().uuid(), label: z.string() })
    .transform(value => value.value)
    .refine(value => validate(value), {
      message: 'Valor informado nāo é do tipo uuid para companyId',
    })
    .optional(),
}

export const CreateCostFormSchema = z.object({
  ...upsertFields,
  categoryId: z.object({ value: z.string().uuid(), label: z.string() }),
  companyId: z
    .object({ value: z.string().uuid(), label: z.string() })
    .optional(),
  value: z.string(),
})

export type CreateCostFormDTO = z.infer<typeof CreateCostFormSchema>

export const CreateCostSchema = z.object(upsertFields)

export type CreateCostDTO = z.infer<typeof CreateCostSchema>

export const UpdateCostSchema = z.object({
  ...upsertFields,
  id: z.string().uuid(),
})

export type UpdateCostDTO = z.infer<typeof UpdateCostSchema>
