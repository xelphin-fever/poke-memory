import React from 'react';
import '../stylesheets/messageBoard.css';

const MessageBoard = (props) => {
  const setDeck = () => {
    let input = document.querySelector('#input-deckLength');
    let value = input.value;
    if (value > 14 && value < 51) {
      props.updateDeck(value);
    }
  };

  return (
    <div className="message-div">
      <h2 className="message-title">{props.title}</h2>
      <h4 className="message-score">You got {props.score} Pokemon!</h4>
      <button onClick={props.reset} className="reset-btn">
        Reset Game
      </button>
      <div className="message-input-div">
        <h5>Change Amount of Cards</h5>
        <input
          type="number"
          id="input-deckLength"
          value={props.deckLength}
          min="15"
          max="50"
          placeholder={props.deckLength}
          onChange={setDeck}
        />
      </div>
    </div>
  );
};

export default MessageBoard;
