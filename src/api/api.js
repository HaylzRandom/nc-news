import axios from 'axios';

const request = axios.create({
  baseURL: 'https://nc-news-api-ga04.onrender.com/api/',
});

// Articles

export const getAllArticles = () => {
  return request.get('/articles').then(({ data: { articles } }) => {
    return articles;
  });
};

export const getArticleById = (article_id) => {
  return request
    .get(`/articles/${article_id}`)
    .then(({ data: { article } }) => {
      return article;
    });
};
