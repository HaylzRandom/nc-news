import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Votes from '../Votes';
import { updateCommentVote } from '../../api/api';

const CommentDetails = ({ comment }) => {
  const { author, body, created_at, votes, comment_id } = comment;

  const [updateError, setUpdateError] = useState(null);
  const [updateMsg, setUpdateMsg] = useState(null);

  const createdDate = format(new Date(created_at), 'dd/MM/yyyy');

  const updateComment = (value) => {
    updateCommentVote(comment_id, value)
      .then((comment) => {
        setUpdateMsg(comment);
        setUpdateError(null);

        // Set the confirm message to disappear
        setTimeout(() => {
          setUpdateMsg(null);
        }, 5000);
      })
      .catch((error) => {
        if (error.code === 'ERR_NETWORK') {
          setUpdateError('Internet Issues, please try again later!');
        } else {
          setUpdateError('Something went wrong, try again later!');
        }
      });
  };

  return (
    <li>
      <Link className='comment_username'>{author}</Link>
      <p>{body}</p>
      <div className='comment-detail_container'>
        <p>{createdDate}</p>
        <Votes
          type={'votes'}
          votes={votes}
          update={updateComment}
          message={updateMsg}
          error={updateError}
        />
      </div>
    </li>
  );
};

export default CommentDetails;
