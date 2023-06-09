import Head from 'next/head'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import { Roboto } from 'next/font/google'

import { Container, CssBaseline } from '@mui/material'

import NavBar from '@components/navbar'

import '@/styles/globals.scss'
import 'plyr/dist/plyr.css'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  subsets: ['latin']
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Anime</title>
      </Head>

      <CssBaseline />
      <NavBar />
      <Container component='main' maxWidth={false} className={roboto.className}>
        <Component {...pageProps} />
      </Container>
      <Analytics />
    </>
  )
}

export default MyApp
