import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Votes from '../Votes';
import { updateCommentVote } from '../../api/api';
import ErrorMsg from '../Basic/ErrorMsg';
import Spinner from '../Basic/Spinner';

const CommentDetails = ({ comment }) => {
  const { author, body, created_at, votes, comment_id } = comment;

  const [error, setError] = useState(null);

  const createdDate = format(new Date(created_at), 'dd/MM/yyyy');

  const updateComment = (value) => {
    updateCommentVote(comment_id, value)
      .then((comment) => {
        setError(null);
      })
      .catch(({ data: { error } }) => {
        setError({ status: error.status, msg: error.message });
      });
  };

  return (
    <li>
      <Link className='comment_username'>{author}</Link>
      <p>{body}</p>
      <div className='comment-detail_container'>
        <p>{createdDate}</p>
        {/* <p>{votes} Votes</p> */}
        <Votes
          type={'votes'}
          votes={votes}
          update={updateComment}
          error={error}
        />
      </div>
    </li>
  );
};

export default CommentDetails;
