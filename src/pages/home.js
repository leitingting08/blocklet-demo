import React, { useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import Table from '../components/table';

const Home = () => {
  const [searchParam, setSearchParam] = useState('');
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [info, setInfo] = useState(null);
  const [data, setData] = useState(null);
  const formatMoney = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const search = (value) => {
    setLoading(true);
    setNotFound(false);
    axios
      .get(`https://blockchain.info/rawblock/${value}`)
      .then((res) => {
        const result = res.data;
        if (result) {
          setData(result);
          setInfo({
            Hash: result.hash,
            Confirmations: `${formatMoney(70408)}`,
            Timestamp: dayjs(result.time * 1000).format('YYYY-MM-DD HH:mm'),
            Height: result.height,
            Miner: (
              <a href="https://www.blockchain.com/btc/address/3FZsNnE2PJfhaAeRRtsNijm9WpCv4xvkkz" className="app-link">
                Poolin
              </a>
            ),
            'Number of Transactions': result.n_tx,
            Difficulty: `${formatMoney(18670168558399.59)}`,
            'Merkle root': result.mrkl_root,
            Version: result.ver,
            Bits: formatMoney(result.bits),
            Weight: `${formatMoney(result.weight)} WU`,
            Size: `${formatMoney(result.size)} bytes`,
            Nonce: formatMoney(result.nonce),
            'Transaction Volume': '306.51676953 BTC',
            'Block Reward': '6.25000000 BTC',
            'Fee Reward': `${result.fee / 100000000} BTC`,
          });
        }
      })
      .catch(() => {
        setNotFound(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const onChange = (value) => {
    setSearchParam(value);
  };
  const onKeyDown = (e) => {
    if (e.keyCode === 13 && searchParam) {
      search(searchParam);
    }
  };

  const onSearch = () => {
    search(searchParam);
  };

  return (
    <div className="app-container">
      <div className="search">
        <input
          className="search_input"
          placeholder="Search TX, address, or block"
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => onKeyDown(e)}
          value={searchParam}
        />
        <button className="search_btn" type="button" onClick={onSearch}>
          <svg viewBox="0 0 512 512" className="search_svg" height="1.5rem" selectable="0" width="1.5rem">
            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
          </svg>
        </button>
      </div>
      {loading && (
        <h1 className="flex-center">
          Loading
          <div className="loading">
            <div />
            <div />
            <div />
          </div>
        </h1>
      )}
      {notFound && <h1>Item not found or argument invalid...</h1>}
      {data ? (
        <>
          <h2>{data?.block_index}</h2>
          <p className="part">
            This block was mined on {dayjs(data.time * 1000).format('YYYY-MM-DD HH:mm')} December 22, 2020 at 3:09 PM
            GMT+8 by Poolin. It currently has 70,408 confirmations on the Bitcoin blockchain.
          </p>
          <p className="part">
            The miner(s) of this block earned a total reward of 6.25000000 BTC ($265,942.50). The reward consisted of a
            base reward of 6.25000000 BTC ($265,942.50) with an additional 0.16583560 BTC ($7,056.44) reward paid as
            fees of the 912 transactions which were included in the block. The Block rewards, also known as the Coinbase
            reward, were sent to this address.
          </p>
          <p className="part">
            A total of 306.51676953 BTC ($13,042,533.76) were sent in the block with the average transaction being
            0.33609295 BTC ($14,301.02). Learn more about how blocks work.
          </p>
          {info &&
            Object.keys(info).map((key) => {
              return (
                <div className="block_table">
                  <div>{key}</div>
                  <div>{info[key]}</div>
                </div>
              );
            })}
        </>
      ) : null}
      {data?.tx && data.tx.length && <Table title="Block Transactions" lists={data.tx} />}
    </div>
  );
};

export default Home;
