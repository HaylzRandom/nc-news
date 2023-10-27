import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

import '../styles/votes.css';

// TODO - Figure out how to reset the value of userVotes when no internet connection
// TODO - Limit voting only to those that are logged in
const Votes = ({ type, votes, update, message, progress, error }) => {
  const [userVotes, setUserVotes] = useState(0);
  const [voteSelection, setVoteSelection] = useState(null);

  const updateVotes = (value, vote) => {
    setUserVotes((currentVotes) => {
      return currentVotes + value;
    });
    update(value);
    setVoteSelection(vote);
  };

  if (progress) return <p className='votes-progress'>{progress}</p>;
  if (message)
    return <p className='votes-thanks'>Thanks for voting {voteSelection}!</p>;
  return (
    <div className='votes-container'>
      <p>
        <span className='votes-label'>{type}:</span> {votes + userVotes}
      </p>
      {!error ? (
        <div className='votes-btn-container'>
          {userVotes !== 1 && (
            <button
              aria-label='up vote'
              onClick={() => {
                updateVotes(1, 'positive');
              }}
              className='votes-btn thumbsUp'
              title='Thumbs Up'
            >
              <FontAwesomeIcon icon={faThumbsUp} />
            </button>
          )}
          {userVotes !== 1 && (
            <button
              aria-label='down vote'
              onClick={() => {
                updateVotes(-1, 'negative');
              }}
              className='votes-btn thumbsDown'
              title='Thumbs Down'
            >
              <FontAwesomeIcon icon={faThumbsDown} />
            </button>
          )}
        </div>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};

export default Votes;
