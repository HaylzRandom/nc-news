import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../../styles/topics.css';

import { getTopics } from '../../api/api';
import Spinner from '../../components/Basic/Spinner';
import ErrorPage from '../Error/ErrorPage';

const TopicsPage = () => {
  /* 
    Get topics
    Map topics to links
    Set links to to to relevant articles with topic 
  */

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topics, setTopics] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getTopics()
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
  }, []);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorPage error={error} />;

  const url = '/articles?topic=';
  return (
    <section className='topics'>
      <h1 className='topics-heading'>Topics</h1>
      <nav className='topics-nav' aria-label='topics navigation'>
        {topics.map((topic) => {
          return (
            <Link
              key={topic.slug}
              to={`${url}${topic.slug}`}
              className='topics-link'
            >
              {topic.slug}
            </Link>
          );
        })}
      </nav>
    </section>
  );
};
export default TopicsPage;
