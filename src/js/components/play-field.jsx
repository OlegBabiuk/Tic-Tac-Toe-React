/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ModalWindow from './modal-window';
import RowCells from './row-cells';

class PlayField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldSize: Array(3).fill(null),
      isModalWindowShow: false,
      player1: { win: 0, play: 'X' },
      player2: { win: 0, play: 'O' },
      currentSign: '?',
      stepsHistory: [
        {
          row: 2,
          col: 2,
          diagonalLeft: true,
          diagonalRight: true,
          player: 'X',
        },
        {
          row: 1,
          col: 1,
          diagonalLeft: true,
          diagonalRight: false,
          player: 'O',
        },
        {
          row: 1,
          col: 3,
          diagonalLeft: false,
          diagonalRight: true,
          player: 'X',
        },
      ],
    };

    this.handleClick = this.handleClick.bind(this);
    this.onClickRevenge = this.onClickRevenge.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { typeGame, restartGame } = newProps;

    if (restartGame) {
      this.clearHistiry();
    }
    if (typeGame === 'human') {
      this.play = this.twoPlayer;
    }
    if (typeGame === 'pc') {
      this.play = this.onePlayer;
    }
    if (!typeGame) {
      this.play = () => {};
    }
  }

  onClickRevenge() {
    this.setState({
      stepsHistory: [],
      isModalWindowShow: false,
    });
  }

  onePlayer(playCell) {
    const { stepsHistory, player1, player2 } = this.state;
    const currentStep = {
      row: playCell.row,
      col: playCell.col,
      diagonalLeft: playCell.diagonalLeft,
      diagonalRight: playCell.diagonalRight,
      player: player1.play,
    };
    const isfind = stepsHistory
      .some(step => (
        step.row === playCell.row
          && step.col === playCell.col
      ));

    if (!isfind) {
      this.setState(prevState => ({
        currentSign: player1.play,
        stepsHistory: [...prevState.stepsHistory, currentStep],
      }));

      setTimeout(() => {
        const { stepsHistory: newHistory } = this.state;
        this.checkWin({ ...playCell, newHistory, currentSign: player1.play });
        this.gameEnd();
      });
    }
    // реализовать ход PC
  }

  twoPlayer(playCell) {
    const { stepsHistory, player1, player2 } = this.state;
    const { length: stepsNumber } = stepsHistory;
    const currentSign = stepsNumber % 2 ? player2.play : player1.play;
    const currentStep = {
      row: playCell.row,
      col: playCell.col,
      diagonalLeft: playCell.diagonalLeft,
      diagonalRight: playCell.diagonalRight,
      player: currentSign,
    };
    const isfind = stepsHistory
      .some(step => (
        step.row === playCell.row
          && step.col === playCell.col
      ));

    if (!isfind) {
      this.setState(prevState => ({
        currentSign,
        stepsHistory: [...prevState.stepsHistory, currentStep],
      }));

      setTimeout(() => {
        const { stepsHistory: newHistory } = this.state;
        this.checkWin({ ...playCell, currentSign, newHistory });
        this.gameEnd();
      });
    }
  }

  play() {
    this.setState();
  }

  gameEnd() {
    setTimeout(() => {
      const { stepsHistory, isModalWindowShow } = this.state;
      if (stepsHistory.length === 9 && !isModalWindowShow) {
        this.setState({
          currentSign: '?', isModalWindowShow: true,
        });
      }
    });
  }

  checkWin(data) {
    const {
      row,
      col,
      diagonalLeft,
      diagonalRight,
      currentSign,
      newHistory,
    } = data;
    const routes = [{ row }, { col }, { diagonalLeft }, { diagonalRight }];
    routes.forEach((route) => {
      const resultArr = Object.entries(route);
      const stepArr = resultArr[0];
      const key = stepArr[0];
      const value = stepArr[1];
      const checkRoute = newHistory
        .filter(step => (step[key] === value ? value : ''));

      if (checkRoute.length === 3) {
        const flag = checkRoute.every(cell => cell.player === currentSign);
        if (flag) {
          this.setState((prevState) => {
            const user = prevState.player1.play === currentSign
              ? 'player1'
              : 'player2';
            const winCount = prevState[user].win + 1;

            return {
              isModalWindowShow: true,
              [user]: { win: winCount, play: currentSign },
            };
          });
        }
      }
    });
  }

  clearHistiry() {
    this.setState({
      stepsHistory: [],
      isModalWindowShow: false,
      player1: { win: 0, play: 'X' },
      player2: { win: 0, play: 'O' },
    });
  }

  handleClick(data) {
    this.play(data);
  }

  render() {
    const {
      isModalWindowShow,
      stepsHistory,
      fieldSize,
      player1,
      player2,
      currentSign,
    } = this.state;

    const rowCells = fieldSize
      .map((row, index) => {
        const numbRow = index + 1;
        return (
          <RowCells
            key={numbRow}
            row={numbRow}
            fieldSize={fieldSize}
            onClick={this.handleClick}
            steps={stepsHistory.filter(step => step.row === numbRow)}
          />
        );
      });
    const modalProps = {
      player1,
      player2,
      currentSign,
      onClickRevenge: this.onClickRevenge,
    };

    return (
      <div className="playField">
        {rowCells}
        {isModalWindowShow
          ? <ModalWindow {...modalProps} />
          : ''}
      </div>
    );
  }
}

PlayField.propTypes = {
  typeGame: PropTypes.string,
  restartGame: PropTypes.bool,
};

PlayField.defaultProps = {
  typeGame: 'human',
  restartGame: false,
};

export default PlayField;
