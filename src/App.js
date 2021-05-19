import React, { useState } from 'react';
import './App.css';
import ScoreBoard from './components/ScoreBoard';
import Deck from './components/Deck';

const App = (props) => {
  const [scoreArray, setScoreArray] = useState({
    currentScore: 0,
    topScore: 0,
    gamesPlayed: 0,
    gamesWon: 0,
  });
  let deckLength = 20;

  const setCurrentScore = (score) => {
    let scoreCopy = { ...scoreArray };
    scoreCopy.currentScore = score;
    if (score > scoreArray.topScore) {
      scoreCopy.topScore = score;
    }
    setScoreArray(scoreCopy);
    console.log('scoreBoard: ', scoreArray);
  };

  const setGameResults = (result) => {
    let scoreCopy = { ...scoreArray };
    if (result === 'win') {
      scoreCopy.gamesWon = scoreArray.gamesWon + 1;
    }
    scoreCopy.gamesPlayed = scoreArray.gamesPlayed + 1;
    setScoreArray(scoreCopy);
    console.log('scoreBoard: ', scoreArray);
  };

  return (
    <div className="app">
      <ScoreBoard scoreArray={scoreArray} />
      <div className="titleDiv">
        <h1 className="title">PokeMemory!</h1>
        <h4 className="subTitle">Don't Click On The Same Pokemon Twice ;)</h4>
      </div>
      <Deck deckLength={deckLength} updateScore={setCurrentScore} gameResult={setGameResults} />
    </div>
  );
};

export default App;
