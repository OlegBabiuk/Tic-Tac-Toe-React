/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

function ColCell(props) {
  const { row, col, onClick } = props;
  const className = `col col${col}`;
  return (
    <div
      className={className}
      onClick={() => {
        onClick({ row, col });
      }}
    >
      {}
    </div>
  );
}

ColCell.propTypes = {
  col: PropTypes.string,
  row: PropTypes.string,
  onClick: PropTypes.func,
};

ColCell.defaultProps = {
  col: '0',
  row: '0',
  onClick: () => console.log("onClick didn't pass"),
};

export default ColCell;
