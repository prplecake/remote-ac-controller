import React, { useEffect, useState } from 'react';
import { fetchLatestSensorData } from '../api';
import {convertToFahrenheit} from './remote-ac';

export function LatestSensorData() {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLatestSensorData().then((result) => setData(result));
  }, []);

  useEffect(() => {
    if (data !== undefined) {
      setIsLoading(false);
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>
            Temp: {convertToFahrenheit(data.temp_c)}&deg;F ({data.temp_c}&deg;C)
          </p>
          <p>Humidity: {data.humidity}%</p>
        </>
      )}
    </>
  );
}
