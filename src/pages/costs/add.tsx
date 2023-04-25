import { withSSRAuthenticated } from '@/client/application/helpers'
import { UpsertCost } from '@/client/application/pages'

export const getServerSideProps = withSSRAuthenticated(async () => {
  return {
    props: {},
  }
})

export default function AddCost() {
  return <UpsertCost />
}
