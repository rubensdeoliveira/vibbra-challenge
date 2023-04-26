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
import { CreateReceiptFormDTO, CreateReceiptFormSchema } from '@/shared/schemas'
import { api } from '@/shared/utils'
import { z } from 'zod'
import { convertCurrency } from '@/client/application/helpers'

type UpsertReceiptProps = {
  defaultValues?: CreateReceiptFormDTO
  receiptId?: string
}

export function UpsertReceipt({
  defaultValues,
  receiptId,
}: UpsertReceiptProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateReceiptFormDTO>({
    resolver: zodResolver(CreateReceiptFormSchema),
    defaultValues,
  })
  const { push } = useRouter()
  const utils = api.useContext()

  const { data: companies } = api.company.list.useQuery({
    page: 1,
    rowsPerPage: 99999,
  })

  const { mutate: addReceipt } = api.receipt.create.useMutation({
    onSuccess: () => {
      push('/receipts')
    },
    onError: err => {
      console.log(err)
    },
  })

  const { mutate: editReceipt } = api.receipt.update.useMutation({
    onSuccess: () => {
      utils.receipt.getById.invalidate({ id: receiptId })
      push('/receipts')
    },
    onError: err => {
      console.log(err)
    },
  })

  function handleSubmitForm(data: CreateReceiptFormDTO) {
    console.log(data)
    receiptId
      ? editReceipt({
          ...data,
          id: receiptId,
        })
      : addReceipt(data)
  }

  return (
    <Navbar>
      <Form onSubmit={handleSubmit(handleSubmitForm)}>
        <InputAutoComplete
          label="Empresa"
          name="companyId"
          control={control}
          errors={errors}
          placeholder="Digite e escolha a empresa"
          options={
            companies
              ? companies.data.map(item => ({
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
          placeholder="Digite o valor da nota fiscal"
        />
        <Input
          label="Número"
          name="number"
          register={register}
          errors={errors}
        />
        <Input
          label="Descriçāo"
          name="description"
          register={register}
          errors={errors}
        />

        <Button label={receiptId ? 'Editar' : 'Cadastrar'} className="mt-6" />
      </Form>
    </Navbar>
  )
}
