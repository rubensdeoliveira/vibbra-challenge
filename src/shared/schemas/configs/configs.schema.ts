import { convertCurrency } from '@/client/application/helpers'
import { z } from 'zod'

const upsertFields = {
  notifyByEmail: z.boolean(),
  notifyBySms: z.boolean(),
  meiLimit: z
    .string()
    .transform(str => convertCurrency(str))
    .refine(value => value && value <= 1000000, {
      message: 'Limite máximo de 1.000.000',
    }),
}

export const UpdateConfigFormSchema = z.object({
  ...upsertFields,
  id: z.string().uuid(),
  meiLimit: z.string(),
})

export type UpdateConfigFormDTO = z.infer<typeof UpdateConfigFormSchema>

export const UpdateConfigSchema = z.object({
  ...upsertFields,
  id: z.string().uuid(),
})

export type UpdateConfigDTO = z.infer<typeof UpdateConfigSchema>

export const CreateConfigSchema = z.object(upsertFields)

export type CreateConfigDTO = z.infer<typeof CreateConfigSchema>

export const GetConfigByUserIdSchema = z.object({
  userId: z.string().uuid(),
})

export type GetConfigByUserIdDTO = z.infer<typeof GetConfigByUserIdSchema>
