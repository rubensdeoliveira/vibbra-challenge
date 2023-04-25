import { withSSRAuthenticated } from '@/client/application/helpers'
import { UpsertReceipt } from '@/client/application/pages'

export const getServerSideProps = withSSRAuthenticated(async () => {
  return {
    props: {},
  }
})

export default function AddReceipt() {
  return <UpsertReceipt />
}
