import Link from 'next/link';
import Image from 'next/image';
import { FC } from 'react';
import { Video } from '../../types/types';
import { cutTooLongText } from '../../utils/utils';
import classes from './videos.module.scss';

type Props = {
  video: any;
};

const VideoItem: FC<Props> = ({ video }) => {
  const { videoId, title, thumbnails } = video;
  const linkPath = `/${videoId}`;
  return (
    <div className={classes.video}>
      <Link href={linkPath}>
        <a>
          <div className={classes.content}>
            <p>
              <b>{videoId}</b>
            </p>
            <Image src={thumbnails} alt={title} width={120} height={90} />
            <p>{cutTooLongText(title, 30)}</p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default VideoItem;
