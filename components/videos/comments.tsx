import { FC } from 'react';
import Comment from './comment';
import classes from './videos.module.scss';

type Props = {
  comments: any[];
};

const Comments: FC<Props> = ({ comments }) => {
  return (
    <div className={classes['container']}>
      <h2 id="title">{`${comments.length} ${comments.length === 1 ? 'Comment:' : 'Comments:'}`}</h2>
      <div className={classes['comment-container']}>
        {comments.map((comment: any) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
