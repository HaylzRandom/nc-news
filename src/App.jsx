import { Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import HomePage from './pages/Home/HomePage';
import Articles from './pages/Articles/ArticlesPage';
import ErrorPage from './pages/Error/ErrorPage';

// Components
import NavBar from './components/Persistent/NavBar';
import Header from './components/Persistent/Header';
import ArticleDetail from './components/Articles/ArticleDetail';
import TopicsPage from './pages/Topics/TopicsPage';
import UsersPage from './pages/Users/UsersPage';

const App = () => {
  return (
    <div>
      <header>
        <h1 className='header-heading'>NC News</h1>
        <NavBar />
        <Header />
      </header>
      <main id='main'>
        <Routes>
          <Route path='*' element={<ErrorPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/articles' element={<Articles />} />
          <Route path='/articles/:article_id' element={<ArticleDetail />} />
          <Route path='/topics' element={<TopicsPage />} />
          <Route path='/users' element={<UsersPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
