import type { NextPage } from 'next';
import Head from 'next/head';
import { Fragment, useContext } from 'react';
import Spinner from '../components/spinner/spinner';
import Videos from '../components/videos/videos';
import { VideoContext } from '../context/video-context';
import { connectToDatabase } from '../utils/database';

const Home: NextPage = () => {
  const { allVideos, loading } = useContext(VideoContext);
  return (
    <Fragment>
      {loading ? <Spinner /> : null}
      <Head>
        <title>Youtube app</title>
        <meta name="description" content="This is an application about youtube API." />
      </Head>
      <Videos videos={allVideos} />
    </Fragment>
  );
};

export const getServerSideProps = async () => {
  try {
    await connectToDatabase();
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    return {
      props: { isConnected: false },
    };
  }
};

export default Home;
