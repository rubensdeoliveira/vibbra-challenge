import { withSSRGuest } from '@/client/application/helpers'
import { signIn } from 'next-auth/react'

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  }
})

export default function Login() {
  return (
    <button
      className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
      onClick={() => void signIn('google')}
    >
      Login com google
    </button>
  )
}
