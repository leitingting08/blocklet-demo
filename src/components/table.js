import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const init = [1, 2, 3, 4, 5];
const Table = (props) => {
  const { title, lists, pageSize, current } = props;
  const totalCount = lists.length;
  const [tableData, setTableData] = useState([]);
  const [pageCur, setPageCur] = useState(current);
  const [pageArr, setPageArr] = useState(init);
  const changeCur = (cur) => {
    setTableData(lists.slice((cur - 1) * pageSize, cur * pageSize));
  };
  const onClick = (page) => {
    setPageCur(page);
    changeCur(page);
  };

  useEffect(() => {
    changeCur(pageCur);
    if (pageCur > 5) {
      const a = Math.floor((pageCur - 1) / 5);
      const newarr = init.map((i) => i + a * 5);
      setPageArr(newarr);
    }
  }, [pageCur]);
  return (
    <div className="table">
      <h2>{title}</h2>

      <div className="lists">
        {tableData.map((item) => {
          return (
            <div className="list">
              <div className="vertical">
                <div className="item">
                  <div>Amount</div>
                  <div>
                    <span className="amount">
                      {`${item.out && item.out.length ? item.out[0]?.value / 100000000 : 0 / 100000000} BTC`}
                    </span>
                  </div>
                </div>
                <div className="item">
                  <div>Fee</div>
                  <div>{`${item.fee / 100000000} BTC`}</div>
                </div>
              </div>

              <div className="vertical">
                <div className="item">
                  <div>Hash</div>
                  <div>
                    <a href={`https://www.blockchain.com/btc/tx/${item.hash}`} className="app-link">
                      {item.hash}
                    </a>
                  </div>
                </div>
                <div className="item">
                  <div>Date</div>
                  <div>{dayjs(item.time * 1000).format('YYYY-MM-DD HH:mm')}</div>
                </div>
              </div>
              <div className="vertical">
                <div className="item">
                  <div>From</div>
                  <div>
                    {item.inputs &&
                      item.inputs.length &&
                      item.inputs.map((subitem) => {
                        return (
                          <>
                            <div>
                              <a
                                href={`https://www.blockchain.com/btc/address/${subitem.prev_out.addr}`}
                                className="app-link">
                                {subitem.prev_out.addr}
                              </a>
                            </div>
                            <div>{`${subitem.prev_out.value / 100000000} BTC`}</div>
                          </>
                        );
                      })}
                  </div>
                </div>
                <div className="item">
                  <div>To</div>
                  <div>
                    {item.out &&
                      item.out.length &&
                      item.out.map((subitem) => {
                        return (
                          <>
                            <div>
                              <a href={`https://www.blockchain.com/btc/address/${subitem.addr}`} className="app-link">
                                {subitem.addr}
                              </a>
                            </div>
                            <div>{`${subitem.value / 100000000} BTC`}</div>
                          </>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pagenation">
        {pageCur > 1 && (
          <span className="page" onClick={() => setPageCur(pageCur - 1)}>
            {'<-'}
          </span>
        )}
        {pageCur > 10 && (
          <span className="page" onClick={() => setPageCur(pageCur - 10)}>
            -10
          </span>
        )}
        {pageArr.map((item) => {
          return (
            <span className={`page ${pageCur === item ? 'active' : ''}`} key={item} onClick={() => onClick(item)}>
              {item}
            </span>
          );
        })}
        {totalCount - pageCur * pageSize > 5 * pageSize && (
          <span className="page" onClick={() => setPageCur(pageCur + 10)}>
            +10
          </span>
        )}
        {totalCount / pageSize > 5 && (
          <span className="page" onClick={() => setPageCur(pageCur + 1)}>
            {'->'}
          </span>
        )}
      </div>
    </div>
  );
};

Table.propTypes = {
  title: PropTypes.string,
  lists: PropTypes.array,
  pageSize: PropTypes.number,
  current: PropTypes.number,
};

Table.defaultProps = {
  title: '',
  lists: [],
  pageSize: 5,
  current: 1,
};

export default Table;
