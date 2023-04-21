import { z } from 'zod'

export const CreateSessionSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export type CreateSessionDTO = z.infer<typeof CreateSessionSchema>
