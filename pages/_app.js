import '../styles/globals.css'
import Head from 'next/head'
import Link from 'next/link';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)
function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <title>Ppaste</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <nav className="border-b p-6">
        <Link
          href="/"
        >
          <a className="text-2xl font-bold">
            Ppaste
          </a>
        </Link>
      </nav>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
