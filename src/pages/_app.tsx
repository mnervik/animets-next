import Head from 'next/head'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'

import '@/styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Anime</title>
      </Head>

      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

export default MyApp
