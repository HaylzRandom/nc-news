import '../../styles/spinner.css';

const Spinner = () => {
  return (
    <>
      <section className='spinner__overlay'>
        <p className='spinner__message'>Please wait...</p>
        <div className='spinner__container'></div>
      </section>
    </>
  );
};
export default Spinner;
