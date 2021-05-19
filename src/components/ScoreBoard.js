import React from 'react';
import '../stylesheets/scoreBoard.css';

const ScoreBoard = (props) => {
  console.log('Score Board Rendered');

  return (
    <div className="scoreBoard">
      {/* prettier-ignore */}
      <h3> Current Score: <span>{props.scoreArray.currentScore}</span></h3>
      <h3> Top Score: <span>{props.scoreArray.topScore}</span></h3>
      <h3> Games Played: <span>{props.scoreArray.gamesPlayed}</span></h3>
      <h3> Games Won: <span>{props.scoreArray.gamesWon}</span></h3>
    </div>
  );
  
};

export default ScoreBoard;
