import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Votes from '../Votes';
import { deleteCommentById, updateCommentVote } from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const CommentDetails = ({ comment, user, setCommentDeleted }) => {
  const { author, body, created_at, votes, comment_id } = comment;

  const [updateError, setUpdateError] = useState(null);
  const [updateMsg, setUpdateMsg] = useState(null);
  const [updateProgress, setUpdateProgress] = useState(null);

  const [deleteError, setDeleteError] = useState(null);
  const [deleteMsg, setDeleteMsg] = useState(null);
  const [deleteProgress, setDeleteProgress] = useState(null);

  const createdDate = format(new Date(created_at), 'dd/MM/yyyy');

  const handleUpdateComment = (value) => {
    setUpdateProgress('Please wait, processing vote...');
    updateCommentVote(comment_id, value)
      .then((comment) => {
        setUpdateMsg(comment);
        setUpdateError(null);
        setUpdateProgress(null);

        // Set the confirm message to disappear
        // TODO - Split timeout into own hook
        setTimeout(() => {
          setUpdateMsg(null);
        }, 2500);
      })
      .catch((error) => {
        setUpdateProgress(null);
        if (error.code === 'ERR_NETWORK') {
          setUpdateError('Internet Issues, please try again later!');
        } else {
          setUpdateError('Something went wrong, try again later!');
        }

        setTimeout(() => {
          setUpdateError(null);
        }, 2500);
      });
  };

  // Handle Delete Comment
  const handleDeleteComment = (comment_id) => {
    setDeleteProgress('Please wait, deleting comment...');
    deleteCommentById(comment_id)
      .then(() => {
        setDeleteMsg('Your comment has been deleted!');
        setDeleteProgress(null);
        setDeleteError(null);

        setTimeout(() => {
          setDeleteMsg(null);
          setCommentDeleted('deleted');
        }, 2500);
        //
      })
      .catch((error) => {
        if (error.code === 'ERR_NETWORK') {
          setDeleteError('Internet Issues, please try again later!');
        } else {
          setDeleteError('Something went wrong, try again later!');
        }
        setDeleteProgress(null);

        setTimeout(() => {
          setDeleteError(null);
        }, 2500);
      });
  };

  if (deleteProgress) return <p>{deleteProgress}</p>;
  if (deleteMsg) return <p>{deleteMsg}</p>;
  if (deleteError) return <p>{deleteError}</p>;

  return (
    <>
      <li className='comment_container'>
        <p>{body}</p>
        <Link className='comment_username'>{author}</Link>
        <div className='comment-detail_container'>
          <p>{createdDate}</p>
          <div className='comment-detail_login-container'>
            <Votes
              type={'Votes'}
              votes={votes}
              update={handleUpdateComment}
              message={updateMsg}
              progress={updateProgress}
              error={updateError}
            />
            {user && user.username === author && (
              <button
                type='button'
                onClick={() => handleDeleteComment(comment_id)}
                className='comment-delete-btn'
                title='Delete Comment'
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            )}
          </div>
        </div>
      </li>
      <hr />
    </>
  );
};

export default CommentDetails;
