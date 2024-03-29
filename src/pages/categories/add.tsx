import { withSSRAuthenticated } from '@/client/application/helpers'
import { UpsertCategory } from '@/client/application/pages'

export const getServerSideProps = withSSRAuthenticated(async () => {
  return {
    props: {},
  }
})

export default function AddCategory() {
  return <UpsertCategory />
}
