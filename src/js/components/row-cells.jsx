/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ColCell from './col-cell';

function RowCells(props) {
  const {
    row, onClick, steps, fieldSize,
  } = props;
  const className = `row row${row}`;
  const colCells = fieldSize
    .map((col, index) => {
      const numbCol = index + 1;
      return (
        <ColCell
          key={numbCol}
          row={row}
          col={numbCol}
          onClick={onClick}
          steps={
            steps.filter(step => step.col === numbCol)
          }
          diagonalLeft={numbCol === row}
          diagonalRight={numbCol === (4 - row)}
        />
      );
    });

  return (
    <div className={className}>
      { colCells }
    </div>
  );
}

RowCells.propTypes = {
  row: PropTypes.number,
  onClick: PropTypes.func,
  steps: PropTypes.array,
  fieldSize: PropTypes.array,
};

RowCells.defaultProps = {
  row: 0,
  steps: [],
  fieldSize: [null, null, null],
  onClick: () => console.log("onClick didn't pass"),
};

export default RowCells;
