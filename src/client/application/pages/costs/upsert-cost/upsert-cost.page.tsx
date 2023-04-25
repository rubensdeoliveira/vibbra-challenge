import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

import { Button, Form, Input, Navbar } from '@/client/application/components'
import { CreateCostDTO, CreateCostSchema } from '@/shared/schemas'
import { api } from '@/shared/utils'

type UpsertCostProps = {
  defaultValues?: CreateCostDTO
  costId?: string
}

export function UpsertCost({ defaultValues, costId }: UpsertCostProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCostDTO>({
    resolver: zodResolver(CreateCostSchema),
    defaultValues,
  })
  const { push } = useRouter()
  const utils = api.useContext()

  const { mutate: addCost } = api.cost.create.useMutation({
    onSuccess: () => {
      push('/costs')
    },
    onError: err => {
      console.log(err)
    },
  })

  const { mutate: editCost } = api.cost.update.useMutation({
    onSuccess: () => {
      utils.cost.getById.invalidate({ id: costId })
      push('/costs')
    },
    onError: err => {
      console.log(err)
    },
  })

  function handleSubmitForm(data: CreateCostDTO) {
    costId ? editCost({ ...data, id: costId }) : addCost(data)
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
        <Button label={costId ? 'Editar' : 'Cadastrar'} className="mt-6" />
      </Form>
    </Navbar>
  )
}
