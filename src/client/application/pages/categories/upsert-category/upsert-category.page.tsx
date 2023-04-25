import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

import { Button, Form, Input, Navbar } from '@/client/application/components'
import { CreateCategoryDTO, CreateCategorySchema } from '@/shared/schemas'
import { api } from '@/shared/utils'

type UpsertCategoryProps = {
  defaultValues?: CreateCategoryDTO
  categoryId?: string
}

export function UpsertCategory({
  defaultValues,
  categoryId,
}: UpsertCategoryProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCategoryDTO>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues,
  })
  const { push } = useRouter()
  const utils = api.useContext()

  const { mutate: addCategory } = api.category.create.useMutation({
    onSuccess: () => {
      push('/categories')
    },
    onError: err => {
      console.log(err)
    },
  })

  const { mutate: editCategory } = api.category.update.useMutation({
    onSuccess: () => {
      utils.category.getById.invalidate({ id: categoryId })
      push('/categories')
    },
    onError: err => {
      console.log(err)
    },
  })

  function handleSubmitForm(data: CreateCategoryDTO) {
    categoryId ? editCategory({ ...data, id: categoryId }) : addCategory(data)
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
          label="Descriçāo"
          name="description"
          register={register}
          errors={errors}
        />
        <Button label={categoryId ? 'Editar' : 'Cadastrar'} className="mt-6" />
      </Form>
    </Navbar>
  )
}
