import '../styles/index.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>fplbot</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp