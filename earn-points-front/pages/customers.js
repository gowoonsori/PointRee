import React, { useCallback, useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';
import { customers } from '../reducers/custmers';

import DataTable from '../components/DataTable';
import useStyles from '../css/commonStyle';

const Customers = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const customersData = useRecoilValue(customers);
  const [loading, setLoading] = useState(false);

  const onChangePage = useCallback(
    (btn) => {
      let p = page;
      p += btn === 'previous' ? -1 : +1;
      setPage(p);
    },
    [setPage, page]
  );
  useEffect(() => {
    console.log(page);
  });

  return (
    <div className="table-container">
      <DataTable
        page={page}
        onChangePage={onChangePage}
        className=""
        pagination={true}
        rows={customersData}
        columns={[
          { field: 'telephone', headerName: '전화번호' },
          { field: 'name', headerName: '이름' },
          { field: 'total', headerName: '총 포인트' },
        ]}
        pageSize={10}
        rowCount={10}
        loading={loading}
      />
    </div>
  );
};

export default Customers;
