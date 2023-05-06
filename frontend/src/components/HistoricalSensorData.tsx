import React, {useEffect, useState} from 'react';
import {fetchHistoricalSensorData} from '../api';
import {convertToFahrenheit, formatDate} from './remote-ac';
import {useRefresh} from '../hooks/useRefresh';
import {DhtSensorData} from '../types/DhtSensorData';

export function HistoricalSensorData() {
  const [data, setData] = useState<Array<DhtSensorData>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    fetchHistoricalSensorData().then((result) => setData(result));
  }

  useEffect(() => {
    if (data !== undefined) {
      setIsLoading(false);
    } else {
      fetchData();
    }
  }, [data]);

  useRefresh(fetchData);

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
