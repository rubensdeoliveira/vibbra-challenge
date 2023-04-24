import { getMinValueMessage } from '@/shared/contansts'
import { z } from 'zod'

const upsertFields = {
  name: z.string().trim().min(6, getMinValueMessage('nome', 6)),
  corporateName: z
    .string()
    .trim()
    .min(6, getMinValueMessage('razāo social', 6)),
  cnpj: z
    .string()
    .trim()
    .min(18, 'O campo CNPJ precisa ser preenchido completamente'),
}

export const CreateCompanySchema = z.object(upsertFields)

export type CreateCompanyDTO = z.infer<typeof CreateCompanySchema>

export const UpdateCompanySchema = z.object({
  ...upsertFields,
  id: z.string().uuid(),
})

export type UpdateCompanyDTO = z.infer<typeof UpdateCompanySchema>
