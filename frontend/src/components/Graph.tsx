import {convertToFahrenheit, formatDate, minuteInMiliseconds} from './remote-ac';
import React, {useEffect, useState} from 'react';
import { fetchDhtData } from '../api';
import {Chart, ChartItem} from 'chart.js/auto';
import {Container} from 'react-bootstrap';
import {useRefresh} from '../hooks/useRefresh';
import {DhtSensorData} from '../types/DhtSensorData';

const CHART_TIMEFRAME_KEY = 'chartTimeframe';
let nextInterval = getNextInterval();

function setChartTimeframe(tf: string) {
  localStorage.setItem(CHART_TIMEFRAME_KEY, tf);
  updateChart();
}

if (localStorage.getItem(CHART_TIMEFRAME_KEY) == null) {
  void setChartTimeframe('3d');
} else {
  updateChart();
}

function getNextInterval() {
  const now = new Date();
  const millisTillNext =
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours() + 1,
      0,
      5,
      0
    ).getTime() - now.getTime();
  if (millisTillNext < 0) {
    getNextInterval();
  }
  return millisTillNext;
}

// Update chart every hour
setInterval(updateChart, nextInterval);

function updateChart() {
  fetchDhtData(localStorage.getItem(CHART_TIMEFRAME_KEY) as string)
    .then(data => makeChart(data));
  nextInterval = getNextInterval();
}

let chart: Chart;

function makeChart(data: Array<DhtSensorData>) {
  if (chart) {
    chart.destroy();
  }
  chart = new Chart(document.getElementById('chart') as ChartItem, {
    type: 'line',
    data: {
      labels: data.map((row) => formatDate(new Date(row.date))),
      datasets: [
        {
          label: 'Temp (F)',
          data: data.map((row) => convertToFahrenheit(row.temp_c) as unknown as number),
          yAxisID: 'y',
        },
        {
          label: 'Humidity (%)',
          data: data.map((row) => row.humidity),
          yAxisID: 'y1',
        },
      ],
    },
    options: {
      scales: {
        x: {
          display: false,
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          suggestedMax: 100,
          suggestedMin: 0,
        },
      },
      animation: false,
    },
  });
}

export function Graph() {
  const [isLoading, setIsLoading] = useState(true);
  const [chartMade, setChartMade] = useState(false);

  const fetchData = () => {
    fetchDhtData(localStorage.getItem(CHART_TIMEFRAME_KEY) as string).then((data) => {
      makeChart(data);
      setChartMade(true);
    });
  }

  useEffect(() => {
    if (chartMade) {
      setIsLoading(false);
    } else {
      fetchData();
    }
  }, [chartMade]);

  useRefresh(fetchData, minuteInMiliseconds * 60);

  return (
    <Container>
      <input
        type="button"
        onClick={() => setChartTimeframe('14d')}
        value="14 days"
      />
      <input
        type="button"
        onClick={() => setChartTimeframe('3d')}
        value="3 days"
      />
      <input
        type="button"
        onClick={() => setChartTimeframe('24h')}
        value="24 hours"
      />
      <input
        type="button"
        onClick={() => setChartTimeframe('12h')}
        value="12 hours"
      />
      <br />
      {isLoading ? <p>Loading...</p> : <></>}
      <canvas id="chart"></canvas>
    </Container>
  );
}
