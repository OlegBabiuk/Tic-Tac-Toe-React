import React from 'react';
import PropTypes from 'prop-types';
import ColCell from './col-cell';

function RowCells(props) {
  const { row, onClick } = props;
  const className = `row row${row}`;
  return (
    <div className={className}>
      <ColCell row={row} col="1" onClick={onClick} />
      <ColCell row={row} col="2" onClick={onClick} />
      <ColCell row={row} col="3" onClick={onClick} />
    </div>
  );
}

RowCells.propTypes = {
  row: PropTypes.string,
  onClick: PropTypes.func,
};

RowCells.defaultProps = {
  row: '0',
  onClick: () => console.log("onClick didn't pass"),
};

export default RowCells;
