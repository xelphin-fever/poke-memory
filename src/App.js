import React, { useState } from 'react';
import './App.css';
import ScoreBoard from './components/ScoreBoard';
import Deck from './components/Deck';
import MessageBoard from './components/MessageBoard';

const App = (props) => {
  const [scoreArray, setScoreArray] = useState({
    currentScore: 0,
    topScore: 0,
    gamesPlayed: 0,
    gamesWon: 0,
  });
  let deckLength = 20;
  const [gameReset, setGameReset] = useState(false);
  const [gameWin, setGameWin] = useState(false);

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
      scoreCopy.currentScore = scoreArray.currentScore + 1;
      scoreCopy.topScore = scoreArray.topScore + 1;
      setGameWin(true);
    }
    scoreCopy.gamesPlayed = scoreArray.gamesPlayed + 1;
    setScoreArray(scoreCopy);
    console.log('scoreBoard: ', scoreArray);
    function wait() {
      setGameReset(true);
    }
    setTimeout(wait, 2000);
  };

  const reset = () => {
    function wait() {
      setGameReset(false);
      setGameWin(false);
    }
    setTimeout(wait, 200);
  };

  return (
    <div className="app">
      <ScoreBoard scoreArray={scoreArray} />
      <div className="titleDiv">
        <h1 className="title">PokeMemory!</h1>
        <h4 className="subTitle">Don't Click On The Same Pokemon Twice ;)</h4>
      </div>
      {gameReset === false ? (
        <Deck deckLength={deckLength} updateScore={setCurrentScore} gameResult={setGameResults} />
      ) : (
        <MessageBoard
          title={gameWin ? 'You Won!' : 'Maybe Next Time'}
          score={scoreArray.currentScore}
          reset={reset}
        />
      )}
    </div>
  );
};

export default App;
