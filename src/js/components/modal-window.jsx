/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

function ModalWindow(props) {
  const {
    player1,
    player2,
    currentSign,
    onClickRevenge,
  } = props;
  return (
    <div className="modal">
      <h3 className="result">
        Player
        <span>{currentSign}</span>
        WIN
      </h3>
      <p>total score</p>
      <p>
        <span>{player1.play}</span>
        {player1.win}
        <b>vs</b>
        {player2.win}
        <span>{player2.play}</span>
      </p>
      <div
        onClick={onClickRevenge}
      >
        revenge
      </div>
    </div>
  );
}

ModalWindow.propTypes = {
  player1: PropTypes.object,
  player2: PropTypes.object,
  currentSign: PropTypes.string,
  onClickRevenge: PropTypes.func,
};

ModalWindow.defaultProps = {
  player1: {},
  player2: {},
  currentSign: '???',
  onClickRevenge: () => console.log("onClickRevenge didn't pass"),
};

export default ModalWindow;
