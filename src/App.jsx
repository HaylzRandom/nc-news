import { Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import HomePage from './pages/Home/HomePage';
import Articles from './pages/Articles/ArticlesPage';
import NotFound from './pages/Error/NotFoundPage';

// Components
import NavBar from './components/Persistent/NavBar';
import UserHeader from './components/Persistent/UserHeader';

const App = () => {
  return (
    <div>
      <header>
        <NavBar />
        <UserHeader />
      </header>
      <main>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/articles' element={<Articles />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
