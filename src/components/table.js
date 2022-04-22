import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const Table = (props) => {
  const { title, lists = [], pageSize = 5, current = 1 } = props;
  const totalCount = lists.length;
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    setTableData(lists.slice((current - 1) * pageSize, current * pageSize));
  }, []);
  return (
    <div className="table">
      <h2>{title}</h2>

      <div className="lists">
        {tableData.map((item) => {
          return (
            <div>
              <div>
                <div>Amount</div>
                <div>Amount</div>
              </div>
              <div>
                <div>Fee</div>
                <div>{item.fee}</div>
              </div>
              <div>
                <div>Hash</div>
                <div>{item.hash}</div>
              </div>
              <div>
                <div>Date</div>
                <div>{dayjs(item.time * 1000).format('YYYY-MM-DD HH:mm')}</div>
              </div>
              <div>
                <div>From</div>
                <div>{item.fee}</div>
              </div>
              <div>
                <div>To</div>
                <div>{item.fee}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pagenation">{totalCount / pageSize}</div>
    </div>
  );
};

export default Table;
