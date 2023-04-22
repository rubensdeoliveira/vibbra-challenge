import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'

export function withSSRAuthenticated(fn: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const session = await getSession(ctx)

    if (!session) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      }
    }

    return await fn(ctx)
  }
}
