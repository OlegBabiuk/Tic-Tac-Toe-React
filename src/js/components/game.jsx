import React from 'react';
import PlayField from './play-field';
import NavPanel from './nav-panel';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      restartGame: false,
      typeGame: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(value) {
    if (value === 'restart') {
      this.setState(
        { restartGame: true, typeGame: '' },
      );
    }
    if (value === 'pc' || value === 'human') {
      this.setState(
        {
          typeGame: value,
          restartGame: false,
        },
      );
    }
  }

  render() {
    const { typeGame, restartGame } = this.state;
    return (
      <div className="ticTacToe">
        <PlayField typeGame={typeGame} restartGame={restartGame} />
        <NavPanel onClick={this.handleClick} />
      </div>
    );
  }
}

export default Game;
