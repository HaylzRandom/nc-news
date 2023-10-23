import { useEffect, useState } from 'react';

import { getCommentsForArticle } from '../../api/api';
import Spinner from '../Basic/Spinner';
import ErrorMsg from '../Basic/ErrorMsg';
import CommentDetails from './CommentDetails';

const CommentList = ({ article_id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getCommentsForArticle(article_id)
      .then((comments) => {
        setComments(comments);
        setError(null);
        setIsLoading(false);
      })
      .catch(({ data: error }) => {
        setError({ status: error.status, msg: error.message });
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMsg status={error.status} message={error.msg} />;
  return (
    <ul className='comment-list' role='list'>
      {comments.map((comment) => {
        return <CommentDetails key={comment.comment_id} comment={comment} />;
      })}
    </ul>
  );
};

export default CommentList;
