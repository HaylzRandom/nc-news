import { useEffect, useState, useContext } from 'react';

import '../../styles/comments.css';

import { getCommentsForArticle } from '../../api/api';

import Spinner from '../Basic/Spinner';
import CommentDetails from './CommentDetails';
import CommentNew from './CommentNew';
import MessageDisplay from '../Basic/MessageDisplay';
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
        if (error.code === 'ERR_NETWORK') {
          setError({
            message: 'No internet connection, please try again later',
          });
        } else {
          const { data, status } = error.response;
          setError({ status: status, message: data.msg });
        }
        setIsLoading(false);
        setCommentDeleted(null);
      });
  }, [article_id, newComment, commentDeleted]);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorPage error={error} />;
  return (
    <section className='comments'>
      {!user && (
        <>
          <p className='comment-login'>
            Want to add a comment? Make sure to login!
          </p>
          <hr />
        </>
      )}
      {confirmMsg && user ? (
        <MessageDisplay message={confirmMsg} />
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
        <>
          <hr />
          <p className='no-comments'>No comments found, want to add one?</p>
        </>
      )}
    </section>
  );
};

export default CommentList;
