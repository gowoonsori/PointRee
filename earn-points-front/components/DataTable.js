import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import PageButton from './PageButton';

const DataTable = (props) => {
  const { page, onChangePage, className, pagination, rows, columns, pageSize, rowCount, loading } = props;

  const dataSize = rows?.length;
  const maxPageNumber = dataSize % pageSize > 0 ? parseInt(dataSize / pageSize) + 1 : parseInt(dataSize / pageSize);

  return (
    <table className={className.customersTable}>
      <thead className="customer-table-thead">
        <th></th>
        {columns.map((column) => {
          return <th id={column.DataTable}>{column.headerName}</th>;
        })}
      </thead>
      {pagination ? (
        <tbody>
          {rows.slice((page - 1) * 10, (page - 1) * 10 + rowCount).map((row, index) => {
            return (
              <tr id={row.id}>
                <td>{index + 1}</td>
                <td>{row.telephone}</td>
                <td>{row.name}</td>
                <td>{row.total}</td>
              </tr>
            );
          })}
        </tbody>
      ) : (
        <tbody>
          {rows.map((row, index) => {
            return (
              <tr id={row.id}>
                <td>{index + 1}</td>
                <td>{row.telephone}</td>
                <td>{row.name}</td>
                <td>{row.total}</td>
              </tr>
            );
          })}
        </tbody>
      )}
      <tfoot>
        <p>
          {page}/{maxPageNumber}
        </p>
        <PageButton page={page} onChangePage={onChangePage} maxPageNumber={maxPageNumber} />
      </tfoot>
    </table>
  );
};

DataTable.propTypes = {
  page: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  className: PropTypes.object.isRequired,
  pagination: PropTypes.bool.isRequired,
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  pageSize: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default DataTable;
