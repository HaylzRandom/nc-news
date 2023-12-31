# NC News

### Project Summary

A React frontend web application that utilises a custom [News API](https://github.com/HaylzRandom/nc-news-api). Users can do the following:

- Access a collection of articles
- Filter selection of articles by a number of queries
  - Topic
  - Sort By
    - Created Date
    - Number of votes an article has
    - Who wrote the article
  - Order By Ascending/Descending

### Live Demo

[NC News Live Link](https://nc-news-haylzrandom.netlify.app/articles)

### Tech Stack

![React](	https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

### API

[NC News API GitHub](https://github.com/HaylzRandom/nc-news-api)

[NC News API Public](https://nc-news-api-ga04.onrender.com/api/)

### To Run Locally

Clone to own computer:

`git clone https://github.com/HaylzRandom/nc-news.git`

`cd nc-news`

Run in terminal:

`npm install`

`npm run dev`

### Roadmap

- [ ] Home Page
- [ ] Users Page
- [ ] Styled Not Found page
- [ ] Styled Error component
- [ ] Allow new user to be created
- [ ] Limit pages to certain users roles e.g. Admin role
- [ ] Allow admins to create new topics
- [ ] Limit votes to users that are logged in
- [ ] Limit votes to only allows users to vote once per article/comment
- [ ] Allow admins to manage user accounts / own user can update account
- [ ] Allow deletion of articles (Own users / Admin User)
- [ ] Make navigation on mobile view to be more nicely styled
- [ ] Implement a light/dark mode
- [ ] Improve accessibility across whole entire site