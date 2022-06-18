import { FC } from 'react';
import Image from 'next/image';
import classes from './videos.module.scss';

type Props = {
  comment: any;
};

const Comment: FC<Props> = ({ comment }) => {
  return (
    <div className={classes['comment-card']}>
      <div className={classes['user-info']}>
        <Image className={classes['user-img']} src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} width={40} height={40} />
        <div className={classes['user-name']}>{comment.snippet.topLevelComment.snippet.authorDisplayName}</div>
      </div>
      <div className={classes['user-text']} dangerouslySetInnerHTML={{ __html: comment.snippet.topLevelComment.snippet.textDisplay }} />
    </div>
  );
};

export default Comment;
