import { DataHandler } from '@/client/application/components'
import { withSSRAuthenticated } from '@/client/application/helpers'
import { ConfigsPage } from '@/client/application/pages'
import { api } from '@/shared/utils'

export const getServerSideProps = withSSRAuthenticated(async () => {
  return {
    props: {},
  }
})

export default function Configs() {
  const { data: config, isLoading, isError } = api.config.getByUser.useQuery()

  return (
    <DataHandler isLoading={isLoading} isError={isError}>
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
    </DataHandler>
  )
}
