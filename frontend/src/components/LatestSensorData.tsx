import React, {useEffect, useState} from "react";
import {fetchLatestSensorData} from "../api/remote-ac";
import {convertToFahrenheit} from "./remote-ac";
import {useRefresh} from "../hooks/useRefresh";
import {DhtSensorData} from "../types/DhtSensorData";

export function LatestSensorData() {
  const [data, setData] = useState<DhtSensorData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    fetchLatestSensorData().then((result) => setData(result));
  }

  useEffect(() => {
    if (data !== null) {
      setIsLoading(false);
    } else {
      fetchData();
    }
  }, [data]);

  useRefresh(fetchData)

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div id='current-temp'>
          Local Observations<br/>
          Temp: {convertToFahrenheit(data!.temp_c)}&deg;F ({data!.temp_c}&deg;C)<br/>
          Humidity: {data!.humidity}%<br/>
        </div>
      )}
    </>
  );
}
