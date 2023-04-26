import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

import {
  Button,
  Form,
  Input,
  InputCurrency,
  Navbar,
} from '@/client/application/components'
import { UpdateConfigDTO, UpdateConfigSchema } from '@/shared/schemas'
import { api } from '@/shared/utils'

type UpsertConfigProps = {
  defaultValues: UpdateConfigDTO
  configId: string
}

export function ConfigsPage({ defaultValues, configId }: UpsertConfigProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateConfigDTO>({
    resolver: zodResolver(UpdateConfigSchema),
    defaultValues,
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

  function handleSubmitForm(data: UpdateConfigDTO) {
    updateConfig({ ...data, id: configId })
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
        <Button label="Alterar" className="mt-6" />
      </Form>
    </Navbar>
  )
}
