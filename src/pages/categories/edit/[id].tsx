import { withSSRAuthenticated } from '@/client/application/helpers'
import { UpsertCategory } from '@/client/application/pages'
import { api } from '@/shared/utils'
import { useRouter } from 'next/router'

export const getServerSideProps = withSSRAuthenticated(async () => {
  return {
    props: {},
  }
})

export default function EditCategory() {
  const { query } = useRouter()
  const categoryId = String(query.id)

  const {
    data: category,
    isLoading,
    isError,
  } = api.category.getById.useQuery({
    id: categoryId,
  })

  if (isLoading) {
    return <p>carregando...</p>
  }

  if (isError || !category) {
    return <p>Erro</p>
  }

  return <UpsertCategory defaultValues={category} categoryId={categoryId} />
}
