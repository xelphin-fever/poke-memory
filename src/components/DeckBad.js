import React, { useState, useEffect } from 'react';
import Card from './Card';

const Deck = (props) => {
  console.log('Deck Rendered');
  const deckLength = 25;
  const [deck, setDeck] = useState(new Array(deckLength).fill(0)); // Remember 0 index invalid for API
  const [playing, setPlaying] = useState(true);
  const [currentCards, setCurrentCards] = useState([23, 19, 14]); // 1,2,3...26
  const [score, setScore] = useState(0);

  const pickFromUnChosen = () => {
    // Return Random Index from Deck : Has to be UnChosen ( == 0)
    let indexLeft = deck.map((chosen, index) => {
      if (chosen === 0) {
        return index + 1; // +1 : because 0 index invalid
      }
      return -1;
    });
    indexLeft = indexLeft.filter((index) => index !== -1);
    return indexLeft[Math.floor(Math.random() * indexLeft.length)];
  };

  const pickValidOption = (card, toBeCards) => {
    if (card === -1) {
      let chosen = 0;
      while (chosen === 0 || toBeCards.includes(chosen)) {
        chosen = Math.floor(Math.random() * deckLength) + 1;
      }
      console.log('returning chosen: ', chosen);
      return chosen;
    }
    console.log('returning valid: ', card);
    return card;
  };

  const createNewCurrentCards = () => {
    setCurrentCards([-1, -1, -1]);
    console.log('current cards are -1:', currentCards);
    // Make sure at least one option hasn't been picked already
    const notChosen = pickFromUnChosen();
    const placeNotChosen = Math.floor(Math.random() * 3);
    setCurrentCards((prevState) => {
      let currentCards = { ...prevState.currentCards };
      currentCards[placeNotChosen] = notChosen;
      return { currentCards };
    });
    console.log('current cards one unChosen placed:', currentCards);
    // Fill other two options randomly from deck (each has to be unique)
    setCurrentCards((prevState) => {
      let currentCards = { ...prevState.currentCards };
      let op1 = pickValidOption(currentCards[0], []);
      currentCards[0] = op1;
      let op2 = pickValidOption(currentCards[1], [op1]);
      currentCards[1] = op2;
      currentCards[2] = pickValidOption(currentCards[2], [op1, op2]);
      return { currentCards };
    });
    console.log('current cards: ', currentCards);
  };

  const playerSelected = (key) => {
    let pokeIndex = currentCards[key];
    console.log('Player clicked on Card: ', pokeIndex);
    if (deck[pokeIndex - 1] === 1) {
      setPlaying(false);
      console.log('Game Over');
    } else if (score === deckLength) {
      setPlaying(false);
      console.log('You Won!');
    } else {
      setDeck((prevState) => {
        let deck = { ...prevState.deck };
        deck[pokeIndex - 1] = 1;
        return { deck };
      });
      createNewCurrentCards();
    }
  };

  return (
    <div className="deck-div">
      <Card pokeIndex={currentCards[0]} handlerSelected={playerSelected} myKey="0" />
      <Card pokeIndex={currentCards[1]} handlerSelected={playerSelected} myKey="1" />
      <Card pokeIndex={currentCards[2]} handlerSelected={playerSelected} myKey="2" />
    </div>
  );
};

export default Deck;
