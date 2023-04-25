import { withSSRAuthenticated } from '@/client/application/helpers'
import { ConfigsPage } from '@/client/application/pages'
import { api } from '@/shared/utils'
import { useRouter } from 'next/router'

export const getServerSideProps = withSSRAuthenticated(async () => {
  return {
    props: {},
  }
})

export default function Configs() {
  const { query } = useRouter()
  const configId = String(query.id)

  const { data: config, isLoading, isError } = api.config.getByUser.useQuery()

  if (isLoading) {
    return <p>carregando...</p>
  }

  if (isError || !config) {
    return <p>Erro</p>
  }

  return <ConfigsPage defaultValues={config} />
}
