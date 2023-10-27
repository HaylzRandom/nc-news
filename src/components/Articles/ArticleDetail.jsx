import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';

import { getArticleById, updateArticleVote } from '../../api/api';

// Components
import Spinner from '../Basic/Spinner';
import CommentList from '../Comments/CommentList';
import Votes from '../Votes';
import ErrorPage from '../../pages/Error/ErrorPage';

const ArticleDetail = () => {
  const { article_id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [article, setArticle] = useState(null);
  const [formatDate, setFormatDate] = useState(null);

  const [updateError, setUpdateError] = useState(null);
  const [updateMsg, setUpdateMsg] = useState(null);
  const [updateProgress, setUpdateProgress] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then((article) => {
        setArticle(article);
        setFormatDate(format(new Date(article.created_at), 'dd/MM/yyyy'));
        setError(null);
        setIsLoading(false);
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
      });
  }, [article_id]);

  const updateArticle = (value) => {
    setUpdateProgress('Please wait, processing vote...');
    updateArticleVote(article_id, value)
      .then((article) => {
        setUpdateMsg(article);
        setUpdateError(null);
        setUpdateProgress(null);

        // Set the confirm message to disappear
        setTimeout(() => {
          setUpdateMsg(null);
        }, 2500);
      })
      .catch((error) => {
        console.log(error.response);
        setUpdateProgress(null);
        if (error.code === 'ERR_NETWORK') {
          setUpdateError('Internet Issues, please try again later!');
        } else {
          setUpdateError('Something went wrong, try again later!');
        }
      });
  };

  if (isLoading) return <Spinner />;
  if (error) return <ErrorPage error={error} />;
  return (
    <section className='article'>
      <article className='article-detail'>
        <div className='article-detail_container'>
          <h4 className='article-detail_title'>{article.title}</h4>
          <Link
            className='article-detail_topic'
            to={`/articles?topic=${article.topic}`}
            title={`See more articles from ${article.topic}`}
          >
            {article.topic}
          </Link>
        </div>

        <img
          src={article.article_img_url}
          alt=''
          className='article-detail_img'
        />
        <div className='article-detail_container'>
          <Link className='article-detail_author' to={`/users/username`}>
            By {article.author}
          </Link>
          <p className='article-detail_date'>{formatDate}</p>
        </div>

        <p className='article-detail_body'>{article.body}</p>
        <hr />
        <div className='article-detail_container '>
          <Votes
            type={'Votes'}
            votes={article.votes}
            update={updateArticle}
            message={updateMsg}
            progress={updateProgress}
            error={updateError}
          />
          <p>{article.comment_count} Comments</p>
        </div>
        {/* <CommentList article_id={article_id} /> */}
      </article>
    </section>
  );
};

export default ArticleDetail;
