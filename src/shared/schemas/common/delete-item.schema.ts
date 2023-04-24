import { z } from 'zod'

export const DeleteItemSchema = z.object({
  id: z.string().uuid(),
})

export type DeleteItemDTO = z.infer<typeof DeleteItemSchema>
