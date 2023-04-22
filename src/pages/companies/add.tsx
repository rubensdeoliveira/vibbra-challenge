import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Form, Input, Navbar } from '@/client/application/components'
import { withSSRAuthenticated } from '@/client/application/helpers'
import { CreateCompanyDTO, CreateCompanySchema } from '@/shared/schemas'
import { api } from '@/shared/utils'
import { useRouter } from 'next/router'

export const getServerSideProps = withSSRAuthenticated(async () => {
  return {
    props: {},
  }
})

export default function AddCompany() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCompanyDTO>({
    resolver: zodResolver(CreateCompanySchema),
  })
  const router = useRouter()

  const { mutate, isLoading, isError } = api.company.create.useMutation({
    onSuccess: () => {
      router.push('/companies')
    },
    onError: err => {
      console.log(err)
    },
  })

  function handleSubmitForm(data: CreateCompanyDTO) {
    console.log(data)
    mutate(data)
  }

  return (
    <Navbar>
      <Form onSubmit={handleSubmit(handleSubmitForm)}>
        <Input label="Nome da Empresa" name="name" register={register} />
        <Input label="Razāo Social" name="corporateName" register={register} />
        <Input label="CNPJ" name="cnpj" register={register} />
        <Button label="Cadastrar" />
      </Form>
    </Navbar>
  )
}
