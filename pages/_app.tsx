import '../styles/index.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  const gaId = process.env.GOOGLE_ANALYTICS_ID;
  return (
    <>
      <Head>
        {gaId && <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />}
        {gaId && <script dangerouslySetInnerHTML={{
          __html: ` window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments)}
              gtag('js', new Date());
              gtag('config', '${gaId}');`
        }}
        />}
        <title>fplbot</title>
        <meta name="theme-color" content="#37003c" />
        <meta name="slack-app-id" content="AREFP62B1" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@fplbotapp" />
        <meta name="twitter:creator" content="@fplbotapp" />
        <meta property="og:url" content="https://www.fplbot.app" />
        <meta property="og:title" content="@fplbot" />
        <meta property="og:description" content="A Slack app for Fantasy Premier League" />
        <meta property="og:image" content="https://fantasy.premierleague.com/img/share/facebook-share.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp