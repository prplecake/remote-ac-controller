import React, { useEffect, useState } from 'react';
import { fetchHistoricalSensorData } from '../api';
import { convertToFahrenheit, formatDate } from './remote-ac';

export function HistoricalSensorData() {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHistoricalSensorData().then((result) => setData(result));
  }, []);

  useEffect(() => {
    if (data !== undefined) {
      setIsLoading(false);
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <p>Loading historical data...</p>
      ) : (
        data.map((item, i) => (
          <p key={i}>
            {formatDate(new Date(item.date))} ::{' '}
            {convertToFahrenheit(item.temp_c)}&deg;F ({item.temp_c}&deg;C)
            Humidity: {item.humidity}%
          </p>
        ))
      )}
    </>
  );
}
