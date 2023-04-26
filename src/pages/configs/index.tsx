import { withSSRAuthenticated } from '@/client/application/helpers'
import { ConfigsPage } from '@/client/application/pages'
import { api } from '@/shared/utils'

export const getServerSideProps = withSSRAuthenticated(async () => {
  return {
    props: {},
  }
})

export default function Configs() {
  const { data: config, isLoading } = api.config.getByUser.useQuery()

  if (isLoading) {
    return <p>carregando...</p>
  }

  return (
    <ConfigsPage
      defaultValues={
        config && {
          notifyByEmail: config.notifyByEmail,
          notifyBySms: config.notifyBySms,
          meiLimit: String(config.meiLimit),
        }
      }
      configId={config?.id}
    />
  )
}
