import { withSSRAuthenticated } from '@/client/application/helpers'
import { UpsertCompany } from '@/client/application/pages'
import { api } from '@/shared/utils'
import { useRouter } from 'next/router'

export const getServerSideProps = withSSRAuthenticated(async () => {
  return {
    props: {},
  }
})

export default function EditCompany() {
  const { query } = useRouter()
  const companyId = String(query.id)

  const {
    data: company,
    isLoading,
    isError,
  } = api.company.getById.useQuery({
    id: companyId,
  })

  if (isLoading) {
    return <p>carregando...</p>
  }

  if (isError || !company) {
    return <p>Erro</p>
  }

  return <UpsertCompany defaultValues={company} companyId={companyId} />
}
