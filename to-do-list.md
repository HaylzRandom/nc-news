# To Do List for NC-News

## Plan - [Link to Wireframe Plan](https://www.tldraw.com/s/v2_c__VcfW-h5qGtQHeXbDCFc6?viewport=-570%2C-53%2C1920%2C993&page=page%3AqM49GIWLyiO-lk1G4Oouo)

### User Stories

- [ ] User should be able to view a list of all articles
- [ ] User should be able to view an individual articles
- [ ] User should be able to view a list of all comments associated with an article
- [ ] User should be able to vote on an article
- [ ] User should be able to add a new comment to an existing article
- [ ] User should be able to see a list of topics that currently have articles
- [ ] User should be able to see a list of articles based on a topic
- [ ] User should be able to create a new article
- [ ] User should be able to delete their own article (not anyone else's)
- [ ] User should be able to create a new topic
- [ ] User should be able to sort an article by date
- [ ] User should be able to sort by comment count
- [ ] User should be able to sort by number of votes an article has
- [ ] User should be able to choose whether the order is in ascending or descending order
- [ ] User should be able to delete their own comments (not anyone else's)
- [ ] User should see appropriate error pages if they navigate to an incorrect page
- [ ] User should be notified if they have not provided enough information when posting a comment
- [ ] User should be able to see a list of users that exist

### [API](https://nc-news-api-ga04.onrender.com/api/)

- [ ] GET /articles
- [ ] POST /articles
- [ ] GET /articles/:article_id
- [ ] PATCH /articles/:article_id
- [ ] DELETE /articles/:article_id
- [ ] GET /articles/:article_id/comments
- [ ] POST /articles/:article_id/comments
- [ ] PATCH /comments/:comment_id
- [ ] DELETE /comments/:comment_id
- [ ] GET /users
- [ ] GET /users/:username
- [ ] GET /topics
- [ ] POST /topics

### Pages

- [ ] Homepage
- [ ] Articles
- [ ] Users
- [ ] Comments
- [ ] Article
- [ ] Topics
- [ ] Comment
- [ ] AddComment
- [ ] AddArticle
- [ ] User
- [ ] NotFound

### Components

- [ ] NavBar
- [ ] ArticlePreview
- [ ] ArticleDetail
- [ ] UserPreview
- [ ] UserDetail
- [ ] CommentPreview
- [ ] CommentDetail
- [ ] NewArticleForm
- [ ] NewCommentForm
- [ ] NewTopicForm
- [ ] Votes
- [ ] Error
- [ ] Spinner