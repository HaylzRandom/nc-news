import { useEffect, useState } from 'react';

import '../../styles/articles.css';

import { getAllArticles, getTopics } from '../../api/api';

import ArticlePreview from '../../components/Articles/ArticlePreview';
import Spinner from '../../components/Basic/Spinner';
import ErrorMsg from '../../components/Basic/ErrorMsg';
import { useSearchParams } from 'react-router-dom';
import FilterArticles from '../../components/FilterArticles';

const Articles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState(null);
  const [topics, setTopics] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // console.log(searchParams);

  // Queries
  const topicQuery = searchParams.get('topic');

  const setTopic = (topic) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('topic', topic);
    setSearchParams(newParams);
  };

  useEffect(() => {
    setIsLoading(true);
    getAllArticles(topicQuery)
      .then((articles) => {
        setArticles(articles);
        return getTopics();
      })
      .then((topics) => {
        setTopics(topics);
        setError(null);
        setIsLoading(false);
      })
      .catch(({ data: error }) => {
        setError({ status: error.status, msg: error.message });
        setIsLoading(false);
      });
  }, [topicQuery]);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMsg status={error.status} message={error.msg} />;

  return (
    <section className='articles'>
      <h2 className='topic-heading'>
        {topicQuery ? `${topicQuery} Articles` : `All Articles`}
      </h2>
      <FilterArticles topics={topics} setTopic={setTopic} topic={topicQuery} />
      <div className='articles-container'>
        {articles.map((article) => {
          return <ArticlePreview key={article.article_id} article={article} />;
        })}
      </div>
    </section>
  );
};

export default Articles;
