import { DataHandler } from '@/client/application/components'
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

  return (
    <DataHandler isLoading={isLoading} isError={isError}>
      <UpsertCategory defaultValues={category} categoryId={categoryId} />
    </DataHandler>
  )
}
