import '../styles/globals.css';
import '../styles/variables.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '../components/Page/Page';
import Spinner from '../components/Spinner/Spinner';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const loadingStartRef = useRef<number | null>(null);
  const hideSpinnerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const MIN_SPINNER_VISIBLE_MS = 300;

    const handleRouteStart = () => {
      if (hideSpinnerTimeoutRef.current) {
        clearTimeout(hideSpinnerTimeoutRef.current);
        hideSpinnerTimeoutRef.current = null;
      }

      loadingStartRef.current = Date.now();
      setIsRouteLoading(true);
    };

    const handleRouteEnd = () => {
      const loadingStartedAt = loadingStartRef.current;

      if (!loadingStartedAt) {
        setIsRouteLoading(false);
        return;
      }

      const elapsed = Date.now() - loadingStartedAt;
      const remaining = Math.max(MIN_SPINNER_VISIBLE_MS - elapsed, 0);

      if (remaining === 0) {
        setIsRouteLoading(false);
        loadingStartRef.current = null;
        return;
      }

      hideSpinnerTimeoutRef.current = setTimeout(() => {
        setIsRouteLoading(false);
        loadingStartRef.current = null;
        hideSpinnerTimeoutRef.current = null;
      }, remaining);
    };

    router.events.on('routeChangeStart', handleRouteStart);
    router.events.on('routeChangeComplete', handleRouteEnd);
    router.events.on('routeChangeError', handleRouteEnd);

    return () => {
      router.events.off('routeChangeStart', handleRouteStart);
      router.events.off('routeChangeComplete', handleRouteEnd);
      router.events.off('routeChangeError', handleRouteEnd);

      if (hideSpinnerTimeoutRef.current) {
        clearTimeout(hideSpinnerTimeoutRef.current);
      }
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Hour of Justice</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {isRouteLoading ? (
        <div className="routeLoaderOverlay" aria-hidden="true">
          <Spinner size="lg" label="Loading page" />
        </div>
      ) : null}

      <Page>
        <Component {...pageProps} />
      </Page>
    </>
  );
}

export default MyApp;