import { Navbar } from '@/client/application/components'
import { withSSRAuthenticated } from '@/client/application/helpers'

export const getServerSideProps = withSSRAuthenticated(async () => {
  return {
    props: {},
  }
})

export default function Dashboard() {
  return <Navbar>teste</Navbar>
}
