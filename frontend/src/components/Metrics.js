import { convertToFahrenheit, minuteInMiliseconds } from './remote-ac';
import React from 'react';
import {
  fetchDhtAvgHumidity,
  fetchDhtAvgTemp,
  fetchDhtHighHumidity,
  fetchDhtHighTemp,
  fetchDhtLowHumidity,
  fetchDhtLowTemp,
} from '../api';

function update_humidity_metric(metric, humidity) {
  let elem = document.getElementById('metrics_' + metric);
  humidity = humidity.toFixed(2);
  let htmlText = ' ';
  let htmlString = humidity + '&percnt;';
  htmlText += htmlString;
  elem.innerHTML = htmlText;
}

function update_temp_metric(metric, temp_c) {
  let elem = document.getElementById('metrics_' + metric);
  let htmlText = ' ';
  let temp_f = convertToFahrenheit(temp_c);
  temp_c = temp_c.toFixed(0);
  let htmlString = temp_f + '&deg;F (' + temp_c + '&deg;C)';
  htmlText += htmlString;
  elem.innerHTML = htmlText;
}

function update_temps() {
  fetchDhtLowTemp().then((data) =>
    update_temp_metric('temp_low', data.temp_c__min)
  );
  fetchDhtAvgTemp().then((data) =>
    update_temp_metric('temp_avg', data.temp_c__avg)
  );
  fetchDhtHighTemp().then((data) =>
    update_temp_metric('temp_high', data.temp_c__max)
  );
}

function update_humidity() {
  fetchDhtLowHumidity().then((data) =>
    update_humidity_metric('humidity_low', data.humidity__min)
  );
  fetchDhtAvgHumidity().then((data) =>
    update_humidity_metric('humidity_avg', data.humidity__avg)
  );
  fetchDhtHighHumidity().then((data) =>
    update_humidity_metric('humidity_high', data.humidity__max)
  );
}

function updateMetrics() {
  void update_temps();
  void update_humidity();
  setTimeout(updateMetrics, minuteInMiliseconds * 60);
}

updateMetrics();

export function Metrics() {
  return (
    <>
      <h3>Data History</h3>
      <p>
        Lowest Temp:
        <span id="metrics_temp_low"></span>
      </p>
      <p>
        Average Temp:
        <span id="metrics_temp_avg"></span>
      </p>
      <p>
        Highest Temp:
        <span id="metrics_temp_high"></span>
      </p>

      <hr />

      <p>
        Lowest Humidity:
        <span id="metrics_humidity_low"></span>
      </p>
      <p>
        Average Humidity:
        <span id="metrics_humidity_avg"></span>
      </p>
      <p>
        Highest Humidity:
        <span id="metrics_humidity_high"></span>
      </p>
    </>
  );
}
