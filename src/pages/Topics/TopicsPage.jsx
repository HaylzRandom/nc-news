import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../../styles/topics.css';

import { getTopics } from '../../api/api';
import Spinner from '../../components/Basic/Spinner';
import ErrorMsg from '../../components/Basic/ErrorMsg';

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
      .catch(({ data: { error } }) => {
        setError({ status: error.status, msg: error.message });
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMsg status={error.status} message={error.msg} />;

  const url = '/articles?topic=';
  return (
    <section className='topics'>
      <h1>Topics</h1>
      <ul role='nav' className='topics-nav'>
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
      </ul>
    </section>
  );
};
export default TopicsPage;
