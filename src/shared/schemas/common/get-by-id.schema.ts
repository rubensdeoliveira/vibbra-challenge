import { z } from 'zod'

export const GetByIdSchema = z.object({
  id: z.string().uuid(),
})

export type GetByIdDTO = z.infer<typeof GetByIdSchema>
