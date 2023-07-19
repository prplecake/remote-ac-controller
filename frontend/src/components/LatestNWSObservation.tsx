import React, {useEffect, useState} from "react";
import {fetchLatestNWSObservation} from "../api/nws-api";
import {NWSObservation} from "../types/NWSObservation";
import {useRefresh} from "../hooks/useRefresh";
import {convertToFahrenheit, minuteInMiliseconds} from "./remote-ac";

export function LatestNWSObservation(props: { wxGridPoints: string, weatherStation: string }) {
  const [latestObservation, setLatestObservation] = useState<NWSObservation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function processNWSObservation(response: any) {
    const data = response.properties;
    setLatestObservation({
      temp_c: data.temperature.value,
      humidity: data.relativeHumidity.value,
    } as NWSObservation)
  }

  const fetchData = () => {
    if (props.weatherStation !== "") {
      fetchLatestNWSObservation(props.weatherStation).then(
        (response) => processNWSObservation(response)
      );
    }
  }

  useEffect(() => {
    if (latestObservation !== null) {
      setIsLoading(false);
    } else {
      fetchData();
    }
  }, [props.weatherStation, latestObservation])

  useRefresh(fetchData, minuteInMiliseconds * 60);

  console.log(latestObservation);

  return (
    <>
      {isLoading ? (
        <>
          Loading...
        </>
      ) : (
        <>
          NWS Observations ({props.weatherStation}):<br/>
          Temp: {convertToFahrenheit(latestObservation!.temp_c)}&deg;F<br/>
          RH: {latestObservation?.humidity.toFixed(0)}%
        </>
      )}
    </>
  )
}