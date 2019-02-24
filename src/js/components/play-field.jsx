/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ModalWindow from './modal-window';
import RowCells from './row-cells';

class PlayField extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.typeGame !== prevState.typeGame) {
      return {
        typeGame: nextProps.typeGame,
      };
    }

    if (nextProps.restartGame !== prevState.restartGame) {
      return {
        restartGame: nextProps.restartGame,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      fieldSize: Array(3).fill(null),
      isModalWindowShow: false,
      typeGame: null,
      restartGame: null,
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

  componentDidUpdate(prevProps) {
    const { typeGame } = this.state;
    const { restartGame } = this.props;
    if (restartGame !== prevProps.restartGame) {
      this.clearHistiry();
    }
    if (typeGame !== prevProps.typeGame) {
      console.log('typeGame:', typeGame);
      this.allCells = this.generateAllCells();
    }
  }

  onClickRevenge() {
    this.setState({
      stepsHistory: [],
      isModalWindowShow: false,
    });
  }

  onePlayer(playCell) {
    const { stepsHistory, player1 } = this.state;
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
      this.setState(
        prevState => ({
          currentSign: player1.play,
          stepsHistory: [...prevState.stepsHistory, currentStep],
        }),
        () => {
          const { stepsHistory: newHistory } = this.state;
          const winer = this.checkWin({
            ...playCell,
            currentSign: player1.play,
            newHistory,
          });
          if (winer) {
            this.gameOver(winer);
          } else {
            this.pcStep();
          }
        },
      );
    }
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
    const isFind = stepsHistory
      .some(step => (
        step.row === playCell.row
          && step.col === playCell.col
      ));

    if (!isFind) {
      this.setState(
        prevState => ({
          currentSign,
          stepsHistory: [...prevState.stepsHistory, currentStep],
        }),
        () => {
          const { stepsHistory: newHistory } = this.state;
          const winer = this.checkWin({ ...playCell, currentSign, newHistory });
          this.gameOver(winer);
        },
      );
    }
  }

  pcStep() {
    const { stepsHistory, player1, player2 } = this.state;
    const emptyCells = this.allCells
      .filter((cell) => {
        const findCell = stepsHistory.find(step => (
          step.row === cell.row
          && step.col === cell.col
        ));
        return !findCell;
      });
    const attackStep = this.possibleWin({
      stepsHistory, emptyCells, playSign: player2.play,
    });
    const defenseStep = this.possibleWin({
      stepsHistory, emptyCells, playSign: player1.play,
    });
    const bestStep = this.bestStep({ emptyCells, playSign: player2.play });
    const randomStep = this.randomStep({ emptyCells, playSign: player2.play });
    const nextStep = attackStep || defenseStep || bestStep || randomStep;
    this.setState((prevState => (
      {
        currentSign: player2.play,
        stepsHistory: [...prevState.stepsHistory, nextStep],
      }
    )),
    () => {
      const { stepsHistory: newHistory } = this.state;
      const winer = this.checkWin(
        { ...nextStep, newHistory },
      );
      this.gameOver(winer);
    });
  }

  possibleWin(data) {
    const { player2 } = this.state;
    const { stepsHistory, emptyCells, playSign } = data;
    let result = null;
    emptyCells.forEach((cell) => {
      const duplicateHistory = [...stepsHistory];
      const newStep = { ...cell, currentSign: playSign, player: playSign };
      duplicateHistory.push(newStep);
      const winer = this.checkWin({ ...newStep, newHistory: duplicateHistory });
      if (winer) {
        result = { ...newStep, currentSign: player2.play, player: player2.play };
      }
    });
    return result;
  }

  bestStep(data) {
    const { emptyCells, playSign } = data;
    const { fieldSize } = this.state;
    const centerIndex = Math.ceil(fieldSize.length / 2);
    const newStep = emptyCells.filter((cell) => {
      const isFind = (cell.row === centerIndex && cell.col === centerIndex)
        || (cell.row === centerIndex - 1 && cell.col === centerIndex - 1)
        || (cell.row === centerIndex - 1 && cell.col === centerIndex + 1)
        || (cell.row === centerIndex + 1 && cell.col === centerIndex - 1)
        || (cell.row === centerIndex + 1 && cell.col === centerIndex + 1);
      return isFind;
    });
    if (!newStep[0]) {
      return null;
    }
    return { ...newStep[0], currentSign: playSign, player: playSign };
  }

  // eslint-disable-next-line class-methods-use-this
  randomStep(data) {
    const { emptyCells, playSign } = data;
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return {
      ...emptyCells[randomIndex], currentSign: playSign, player: playSign,
    };
  }

  generateAllCells() {
    const { fieldSize } = this.state;
    const baseReversNumber = fieldSize.length + 1;
    let allCells = [];

    fieldSize.forEach((row, index) => {
      const numbRow = index + 1;
      const cells = fieldSize.map((col, i) => {
        const numbCol = i + 1;
        return {
          row: numbRow,
          col: numbCol,
          diagonalLeft: numbCol === numbRow,
          diagonalRight: numbCol === (baseReversNumber - numbRow),
        };
      });
      allCells = [...allCells, ...cells];
    });
    return allCells;
  }

  play(data) {
    const { typeGame } = this.state;
    if (typeGame === 'human') {
      this.twoPlayer(data);
    }

    if (typeGame === 'pc') {
      this.onePlayer(data);
    }
  }

  gameOver(winer) {
    const { fieldSize, stepsHistory: newHistory } = this.state;
    const numberOfAllCells = fieldSize.length ** 2;
    let result = winer;
    if (newHistory.length >= numberOfAllCells && !winer) {
      result = { currentSign: 'draw' };
      this.setState({
        ...result,
        isModalWindowShow: true,
      });
    }
    if (winer) {
      this.setState({
        ...result,
        isModalWindowShow: true,
      });
    }
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
    const { fieldSize, player1 } = this.state;
    const numberCellsToCheck = fieldSize.length;
    let winer = null;

    routes.forEach((route) => {
      const resultArr = Object.entries(route);
      const { 0: key, 1: value } = resultArr[0];
      const checkRoute = newHistory
        .filter(step => (step[key] === value ? value : ''));

      if (checkRoute.length === numberCellsToCheck) {
        const flag = checkRoute.every(cell => cell.player === currentSign);
        if (flag) {
          const user = player1.play === currentSign
            ? 'player1'
            : 'player2';
          // eslint-disable-next-line react/destructuring-assignment
          const winCount = this.state[user].win + 1;
          winer = {
            [user]: { win: winCount, play: currentSign },
          };
        }
      }
    });
    return winer;
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
