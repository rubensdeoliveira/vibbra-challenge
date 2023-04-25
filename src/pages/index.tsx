import { withSSRGuest } from '@/client/application/helpers'
import { api } from '@/shared/utils'
import { signIn } from 'next-auth/react'

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  }
})

export default function Login() {
  const { data, isError } = api.company.list.useQuery({
    page: 1,
    search: '',
  })

  return (
    <>
      <h1>Data</h1>
      {isError ? <p>nao carregou</p> : JSON.stringify(data)}
      <button className="" onClick={() => void signIn('google')}>
        Login com google
      </button>
    </>
  )
}
