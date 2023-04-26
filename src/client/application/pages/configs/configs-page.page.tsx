import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

import {
  Button,
  Form,
  InputCurrency,
  Navbar,
} from '@/client/application/components'
import { CreateConfigFormDTO, CreateConfigFormSchema } from '@/shared/schemas'
import { api } from '@/shared/utils'
import { InputSwitch } from '../../components/input-switch'

type UpsertConfigProps = {
  defaultValues?: CreateConfigFormDTO
  configId?: string
}

export function ConfigsPage({ defaultValues, configId }: UpsertConfigProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateConfigFormDTO>({
    resolver: zodResolver(CreateConfigFormSchema),
    defaultValues: defaultValues
      ? defaultValues
      : { meiLimit: '81000', notifyByEmail: true, notifyBySms: true },
  })
  const { push } = useRouter()
  const utils = api.useContext()

  const { mutate: updateConfig } = api.config.update.useMutation({
    onSuccess: () => {
      utils.config.getByUser.invalidate()
      push('/configs')
    },
    onError: err => {
      console.log(err)
    },
  })

  const { mutate: createConfig } = api.config.create.useMutation({
    onSuccess: () => {
      utils.config.getByUser.invalidate()
      push('/configs')
    },
    onError: err => {
      console.log(err)
    },
  })

  function handleSubmitForm(data: CreateConfigFormDTO) {
    console.log(configId)
    configId
      ? updateConfig({ ...data, meiLimit: String(data.meiLimit), id: configId })
      : createConfig({ ...data, meiLimit: String(data.meiLimit) })
  }

  return (
    <Navbar>
      <Form onSubmit={handleSubmit(handleSubmitForm)}>
        <InputCurrency
          label="Limite do MEI"
          name="meiLimit"
          control={control}
          errors={errors}
        />
        <InputSwitch
          label="Receber notificações por e-mail"
          name="notifyByEmail"
          control={control}
          errors={errors}
        />
        <InputSwitch
          label="Receber notificações por SMS"
          name="notifyBySms"
          control={control}
          errors={errors}
        />
        <Button label="Alterar" className="mt-6" />
      </Form>
    </Navbar>
  )
}
