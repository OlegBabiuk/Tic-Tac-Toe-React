import React from 'react';

function ModalWindow() {
  return (
    <div className="modal">
      <h3 className="result">
        Player
        <span>{}</span>
        WIN
      </h3>
      <p>total score</p>
      <p>
        <span>X</span>
        {}
        vs
        {}
        <span>O</span>
      </p>
      <div>revenge</div>
    </div>
  );
}

export default ModalWindow;
