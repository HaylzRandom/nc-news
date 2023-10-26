import { useEffect, useState, useContext } from 'react';

import { getCommentsForArticle } from '../../api/api';
import Spinner from '../Basic/Spinner';
import CommentDetails from './CommentDetails';
import CommentNew from './CommentNew';
import { UserContext } from '../../contexts/User';
import ErrorPage from '../../pages/Error/ErrorPage';

const CommentList = ({ article_id }) => {
  const { user } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState(null);
  const [commentDeleted, setCommentDeleted] = useState(null);
  const [confirmMsg, setConfirmMsg] = useState(null);

  // TODO - Need to update number of comments on articles when new/delete comment happens without lots of re-renders
  useEffect(() => {
    setIsLoading(true);
    getCommentsForArticle(article_id)
      .then((comments) => {
        if (newComment) {
          setConfirmMsg('New comment added!');

          // Set the confirm message to disappear
          setTimeout(() => {
            setConfirmMsg(null);
            setNewComment(null);
          }, 2500);
        }

        setComments(comments);
        setError(null);
        setIsLoading(false);
        setCommentDeleted(null);
      })
      .catch((error) => {
        console.log(error);
      });
    // .catch(({ data: error }) => {
    //   setError({ status: error.status, msg: error.message });
    //   setIsLoading(false);
    //   setCommentDeleted(null);
    // });
  }, [article_id, newComment, commentDeleted]);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorPage error={error} />;
  return (
    <section className='comments'>
      {!user && <p>Want to add a comment? Make sure to login!</p>}
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
      {comments.length > 0 ? (
        <ul className='comment-list' role='list'>
          {comments.map((comment) => {
            return (
              <CommentDetails
                key={comment.comment_id}
                comment={comment}
                user={user}
                setCommentDeleted={setCommentDeleted}
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
