import '../styles/index.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  const gaId = process.env.GOOGLE_ANALYTICS_ID;
  return (
    <>
      <Head>
        {gaId &&
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script dangerouslySetInnerHTML={{
              __html: ` window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments)}
              gtag('js', new Date());
              gtag('config', '${gaId}');`
            }}
            />
          </>
        }
        <title>fplbot</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp