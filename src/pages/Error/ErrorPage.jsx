import { useNavigate } from 'react-router-dom';

import '../../styles/error.css';

const ErrorPage = ({ error }) => {
  const navigate = useNavigate();

  return (
    <section className='error-page'>
      {error && (
        <>
          {error.status && <h1>Status: {error.status}</h1>}
          <p>Message: {error.message}</p>
          <button type='button' onClick={() => navigate(-1)}>
            Go Back
          </button>
        </>
      )}
      {/* If on page that does not exist */}
      {!error && (
        <>
          <h1 className='error-page_heading'>
            Sorry this page cannot be found!
          </h1>
          <p className='error-page_description'>
            Click below to go back to the homepage
          </p>
          <button
            type='button'
            onClick={() => navigate('/')}
            className='error-page_navigation'
          >
            Back Home
          </button>
        </>
      )}
    </section>
  );
};

export default ErrorPage;
