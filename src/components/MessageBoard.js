import React from 'react';

const MessageBoard = (props) => {
  return (
    <div className="message-div">
      <h2 className="message-title">{props.title}</h2>
      <h4 className="message-score">You got {props.score} Pokemon!</h4>
      <button onClick={props.reset} className="reset-btn">
        Reset Game
      </button>
    </div>
  );
};

export default MessageBoard;
