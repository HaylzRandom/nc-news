import { Link } from 'react-router-dom';

import '../../styles/navBar.css';

const NavBar = () => {
  return (
    <nav className='nav' aria-label='primary'>
      <Link to='/' className='nav-link'>
        Home
      </Link>
      <Link to='/topics' className='nav-link'>
        Topics
      </Link>
      <Link to='/articles' className='nav-link'>
        Articles
      </Link>
      <Link to='/users' className='nav-link'>
        Users
      </Link>
    </nav>
  );
};

export default NavBar;
