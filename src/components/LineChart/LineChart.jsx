import React, { useMemo } from 'react';
import Chart from 'react-google-charts';

const LineChart = ({ historicalData }) => {
  const data = useMemo(() => {
    const dataCopy = [["Date", "Prices"]];
    if (historicalData?.prices) {
      historicalData.prices.forEach((item) => {
        dataCopy.push([new Date(item[0]), item[1]]);
      });
    }
    return dataCopy;
  }, [historicalData]);

  return (
    <Chart
      chartType='LineChart'
      data={data}
      height="100%"
      legendToggle
    />
  );
};

export default LineChart;
