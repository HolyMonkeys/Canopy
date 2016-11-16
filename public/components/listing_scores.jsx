import React from 'react';

const walkScore = ({ activeListing }) => {
  let newScore = activeListing.walkScore;
  newScore = JSON.parse(newScore);
  console.log('newscore', newScore);
  return (
    <div>
      <div className="walkScore">
        <div>
          <p>
            <a href={newScore.result.help_link}>
              <img src={newScore.result.logo_url}></img>
            </a>
            <a href={newScore.result.ws_link}>{newScore.result.walkscore} </a>
          </p>
        </div>
      </div>
      <div className="transitScore">
      </div>
    </div>
  );
};

export default walkScore;