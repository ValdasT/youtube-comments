import { FC, Fragment } from 'react';
import { Video } from '../../types/types';
import SubmitForm from '../submit-form/submit-form';
import VideoItem from './video-item';
import classes from './videos.module.scss';

type Props = {
  videos: Video[];
};

const Videos: FC<Props> = ({ videos }) => {
  return (
    <Fragment>
      <SubmitForm />
      {videos.length ? <h2 style={{ textAlign: 'center' }}>Results:</h2> : null}
      <div className={classes.videos}>
        <div className={classes.grid}>
          {videos.map((video: Video) => (
            <VideoItem key={video.id} video={video} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Videos;
