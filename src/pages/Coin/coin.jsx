import React, { useContext, useEffect, useState } from 'react';
import './coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/coinContext';
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {
  const { coinId } = useParams();
  const { allCurrency } = useContext(CoinContext); 
  const [coinData, setCoinData] = useState(null); 
  const [historicalData, setHistoricalData] = useState(null); 

  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-ptbYDUVqTsiYMTAQVPukPuH9',
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${allCurrency.name}&days=10&interval=daily`,
        options
      );
      const data = await response.json();
      setHistoricalData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-ptbYDUVqTsiYMTAQVPukPuH9',
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        options
      );
      const data = await response.json();
      setCoinData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [allCurrency, coinId]); 

  if (coinData && historicalData) {
    const price = coinData.market_data?.current_price[allCurrency.name];

    return (
      <div className='coin'>
        <div className="coin-name">
          <img src={coinData.image.large} alt="" />
          <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
        </div>

        <div className='coin-chart'>
          <LineChart historicalData={historicalData} />
        </div>

        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Crypto Price</li>
            <li>{allCurrency.symbol} {coinData.market_data.current_price[allCurrency.name]?.toLocaleString()}</li>
          </ul>
          <ul>
            <li>Market Volume</li>
            <li>{allCurrency.symbol} {coinData.market_data.total_volume[allCurrency.name]?.toLocaleString()}</li>
          </ul>
          <ul>
            <li>24Hr High</li>
            <li>{allCurrency.symbol} {coinData.market_data.high_24h[allCurrency.name]?.toLocaleString()}</li>
          </ul>
          <ul>
            <li>24Hr Low</li>
            <li>{allCurrency.symbol} {coinData.market_data.low_24h[allCurrency.name]?.toLocaleString()}</li>
          </ul>
        </div>

      </div>
    );
  } else {
    return (
      <div className='spinner'>
        <div className='spin'></div>
      </div>
    );
  }
};

export default Coin;
