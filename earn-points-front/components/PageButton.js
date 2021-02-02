import React from 'react';
import PropTypes from 'prop-types';

const PageButton = (props) => {
  const { page, onChangePage, maxPageNumber } = props;

  return (
    <div>
      <button
        className={page === 1 ? 'invisible-page-btn' : 'visible-page-btn'}
        onClick={() => onChangePage('previous')}
      >
        {'<'}
      </button>
      <button
        className={page === maxPageNumber ? 'invisible-page-btn' : 'visible-page-btn'}
        onClick={() => onChangePage('next')}
      >
        {'>'}
      </button>
    </div>
  );
};

PageButton.propTypes = {
  page: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  maxPageNumber: PropTypes.number.isRequired,
};

export default PageButton;
