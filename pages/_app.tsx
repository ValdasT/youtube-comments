import '../styles/globals.scss';
import Head from 'next/head';
import Layout from '../components/layout/layout';
import type { AppProps } from 'next/app';
import VideoProvider from '../context/video-context';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <VideoProvider>
      <Layout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </VideoProvider>
  );
};

export default App;
