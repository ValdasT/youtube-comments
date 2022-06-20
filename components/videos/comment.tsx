import { FC } from 'react';
import Image from 'next/image';
import classes from './videos.module.scss';
import { Comment } from '../../types/types';

type Props = {
  comment: Comment;
};

const OneComment: FC<Props> = ({ comment }) => {
  return (
    <div className={classes['comment-card']}>
      <div className={classes['user-info']}>
        <Image className={classes['user-img']} src={comment.authorImage} width={40} height={40} />
        <div className={classes['user-name']}>{comment.author}</div>
      </div>
      <div className={classes['user-text']} dangerouslySetInnerHTML={{ __html: comment.text }} />
    </div>
  );
};

export default OneComment;
