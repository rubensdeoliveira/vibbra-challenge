import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

import { Button, Form, Input, Navbar } from '@/client/application/components'
import { CreateReceiptDTO, CreateReceiptSchema } from '@/shared/schemas'
import { api } from '@/shared/utils'

type UpsertReceiptProps = {
  defaultValues?: CreateReceiptDTO
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
  } = useForm<CreateReceiptDTO>({
    resolver: zodResolver(CreateReceiptSchema),
    defaultValues,
  })
  const { push } = useRouter()
  const utils = api.useContext()

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

  function handleSubmitForm(data: CreateReceiptDTO) {
    receiptId ? editReceipt({ ...data, id: receiptId }) : addReceipt(data)
  }

  return (
    <Navbar>
      <Form onSubmit={handleSubmit(handleSubmitForm)}>
        <Input
          label="Empresa"
          name="companyId"
          register={register}
          errors={errors}
          mask="99.999.999/9999-99"
        />
        <Input label="Valor" name="value" register={register} errors={errors} />
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
          mask="99.999.999/9999-99"
        />
        <Input
          label="Mês de competência"
          name="competenceDate"
          register={register}
          errors={errors}
        />
        <Input
          label="Data de recebimento"
          name="paymentDate"
          register={register}
          errors={errors}
        />

        <Button label={receiptId ? 'Editar' : 'Cadastrar'} className="mt-6" />
      </Form>
    </Navbar>
  )
}
