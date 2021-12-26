import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <title>Ppaste</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <nav className="border-b p-6">
        <p className="text-4xl font-bold">Ppaste</p>
      </nav>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
