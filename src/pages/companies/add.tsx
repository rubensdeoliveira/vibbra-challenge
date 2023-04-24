import { withSSRAuthenticated } from '@/client/application/helpers'
import { UpsertCompany } from '@/client/application/pages'

export const getServerSideProps = withSSRAuthenticated(async () => {
  return {
    props: {},
  }
})

export default function AddCompany() {
  return <UpsertCompany />
}
