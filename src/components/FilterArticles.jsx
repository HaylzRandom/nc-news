import { useState } from 'react';

const FilterArticles = ({ topics, setTopic, topic }) => {
  // TODO - Setup formData object to get filter queries
  const sortQueries = ['date', 'votes', 'author', 'article'];

  const [selectedTopic, setSelectedTopic] = useState(topic);
  const [selectedSortQuery, setSelectedSortQuery] = useState(sortQueries[3]);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
  };

  const handleSortChange = (e) => {
    setSelectedSortQuery(e.target.value);
  };

  const handleOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Boo!');
  };

  return (
    <>
      <h3>Filter Results</h3>
      <div className='query-container'>
        <form action='' onSubmit={handleSubmit}>
          <fieldset>
            <legend>Filter by Topic</legend>
            <label htmlFor='all-topics'>
              <input
                type='radio'
                name='all-topics'
                value='all'
                aria-label=''
                checked={selectedTopic === 'all'}
                onChange={handleTopicChange}
              />
              All
            </label>
            {topics.map((topic) => {
              const { slug } = topic;
              return (
                <label key={slug} htmlFor={slug}>
                  <input
                    type='radio'
                    value={slug}
                    id={slug}
                    checked={selectedTopic === slug}
                    onChange={handleTopicChange}
                  />
                  {slug}
                </label>
              );
            })}
          </fieldset>
          <fieldset>
            <legend>Sort By</legend>
            {sortQueries.map((sortQuery, idx) => {
              return (
                <label key={idx} htmlFor={sortQuery}>
                  <input
                    type='radio'
                    name={sortQuery}
                    id={sortQuery}
                    value={sortQuery}
                    checked={selectedSortQuery === sortQuery}
                    onChange={handleSortChange}
                  />
                  {sortQuery}
                </label>
              );
            })}
          </fieldset>
          <fieldset>
            <legend>Order By</legend>
            <label htmlFor='asc'>
              <input
                type='radio'
                name='asc'
                id='asc'
                value={'asc'}
                checked={sortOrder === 'asc'}
                onChange={handleOrderChange}
              />
              Ascending
            </label>
            <label htmlFor='desc'>
              <input
                type='radio'
                name='desc'
                id='desc'
                value='desc'
                checked={sortOrder === 'desc'}
                onChange={handleOrderChange}
              />
              Descending
            </label>
          </fieldset>
          <button type='submit'>Filter Results</button>
        </form>
      </div>
    </>
  );
};
export default FilterArticles;
