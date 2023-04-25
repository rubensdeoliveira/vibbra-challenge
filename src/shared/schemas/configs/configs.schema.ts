import { getMinValueMessage } from '@/shared/contansts'
import { z } from 'zod'

const upsertFields = {
  notifyByEmail: z.boolean(),
  notifyBySms: z.boolean(),
  meiLimit: z.number().max(10, getMinValueMessage('Limite do MEI', 10)),
}

export const UpdateConfigSchema = z.object({
  ...upsertFields,
  id: z.string().uuid(),
})

export type UpdateConfigDTO = z.infer<typeof UpdateConfigSchema>

export const GetConfigByUserIdSchema = z.object({
  userId: z.string().uuid(),
})

export type GetConfigByUserIdDTO = z.infer<typeof GetConfigByUserIdSchema>
