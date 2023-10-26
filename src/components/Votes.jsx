import { useState } from 'react';

const Votes = ({ type, votes, update, message, progress, error }) => {
  const [userVotes, setUserVotes] = useState(0);

  const updateVotes = (value) => {
    setUserVotes((currentVotes) => {
      return currentVotes + value;
    });
    update(value);
  };

  if (progress) return <p>{progress}</p>;
  if (message) return <p>Thanks for the vote!</p>;
  return (
    <div>
      <p>
        {type}: {votes + userVotes}
      </p>
      {!error ? (
        <>
          <button
            disabled={userVotes === 1}
            aria-label='up vote'
            onClick={() => {
              updateVotes(1);
            }}
          >
            +
          </button>
          <button
            disabled={userVotes === -1}
            aria-label='up vote'
            onClick={() => {
              updateVotes(-1);
            }}
          >
            -
          </button>
        </>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};

export default Votes;
