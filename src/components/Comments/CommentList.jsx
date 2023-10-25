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
  const [commentDeleted, setCommentDeleted] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getCommentsForArticle(article_id)
      .then((comments) => {
        setComments(comments);
        setError(null);
        setIsLoading(false);
        setCommentDeleted(false);
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
  }, [article_id, newComment, commentDeleted]);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMsg status={error.status} message={error.msg} />;
  return (
    <section className='comments'>
      {confirmMsg && user ? (
        <p>{confirmMsg}</p>
      ) : (
        user && (
          <CommentNew
            article={article_id}
            setNewComment={setNewComment}
            user={user}
          />
        )
      )}
      {comments ? (
        <ul className='comment-list' role='list'>
          {comments.map((comment) => {
            return (
              <CommentDetails
                key={comment.comment_id}
                comment={comment}
                user={user}
                commentDeleted={setCommentDeleted}
              />
            );
          })}
        </ul>
      ) : (
        <p className='no-comments'>No comments found, want to add one?</p>
      )}
    </section>
  );
};

export default CommentList;
