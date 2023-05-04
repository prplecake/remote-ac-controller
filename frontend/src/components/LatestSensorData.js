import React, { useEffect, useState } from 'react';
import { fetchLatestSensorData } from '../api';

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

  let temp_f = 0;
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>
            Temp: {temp_f}&deg;F ({data.temp_c}&deg;C)
          </p>
          <p>Humidity: {data.humidity}%</p>
        </>
      )}
    </>
  );
}
