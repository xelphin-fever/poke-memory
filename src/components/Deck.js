import React, { useState, useEffect } from 'react';
import Card from './Card';

const Deck = (props) => {
  console.log('Render Deck');
  console.log('length of deck is:', props.deckLength);
  const deckLength = props.deckLength;
  const [deck, setDeck] = useState(new Array(deckLength).fill(0)); // Remember 0 index invalid for API
  const [playing, setPlaying] = useState(true);
  const [currentCards, setCurrentCards] = useState([1, 2, 3]); // 1,2,3...26
  const [score, setScore] = useState(0);
  const incScore = () => {
    setScore(score + 1);
    props.updateScore(score + 1);
  };

  const pickFromUnChosen = (myDeck) => {
    // Return Random Index from Deck : Has to be UnChosen ( == 0)
    let deckCopy = [...myDeck];
    deckCopy = deckCopy.map((chosen, index) => {
      if (chosen === 0) {
        return index + 1; // +1 : because 0 index invalid
      }
      return -1;
    });
    console.log('index of UnChosens: ', deckCopy);
    deckCopy = deckCopy.filter((index) => index !== -1);
    console.log('index of UnChosens: ', deckCopy);
    if (deckCopy.length > 0) {
      return deckCopy[Math.floor(Math.random() * deckCopy.length)];
    }
    return Math.floor(Math.random() * deckCopy.length) + 1;
  };

  const pickValidOption = (card, toBeCards) => {
    if (card !== -1) {
      console.log('returning valid: ', card);
      return card;
    }
    let chosen = 0;
    while (chosen === 0 || toBeCards.includes(chosen)) {
      chosen = Math.floor(Math.random() * deckLength) + 1;
    }
    console.log('returning chosen: ', chosen);
    return chosen;
  };

  useEffect(() => {
    let chooseCards = [-1, -1, -1];
    const notChosen = pickFromUnChosen(deck);
    const placeNotChosen = Math.floor(Math.random() * 3);
    chooseCards[placeNotChosen] = notChosen;
    console.log('current cards one unChosen placed:', chooseCards);
    let arrayCollect = [notChosen];
    chooseCards = chooseCards.map((card) => {
      let option = pickValidOption(card, arrayCollect);
      arrayCollect.push(option);
      return option;
    });
    setCurrentCards(chooseCards);
  }, [deck]);

  const updateDeck = (pokeIndex) => {
    let deckCopy = [...deck];
    deckCopy[pokeIndex - 1] = 1;
    setDeck(deckCopy);
    console.log(deck);
  };

  useEffect(() => console.log('useEffect() current cards: ', currentCards));

  const cardClicked = (event) => {
    console.log('score', score);
    if (playing === true) {
      const pokeIndex = event.currentTarget.getAttribute('data-index');
      console.log('clicked card', pokeIndex);
      console.log(event.currentTarget);
      if (deck[pokeIndex - 1] === 1) {
        setPlaying(false);
        console.log('Game Over');
        console.log('score', score + 1);
        props.gameResult('lose');
      } else if (score === deckLength - 1) {
        incScore();
        setPlaying(false);
        console.log('You Won!');
        console.log('score', score + 1);
        props.gameResult('win');
      } else {
        incScore();
        updateDeck(pokeIndex);
      }
    }
  };

  return (
    <div className="deck-div">
      {currentCards.map((card) => {
        return <Card pokeIndex={card} handlerClicked={cardClicked} key={card} />;
      })}
    </div>
  );
};

export default Deck;
