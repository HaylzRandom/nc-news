import axios from 'axios';

const request = axios.create({
  baseURL: 'https://nc-news-api-ga04.onrender.com/api/',
});

// Articles

export const getAllArticles = (sortBy, topic = null, order) => {
  return request
    .get('articles', {
      params: {
        sort_by: sortBy,
        topic,
        order,
      },
    })
    .then(({ data: { articles } }) => {
      return articles;
    });
};

export const getArticleById = (article_id) => {
  return request.get(`articles/${article_id}`).then(({ data: { article } }) => {
    return article;
  });
};

export const updateArticleVote = (article_id, vote_count) => {
  return request
    .patch(`articles/${article_id}`, {
      inc_votes: vote_count,
    })
    .then(({ data: { article } }) => {
      return article;
    });
};

// Comments

export const getCommentsForArticle = (article_id) => {
  return request
    .get(`articles/${article_id}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};

export const addComment = (body, article_id, username) => {
  return request
    .post(`articles/${article_id}/comments`, {
      body,
      article_id,
      username,
    })
    .then(({ data: { comment } }) => {
      return comment;
    });
};

export const updateCommentVote = (comment_id, comment_count) => {
  return request
    .patch(`comments/${comment_id}`, {
      inc_votes: comment_count,
    })
    .then(({ data: { comment } }) => {
      return comment;
    });
};

// Users
export const getUserByUsername = (username) => {
  return request.get(`users/${username}`).then(({ data: { user } }) => {
    return user;
  });
};

// Topics
export const getTopics = () => {
  return request.get('topics').then(({ data: { topics } }) => {
    return topics;
  });
};
