import React, { useEffect, useState } from 'react';
import { fetchLatestSensorData } from '../api';
import {convertToFahrenheit} from './remote-ac';
import {Col, Row} from 'react-bootstrap';

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
        <div id='current-temp'>
          <Row>
            <Col>
            Temp:
            </Col>
            <Col>{convertToFahrenheit(data.temp_c)}&deg;F ({data.temp_c}&deg;C)</Col>
          </Row>
          <Row>
            <Col>Humidity:</Col>
            <Col>{data.humidity}%</Col>
          </Row>
        </div>
      )}
    </>
  );
}
