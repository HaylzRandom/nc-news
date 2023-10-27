import { useState } from 'react';

import { addComment } from '../../api/api';
import ErrorMsg from '../Basic/ErrorMsg';
import MessageDisplay from '../Basic/MessageDisplay';

// TODO - Make this into a modal

const CommentNew = ({ article, setNewComment, user }) => {
  const [body, setBody] = useState('');
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    addComment(body, article, user.username)
      .then((comment) => {
        setNewComment(comment);
        setError(null);
        setProcessing(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 'ERR_NETWORK') {
          setError({
            message: 'No internet connection, please try again later',
          });
        } else {
          const { data, status } = error.response;
          setError({ status: status, message: data.msg });
        }
        setNewComment(null);
        setProcessing(false);
      });
  };

  if (error) return <ErrorMsg status={error.status} message={error.message} />;
  if (processing) return <MessageDisplay message={'Creating New Comment...'} />;
  return (
    <>
      <form onSubmit={handleSubmit} className='comment-new-form'>
        <label htmlFor='body' className='comment-new-label'>
          Comment:
        </label>
        <textarea
          className='comment-new-body'
          name='body'
          id='body'
          placeholder='Enter comment here...'
          onChange={handleChange}
          value={body}
          // cols={20}
          // rows={5}
          required
        ></textarea>
        <button
          type='submit'
          className='comment-new-btn'
          title='Add New Comment'
        >
          Add Comment
        </button>
      </form>
    </>
  );
};
export default CommentNew;
