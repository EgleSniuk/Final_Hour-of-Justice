import '../styles/globals.css';
import '../styles/variables.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import PageTemplate from '../components/PageTemplate/PageTemplate';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Hour of Justice</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PageTemplate>
        <Component {...pageProps} />
      </PageTemplate>
    </>
  );
}

export default MyApp;