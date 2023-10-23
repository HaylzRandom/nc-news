import { Link } from 'react-router-dom';

const ArticlePreview = () => {
  return (
    <article className='article'>
      <img src='https://robohash.org/article' alt='' className='article-img' />
      <div className='article-details'>
        <div className='article-details_left'>
          <Link to={`/article/article_id`} className='article-title'>
            Article Title
          </Link>
          <Link to={`/users/username`} className='article-author'>
            Username
          </Link>
        </div>
        <div className='article-details_right'>
          <p className='article-date'>Created at: 23/10/23</p>
        </div>
      </div>
    </article>
  );
};

export default ArticlePreview;
