import { Navbar } from '@/client/application/components'
import { withSSRAuthenticated } from '@/client/application/helpers'

export const getServerSideProps = withSSRAuthenticated(async () => {
  return {
    props: {},
  }
})

export default function Categories() {
  return <Navbar>Categories</Navbar>
}
