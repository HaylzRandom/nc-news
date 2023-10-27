import { useContext, useEffect, useState } from 'react';

import '../../styles/header.css';

import { UserContext } from '../../contexts/User';
import { getUserByUsername } from '../../api/api';
import SmallSpinner from '../Basic/SmallSpinner';
import UserHeader from './UserHeader';
import ErrorPage from '../../pages/Error/ErrorPage';
import ErrorMsg from '../Basic/ErrorMsg';

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
      .catch((error) => {
        if (error.code === 'ERR_NETWORK') {
          setError({
            message: 'No internet connection, please try again later',
          });
        } else {
          const { data, status } = error.response;
          setError({ status: status, message: data.msg });
        }
        setIsLoading(false);
      });
  }, [newUser, setUser]);

  if (isLoading) return <SmallSpinner />;
  if (error) return <ErrorMsg status={error.status} message={error.message} />;

  return (
    <div className='user-container'>
      {!user ? (
        <div className='user-login-container'>
          <h2>Want to log in?</h2>
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <UserHeader user={user} />
      )}
    </div>
  );
};

export default Header;
