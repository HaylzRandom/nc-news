const ErrorMsg = ({ status, message }) => {
  return (
    <div>
      <p>Error: {status}</p>
      <p>Message: {message}</p>
    </div>
  );
};

export default ErrorMsg;
