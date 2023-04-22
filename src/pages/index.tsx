import { withSSRGuest } from '@/client/application/helpers'
import { signIn } from 'next-auth/react'

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  }
})

export default function Login() {
  return (
    <button className="" onClick={() => void signIn('google')}>
      Login com google
    </button>
  )
}
