import { useState } from 'react';

const Votes = ({ type, votes, update, error }) => {
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
        <p>Voting Unavailable!</p>
      )}
    </div>
  );
};

export default Votes;
