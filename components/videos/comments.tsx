import { FC } from 'react';
import OneComment from './comment';
import classes from './videos.module.scss';
import { Comment } from '../../types/types';

type Props = {
  comments: Comment[];
};

const Comments: FC<Props> = ({ comments }) => {
  return (
    <div className={classes['container']}>
      <h2 id="title">{`${comments.length} ${comments.length === 1 ? 'Comment:' : 'Comments:'}`}</h2>
      <div className={classes['comment-container']}>
        {comments.map((comment: Comment) => (
          <OneComment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
