import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Fragment, useContext, useEffect, useState } from 'react';
import { VideoContext } from '../context/video-context';
import DefaultErrorPage from 'next/error';
import youtube from './api/youtube';
import { Video } from '../types/types';
import Comments from '../components/videos/comments';
import classes from '../components/videos/videos.module.scss';
import SpinnerSmall from '../components/spinner/spinner-small';
import { removeUnusedFields } from '../utils/utils';

const VideoDetailPage = () => {
  const router = useRouter();

  const { allVideos, setAlert } = useContext(VideoContext);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [videoComments, setVideoComments] = useState([]);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    setSpinner(true);
    const videoId = router.query.videoId;
    const video = allVideos.find((video) => video.id === videoId);
    video ? setCurrentVideo(video) : null;

    (async () => {
      try {
        const response = await fetch('/api/mongo', {
          method: 'POST',
          body: JSON.stringify({
            name: 'findOne',
            collection: 'videos',
            query: { videoId: videoId },
          }),
        });
        let document = await response.json();
        if (Object.keys(document).length || new Date().getTime() - 24 * 60 * 60 * 1000 < document.timestamp) {
          setAlert({ show: true, message: 'The data could be outdated!', severity: 'warning' });
        } else {
          let { data } = await youtube.get(`/commentThreads`, {
            params: { videoId: router.query.videoId, part: 'snippet', maxResults: 20 },
          });
          data = removeUnusedFields(data);
          await fetch('/api/mongo', {
            method: 'POST',
            body: JSON.stringify({
              name: 'updateOne',
              collection: 'videos',
              query: { videoId: videoId },
              doc: {
                $set: {
                  ...data,
                  timestamp: new Date().getTime(),
                  videoId: videoId,
                },
              },
            }),
          });
          document = data;
        }
        document.items.length ? setVideoComments(document.items) : null;
      } catch (error) {
        console.log(error);
      } finally {
        setSpinner(false);
      }
    })();
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
      {spinner ? (
        <SpinnerSmall style={{ width: '50px ', height: '50px ' }} />
      ) : videoComments.length ? (
        <Comments comments={videoComments} />
      ) : (
        <p className={classes['container']}>
          <b>No Comments</b>
        </p>
      )}
    </Fragment>
  );
};

export default VideoDetailPage;
