import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "reactstrap";
import {LatestSensorData} from "./LatestSensorData";
import {fetchWeatherStation, fetchWxGridPoints} from "../api/remote-ac";
import {LatestNWSObservation} from "./LatestNWSObservation";

export function Header() {
  const [weatherStation, setWeatherStation] = useState<string>("");
  const [wxGridPoints, setWxGridPoints] = useState<string>("");

  useEffect(() => {
    fetchWeatherStation().then(
      data => setWeatherStation(data.weather_station)
    );
    fetchWxGridPoints().then(
      data => setWxGridPoints(data.wx_grid_points)
    );
  }, [])

  return (
    <Container fluid>
      <header className='header'>
        <Row xs={1} md={2}>
          <Col>
        <p>remote-ac-controller</p>
          </Col>
          <Col xs={9}>
            <LatestNWSObservation
              weatherStation={weatherStation}
              wxGridPoints={wxGridPoints}
            />
          </Col>
        </Row>
        <LatestSensorData/>
      </header>
    </Container>
  );
}
