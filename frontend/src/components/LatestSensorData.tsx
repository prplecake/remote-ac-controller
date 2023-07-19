import React, {useEffect, useState} from "react";
import {fetchLatestSensorData} from "../api/remote-ac";
import {convertToFahrenheit} from "./remote-ac";
import {Col, Row} from "reactstrap";
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
          <Row>
            <Col>
              Temp:
            </Col>
            <Col>{convertToFahrenheit(data!.temp_c)}&deg;F ({data!.temp_c}&deg;C)</Col>
          </Row>
          <Row>
            <Col>Humidity:</Col>
            <Col>{data!.humidity}%</Col>
          </Row>
        </div>
      )}
    </>
  );
}
