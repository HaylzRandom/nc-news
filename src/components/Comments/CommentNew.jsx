import { useState } from 'react';

import { addComment } from '../../api/api';
import ErrorMsg from '../Basic/ErrorMsg';

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
        setNewComment(null);
        setError({ status: error.status, msg: error.message });
        setProcessing(false);
      });
  };

  if (error) return <ErrorMsg status={error.status} message={error.msg} />;
  if (processing) return <p>Creating Comment...</p>;
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='body'>Comment:</label>
        <textarea
          name='body'
          id='body'
          cols='30'
          rows='10'
          placeholder='Enter comment here...'
          onChange={handleChange}
          value={body}
          required
        ></textarea>
        <button type='submit'>Add Comment</button>
      </form>
    </>
  );
};
export default CommentNew;
