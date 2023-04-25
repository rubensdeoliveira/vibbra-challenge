import { z } from 'zod'

export const ToggleItemSchema = z.object({
  id: z.string().uuid(),
})

export type ToggleItemDTO = z.infer<typeof ToggleItemSchema>
