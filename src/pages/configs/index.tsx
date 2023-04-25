import { withSSRAuthenticated } from '@/client/application/helpers'
import { ConfigsPage } from '@/client/application/pages'

export const getServerSideProps = withSSRAuthenticated(async () => {
  return {
    props: {},
  }
})

export default function Configs() {
  return <ConfigsPage />
}
