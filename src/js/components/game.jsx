import React from 'react';
import PlayField from './play-field';
import NavPanel from './nav-panel';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      typeGame: '',
      player1: { win: 1, play: 'X' },
      player2: { win: 2, play: 'O' },
    };
  }

  handleClick(value) {
    if (value === 'restart') {
      this.setState(() => (
        {
          player1: { win: 0, play: 'X' },
          player2: { win: 0, play: 'O' },
        }
      ));
    } else {
      this.setState(() => (
        {
          typeGame: value,
        }
      ));
    }
  }

  render() {
    const gameData = { ...this.state };
    return (
      <div className="ticTacToe">
        <PlayField gameData={gameData} />
        <NavPanel onClick={this.handleClick} />
      </div>
    );
  }
}

export default Game;
