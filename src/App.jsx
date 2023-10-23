import { Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import HomePage from './pages/Home/HomePage';
import Articles from './pages/Articles/ArticlesPage';
import NotFound from './pages/Error/NotFoundPage';

// Components
import NavBar from './components/Persistent/NavBar';
import Header from './components/Persistent/Header';
import ArticleDetail from './components/Articles/ArticleDetail';

const App = () => {
  return (
    <div>
      <header>
        <NavBar />
        <Header />
      </header>
      <main>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/articles' element={<Articles />} />
          <Route path='/articles/:article_id' element={<ArticleDetail />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
