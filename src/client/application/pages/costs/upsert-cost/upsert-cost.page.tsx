import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

import {
  Button,
  Form,
  Input,
  InputAutoComplete,
  InputCurrency,
  InputDate,
  Navbar,
} from '@/client/application/components'
import { CreateCostFormDTO, CreateCostFormSchema } from '@/shared/schemas'
import { api } from '@/shared/utils'

type UpsertCostProps = {
  defaultValues?: CreateCostFormDTO
  costId?: string
}

export function UpsertCost({ defaultValues, costId }: UpsertCostProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateCostFormDTO>({
    resolver: zodResolver(CreateCostFormSchema),
    defaultValues,
  })
  const { push } = useRouter()
  const utils = api.useContext()

  const { data: companies } = api.company.list.useQuery({
    page: 1,
    rowsPerPage: 99999,
  })

  const { data: categories } = api.category.list.useQuery({
    page: 1,
    rowsPerPage: 99999,
  })

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

  function handleSubmitForm(data: CreateCostFormDTO) {
    costId ? editCost({ ...data, id: costId }) : addCost(data)
  }

  return (
    <Navbar>
      <Form onSubmit={handleSubmit(handleSubmitForm)}>
        <InputAutoComplete
          label="Categoria"
          name="categoryId"
          control={control}
          errors={errors}
          placeholder="Digite e escolha a categoria"
          options={
            categories
              ? categories.data.map(item => ({
                  label: item.name,
                  value: item.id,
                }))
              : []
          }
        />
        <InputDate
          label="Data de competência"
          name="competenceDate"
          control={control}
          errors={errors}
          defaultValue={defaultValues?.competenceDate}
        />
        <InputDate
          label="Data de recebimento"
          name="paymentDate"
          control={control}
          errors={errors}
          defaultValue={defaultValues?.paymentDate}
        />
        <InputCurrency
          label="Valor"
          name="value"
          control={control}
          errors={errors}
          placeholder="Digite o valor da despesa"
        />
        <Input
          label="Nome da Despesa"
          name="name"
          register={register}
          errors={errors}
        />
        <InputAutoComplete
          label="Empresa"
          name="companyId"
          control={control}
          errors={errors}
          placeholder="Digite e escolha a empresa (opcional)"
          options={
            companies
              ? companies.data.map(item => ({
                  label: item.name,
                  value: item.id,
                }))
              : []
          }
        />
        <Button label={costId ? 'Editar' : 'Cadastrar'} className="mt-6" />
      </Form>
    </Navbar>
  )
}
