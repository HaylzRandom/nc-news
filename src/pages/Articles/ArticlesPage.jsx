import { useEffect, useState } from 'react';

import '../../styles/articles.css';

import { getAllArticles, getTopics } from '../../api/api';

import ArticlePreview from '../../components/Articles/ArticlePreview';
import Spinner from '../../components/Basic/Spinner';
import { useSearchParams } from 'react-router-dom';
import FilterArticles from '../../components/Articles/FilterArticles';
import ErrorPage from '../Error/ErrorPage';
import useTitle from '../../hooks/useTitle';

const Articles = () => {
  useTitle('Articles');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState(null);
  const [topics, setTopics] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Queries
  const topicQuery = searchParams.get('topic');
  const sortByQuery = searchParams.get('sort_by');
  const orderQuery = searchParams.get('order');

  const setParams = (topic, sort, order) => {
    const newParams = new URLSearchParams(searchParams);

    if (topic === null) {
      newParams.delete('topic');
      newParams.set('sort_by', sort);
      newParams.set('order', order);
    } else {
      newParams.set('topic', topic);
      newParams.set('sort_by', sort);
      newParams.set('order', order);
    }

    setSearchParams(newParams);
  };

  useEffect(() => {
    setIsLoading(true);
    getAllArticles(sortByQuery, topicQuery, orderQuery)
      .then((articles) => {
        setArticles(articles);
        return getTopics();
      })
      .then((topics) => {
        setTopics(topics);
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
  }, [topicQuery, sortByQuery, orderQuery]);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorPage error={error} />;

  return (
    <section className='articles'>
      <h2 className='topic-heading'>
        {topicQuery ? `${topicQuery} Articles` : `All Articles`}
      </h2>
      <FilterArticles
        topics={topics}
        topic={topicQuery ?? 'all-topics'}
        sort={sortByQuery ?? 'created_at'}
        order={orderQuery ?? 'desc'}
        setParams={setParams}
      />
      <div className='articles-container'>
        {articles.map((article) => {
          return <ArticlePreview key={article.article_id} article={article} />;
        })}
      </div>
    </section>
  );
};

export default Articles;
