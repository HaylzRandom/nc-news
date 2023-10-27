import { useState } from 'react';
// TODO - Pagination and Limit (default is limit of 10)
const FilterArticles = ({ topics, topic, sort, order, setParams }) => {
  const sortQueries = [
    { name: 'Date', value: 'created_at' },
    { name: 'Votes', value: 'votes' },
    { name: 'Author', value: 'author' },
  ];

  const [selectedTopic, setSelectedTopic] = useState(topic);
  const [selectedSortQuery, setSelectedSortQuery] = useState(sort);
  const [sortOrder, setSortOrder] = useState(order);

  const handleTopicChange = (e) => {
    if (e.target.value === 'all') setSelectedTopic(null);
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
    // If all topics is chosen
    if (selectedTopic === 'all-topics') {
      setParams(null, selectedSortQuery, sortOrder);
    } else {
      setParams(selectedTopic, selectedSortQuery, sortOrder);
    }
  };

  return (
    <section className='filter-articles'>
      <h3 className='filter-heading'>Filter Results</h3>
      <form onSubmit={handleSubmit} className='query-container'>
        <fieldset className='query-list'>
          <legend className='query-legend'>Filter by Topic</legend>
          <label htmlFor='all-topics' className='query-list_label'>
            <input
              type='radio'
              name='all-topics'
              value='all-topics'
              checked={selectedTopic === 'all-topics'}
              onChange={handleTopicChange}
            />
            All Topics
          </label>
          {topics.map((topic) => {
            const { slug } = topic;
            return (
              <label key={slug} htmlFor={slug} className='query-list_label'>
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
        <fieldset className='query-list sortBy'>
          <legend className='query-legend'>Sort By</legend>
          {sortQueries.map(({ name, value }) => {
            return (
              <label htmlFor={name} key={value}>
                <input
                  type='radio'
                  name={name}
                  id={name}
                  value={value}
                  checked={selectedSortQuery === value}
                  onChange={handleSortChange}
                />
                {name}
              </label>
            );
          })}
        </fieldset>
        <fieldset className='query-list orderBy'>
          <legend className='query-legend'>Order By</legend>
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
        </fieldset>
        <button type='submit' className='query-submit-btn'>
          Filter Results
        </button>
      </form>
    </section>
  );
};
export default FilterArticles;
