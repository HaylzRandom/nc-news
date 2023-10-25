import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const ArticlePreview = ({ article }) => {
  const {
    article_id,
    author,
    title,
    created_at,
    article_img_url,
    votes,
    comment_count,
  } = article;

  const created = format(new Date(created_at), 'dd/MM/yyyy');
  return (
    <article className='article-preview'>
      <img
        src={article_img_url}
        alt=''
        className='article-preview-preview-img'
      />
      <div className='article-preview-details'>
        <Link to={`/articles/${article_id}`} className='article-preview-title'>
          {title}
        </Link>
        <div className='article-preview-details_information'>
          <Link to={`/users/${author}`} className='article-preview-author'>
            {author}
          </Link>
          <p className='article-date'>{created}</p>
        </div>
        <p>Votes: {votes}</p>
        <p>Comments: {comment_count}</p>
      </div>
    </article>
  );
};

export default ArticlePreview;
