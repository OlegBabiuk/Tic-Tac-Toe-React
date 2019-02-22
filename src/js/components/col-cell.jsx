/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

function ColCell(props) {
  const {
    row,
    col,
    onClick,
    steps,
    diagonalLeft,
    diagonalRight,
  } = props;
  const { 0: step } = steps;
  const className = `col col${col}`;
  return (
    <div
      className={className}
      onClick={() => {
        onClick({
          row, col, diagonalLeft, diagonalRight,
        });
      }}
    >
      {(step ? step.player : '')}
    </div>
  );
}

ColCell.propTypes = {
  col: PropTypes.number,
  row: PropTypes.number,
  steps: PropTypes.array,
  diagonalLeft: PropTypes.bool,
  diagonalRight: PropTypes.bool,
  onClick: PropTypes.func,
};

ColCell.defaultProps = {
  col: 0,
  row: 0,
  diagonalLeft: false,
  diagonalRight: false,
  steps: [],
  onClick: () => console.log("onClick didn't pass"),
};

export default ColCell;
