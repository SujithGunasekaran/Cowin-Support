import Head from 'next/head';
import Header from '../components/Header';
import '../styles/globals.css';
import '../styles/header.css';
import '../styles/home.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Cowin-Support</title>
        <meta name="description" content="Cowin-Support app" />
        <link rel="icon" href="/favicon.ico" />

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous"></link>
        <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>

      </Head>
      <Header />
      <div className="main_page">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
