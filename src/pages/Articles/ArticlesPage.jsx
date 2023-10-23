import { useEffect, useState } from 'react';

import '../../styles/articles.css';

import { getAllArticles } from '../../api/api';

import ArticlePreview from '../../components/Articles/ArticlePreview';
import Spinner from '../../components/Basic/Spinner';
import ErrorMsg from '../../components/Basic/ErrorMsg';

const Articles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getAllArticles()
      .then((articles) => {
        setArticles(articles);
        setError(null);
        setIsLoading(false);
      })
      .catch(({ data: error }) => {
        setError({ status: error.status, msg: error.message });
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMsg status={error.status} message={error.msg} />;

  return (
    <section className='articles'>
      <h2>Topic Articles</h2>
      <h3>Filter Results</h3>
      <div className='query-container'>
        {/* TODO - Choose by topic */}
        {/* TODO - Choose what to sort by */}
        {/* TODO - Choose if ascending or descending */}
      </div>
      <div className='articles-container'>
        {articles.map((article) => {
          return <ArticlePreview key={article.article_id} article={article} />;
        })}
      </div>
    </section>
  );
};

export default Articles;
