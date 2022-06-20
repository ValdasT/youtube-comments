import Link from 'next/link';
import Image from 'next/image';
import { FC, Fragment } from 'react';
import { Video } from '../../types/types';
import { cutTooLongText } from '../../utils/utils';
import classes from './videos.module.scss';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import Router from 'next/router';

type Props = {
  video: Video;
};

const VideoItem: FC<Props> = ({ video }) => {
  const { videoId, title, thumbnails, comments, fromDb } = video;
  const linkPath = `/${videoId}`;
  return (
    <div className={classes.video}>
      <div className={classes.content}>
        {fromDb ? <Alert severity={'warning'}>{`The data could be outdated!`}</Alert> : null}
        <p>
          <b>{videoId}</b>
        </p>
        <Image src={thumbnails} alt={title} width={120} height={90} />
        <p>{cutTooLongText(title, 30)}</p>
        {comments.length ? (
          <Fragment>
            <Button size="small" variant="outlined" onClick={() => Router.push(`${linkPath}`)}>
              {`Read ${comments.length} ${comments.length === 1 ? 'Comment' : 'Comments'}`}
            </Button>
          </Fragment>
        ) : null}
      </div>
    </div>
  );
};

export default VideoItem;
