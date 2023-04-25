import { withSSRAuthenticated } from '@/client/application/helpers'
import { UpsertCost } from '@/client/application/pages'
import { api } from '@/shared/utils'
import { useRouter } from 'next/router'

export const getServerSideProps = withSSRAuthenticated(async () => {
  return {
    props: {},
  }
})

export default function EditCost() {
  const { query } = useRouter()
  const costId = String(query.id)

  const {
    data: cost,
    isLoading,
    isError,
  } = api.cost.getById.useQuery({
    id: costId,
  })

  if (isLoading) {
    return <p>carregando...</p>
  }

  if (isError || !cost) {
    return <p>Erro</p>
  }

  return <UpsertCost defaultValues={cost} costId={costId} />
}
