import { type AppType } from 'next/app'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import { api } from '@/shared/utils'

import '@/client/application/styles/globals.css'
import Head from 'next/head'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Vibbra NF</title>
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
