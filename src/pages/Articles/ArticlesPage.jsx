import ArticlePreview from '../../components/Articles/ArticlePreview';

import '../../styles/articles.css';

const Articles = () => {
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
        <ArticlePreview />
        <ArticlePreview />
        <ArticlePreview />
        <ArticlePreview />
        <ArticlePreview />
        <ArticlePreview />
      </div>
    </section>
  );
};

export default Articles;
