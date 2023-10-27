import useTitle from '../../hooks/useTitle';

import '../../styles/home.css';

const HomePage = () => {
  useTitle('Home');
  return (
    <section className='home'>
      <h2 className='home-heading'>Home Page</h2>
      <p className='home-message'>Coming Soon... 👀</p>
    </section>
  );
};

export default HomePage;
