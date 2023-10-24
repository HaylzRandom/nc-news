import { useEffect, useState, useContext } from 'react';

import { getCommentsForArticle } from '../../api/api';
import Spinner from '../Basic/Spinner';
import ErrorMsg from '../Basic/ErrorMsg';
import CommentDetails from './CommentDetails';
import CommentNew from './CommentNew';
import { UserContext } from '../../contexts/User';

const CommentList = ({ article_id }) => {
  const { user } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState(null);
  const [confirmMsg, setConfirmMsg] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getCommentsForArticle(article_id)
      .then((comments) => {
        setComments(comments);
        setError(null);
        setIsLoading(false);

        if (newComment) {
          setConfirmMsg('New comment added!');

          // Set the confirm message to disappear
          setTimeout(() => {
            setConfirmMsg(null);
          }, 5000);
        }
      })
      .catch(({ data: error }) => {
        setError({ status: error.status, msg: error.message });
        setIsLoading(false);
      });
  }, [article_id, newComment]);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMsg status={error.status} message={error.msg} />;
  return (
    <section className='comments'>
      {confirmMsg && user ? (
        <p>{confirmMsg}</p>
      ) : (
        // Unsure if this is the correct way to only display the form when a user is "logged in" i.e. user context has a user
        user && (
          <CommentNew
            article={article_id}
            setNewComment={setNewComment}
            user={user}
          />
        )
      )}

      <ul className='comment-list' role='list'>
        {comments.map((comment) => {
          return <CommentDetails key={comment.comment_id} comment={comment} />;
        })}
      </ul>
    </section>
  );
};

export default CommentList;
