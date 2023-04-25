import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

import { Button, Form, Input, Navbar } from '@/client/application/components'
// import { UpdateConfigDTO, UpdateConfigSchema } from '@/shared/schemas'
import { api } from '@/shared/utils'

// type UpsertConfigProps = {
//   defaultValues: UpdateConfigDTO
// }

export function ConfigsPage() {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<UpdateConfigDTO>({
  //   resolver: zodResolver(UpdateConfigSchema),
  //   defaultValues,
  // })
  const { push } = useRouter()
  const utils = api.useContext()

  // const { mutate: updateConfig } = api.config.update.useMutation({
  //   onSuccess: () => {
  //     utils.config.getById.invalidate({ id: configId })
  //     push('/configs')
  //   },
  //   onError: err => {
  //     console.log(err)
  //   },
  // })

  // function handleSubmitForm(data: UpdateConfigDTO) {
  // updateConfig({ ...data, id: configId })
  // }

  return (
    <Navbar>
      {/* <Form onSubmit={handleSubmit(handleSubmitForm)}>
        <Input
          label="Limite do MEI"
          name="meiLimit"
          register={register}
          errors={errors}
        />
        <Button label="Alterar" className="mt-6" />
      </Form> */}
    </Navbar>
  )
}
