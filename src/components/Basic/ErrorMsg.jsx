const ErrorMsg = ({ status, message }) => {
  return (
    <div>
      {status && <p>Error: {status}</p>}
      <p>Message: {message}</p>
    </div>
  );
};

export default ErrorMsg;
