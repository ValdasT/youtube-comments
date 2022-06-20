import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Fragment, useContext, useEffect, useState } from 'react';
import { VideoContext } from '../context/video-context';
import DefaultErrorPage from 'next/error';
import { Video } from '../types/types';
import Comments from '../components/videos/comments';
import classes from '../components/videos/videos.module.scss';

const VideoDetailPage = () => {
  const router = useRouter();

  const { allVideos } = useContext(VideoContext);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  useEffect(() => {
    const videoId = router.query.videoId;
    const video = allVideos.find((video: Video) => video.videoId === videoId);
    video ? setCurrentVideo(video) : null;
  }, []);

  if (!currentVideo) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <Fragment>
      <Head>
        <title>{currentVideo.title}</title>
        <meta name="description" content={currentVideo.title} />
      </Head>
      <div className={classes['container']}>
        <p>
          <b>{currentVideo.title}</b>
        </p>
        <Image src={currentVideo.thumbnails} alt={currentVideo.title} width={300} height={200} />
      </div>
      {currentVideo.comments.length ? (
        <Comments comments={currentVideo.comments} />
      ) : (
        <p className={classes['container']}>
          <b>No Comments</b>
        </p>
      )}
    </Fragment>
  );
};

export default VideoDetailPage;
