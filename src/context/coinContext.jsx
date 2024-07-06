import React, { createContext, useEffect, useState } from 'react';

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [allCurrency, setAllCurrency] = useState({
    name: 'INR',
    symbol: '₹',
  });
  const [loading, setLoading] = useState(false);

  const fetchAllCoin = async () => {
    setLoading(true);
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-ptbYDUVqTsiYMTAQVPukPuH9',
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${allCurrency.name}`,
        options
      );
      const data = await response.json();
      setAllCoin(data);
    } catch (err) {
      console.error('Error fetching coins:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCoin();
  }, [allCurrency]);

  const contextValue = {
    allCoin,
    allCurrency,
    setAllCurrency,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {loading ? <div>Loading...</div> : props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
