import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

import { Button, Form, Input, Navbar } from '@/client/application/components'
import { CreateCompanyDTO, CreateCompanySchema } from '@/shared/schemas'
import { api } from '@/shared/utils'

type UpsertCompanyProps = {
  defaultValues?: CreateCompanyDTO
  companyId?: string
}

export function UpsertCompany({
  defaultValues,
  companyId,
}: UpsertCompanyProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCompanyDTO>({
    resolver: zodResolver(CreateCompanySchema),
    defaultValues,
  })
  const { push } = useRouter()
  const utils = api.useContext()

  const { mutate: addCompany } = api.company.create.useMutation({
    onSuccess: () => {
      push('/companies')
    },
    onError: err => {
      console.log(err)
    },
  })

  const { mutate: editCompany } = api.company.update.useMutation({
    onSuccess: () => {
      utils.company.getById.invalidate({ id: companyId })
      push('/companies')
    },
    onError: err => {
      console.log(err)
    },
  })

  function handleSubmitForm(data: CreateCompanyDTO) {
    companyId ? editCompany({ ...data, id: companyId }) : addCompany(data)
  }

  return (
    <Navbar>
      <Form onSubmit={handleSubmit(handleSubmitForm)}>
        <Input
          label="Nome da Empresa"
          name="name"
          register={register}
          errors={errors}
        />
        <Input
          label="Razāo Social"
          name="corporateName"
          register={register}
          errors={errors}
        />
        <Input
          label="CNPJ"
          name="cnpj"
          register={register}
          errors={errors}
          mask="99.999.999/9999-99"
        />
        <Button label={companyId ? 'Editar' : 'Cadastrar'} className="mt-6" />
      </Form>
    </Navbar>
  )
}
