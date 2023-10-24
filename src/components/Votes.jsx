import { useState } from 'react';

const Votes = ({ type, votes, update, message, error }) => {
  const [userVotes, setUserVotes] = useState(0);

  const updateVotes = (value) => {
    setUserVotes((currentVotes) => {
      return currentVotes + value;
    });
    update(value);
  };

  return (
    <div>
      <p>
        {type}: {votes + userVotes}
      </p>
      {message && <p>Thanks for the vote!</p>}
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
