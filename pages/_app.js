import '../styles/globals.css'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import { Layout, Meta, Navbar } from '../components/Common';

TimeAgo.addDefaultLocale(en)
function MyApp({ Component, pageProps }) {

  return (
    <>
      <Meta />
      <Navbar />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
