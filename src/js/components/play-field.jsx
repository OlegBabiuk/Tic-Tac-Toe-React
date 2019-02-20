import React from 'react';
import ModalWindow from './modal-window';
import RowCells from './row-cells';

class PlayField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalWindowShow: false,
      // stepsHistory: [
      //   { row: 2, col: 2, player: X, },
      //   { row: 1, col: 1, player: O, },
      //   { row: 1, col: 3, player: X, },
      // ],
      // currentStep: {}
    };
    console.log(props);
  }

  handleClick() {
    this.setState();
  }

  render() {
    const { isModalWindowShow } = this.state;
    return (
      <div className="playField">
        <RowCells row="1" onClick={this.handleClick} />
        <RowCells row="2" onClick={this.handleClick} />
        <RowCells row="3" onClick={this.handleClick} />
        {isModalWindowShow ? <ModalWindow /> : ''}
      </div>
    );
  }
}

export default PlayField;
