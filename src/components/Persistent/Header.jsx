import { useContext, useEffect, useState } from 'react';

import '../../styles/header.css';

import { UserContext } from '../../contexts/User';
import { getUserByUsername } from '../../api/api';
import Spinner from '../Basic/Spinner';
import UserHeader from './UserHeader';
import ErrorPage from '../../pages/Error/ErrorPage';

const Header = () => {
  const { user, setUser } = useContext(UserContext);

  const [newUser, setNewUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogin = () => {
    setNewUser('jessjelly');
  };

  useEffect(() => {
    setIsLoading(true);
    getUserByUsername(newUser)
      .then((user) => {
        setUser(user);
        setError(null);
        setIsLoading(false);
      })
      .catch(({ data: { error } }) => {
        setError({ status: error.status, msg: error.message });
        setIsLoading(false);
      });
  }, [newUser, setUser]);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorPage error={error} />;

  return (
    <div className='user-container'>
      {!user ? (
        <div className='user-login-container'>
          <h3>Want to log in?</h3>
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <UserHeader user={user} />
      )}
    </div>
  );
};

export default Header;
