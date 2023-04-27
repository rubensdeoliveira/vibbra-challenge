import { DataHandler } from '@/client/application/components'
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

  return (
    <DataHandler isLoading={isLoading} isError={isError}>
      <UpsertCompany defaultValues={company} companyId={companyId} />
    </DataHandler>
  )
}
