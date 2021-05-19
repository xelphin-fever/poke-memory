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

  return (
    <div className="app">
      <ScoreBoard scoreArray={scoreArray} />
      <div className="titleDiv">
        <h1 className="title">PokeMemory!</h1>
        <h4 className="subTitle">Don't Click On The Same Pokemon Twice ;)</h4>
      </div>
      <Deck />
    </div>
  );
};

export default App;
