import { convertToFahrenheit, minuteInMiliseconds } from "./remote-ac";
import React from "react";
import {
  fetchDhtAvgHumidity,
  fetchDhtAvgTemp,
  fetchDhtHighHumidity,
  fetchDhtHighTemp,
  fetchDhtLowHumidity,
  fetchDhtLowTemp,
} from "../api/remote-ac";
import {Col, Container, Row} from "reactstrap";
import {useRefresh} from "../hooks/useRefresh";

function update_humidity_metric(metric: string, value: number) {
  const elem = document.getElementById("metrics_" + metric);
  const humidity = value.toFixed(2);
  let htmlText = " ";
  const htmlString = humidity + "&percnt;";
  htmlText += htmlString;
  elem!.innerHTML = htmlText;
}

function update_temp_metric(metric: string, value: number) {
  const elem = document.getElementById("metrics_" + metric);
  let htmlText = " ";
  const temp_f = convertToFahrenheit(value);
  const temp_c = value.toFixed(0);
  const htmlString = temp_f + "&deg;F (" + temp_c + "&deg;C)";
  htmlText += htmlString;
  elem!.innerHTML = htmlText;
}

function update_temps() {
  fetchDhtLowTemp().then((data) =>
    update_temp_metric("temp_low", data.temp_c__min)
  );
  fetchDhtAvgTemp().then((data) =>
    update_temp_metric("temp_avg", data.temp_c__avg)
  );
  fetchDhtHighTemp().then((data) =>
    update_temp_metric("temp_high", data.temp_c__max)
  );
}

function update_humidity() {
  fetchDhtLowHumidity().then((data) =>
    update_humidity_metric("humidity_low", data.humidity__min)
  );
  fetchDhtAvgHumidity().then((data) =>
    update_humidity_metric("humidity_avg", data.humidity__avg)
  );
  fetchDhtHighHumidity().then((data) =>
    update_humidity_metric("humidity_high", data.humidity__max)
  );
}

function updateMetrics() {
  void update_temps();
  void update_humidity();
  setTimeout(updateMetrics, minuteInMiliseconds * 60);
}

updateMetrics();

export function Metrics() {

  useRefresh(updateMetrics)

  return (
    <Container>
      <h3>Data History</h3>
      <Row>
        <Col>
          <Row>
            <Col>
              Lowest Temp:
            </Col>
            <Col md="auto" className="text-end">
              <span id="metrics_temp_low"></span>
            </Col>
          </Row>
          <Row>
            <Col>Average Temp:</Col>
            <Col md="auto" className="text-end"><span id="metrics_temp_avg"></span></Col>
          </Row>
          <Row>
            <Col>High Temp:</Col>
            <Col md="auto" className="text-end"><span id="metrics_temp_high"></span></Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col>Lowest Humidity:</Col>
            <Col md="auto" className="text-end"><span id="metrics_humidity_low"></span></Col>
          </Row>
          <Row>
            <Col>Average Humidity:</Col>
            <Col md="auto" className="text-end"><span id="metrics_humidity_avg"></span></Col>
          </Row>
          <Row>
            <Col>Highest Humidity:</Col>
            <Col md="auto" className="text-end"><span id="metrics_humidity_high"></span></Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
