import { convertToFahrenheit, formatDate } from './remote-ac';
import React, { useEffect, useState } from 'react';
import { fetchDhtData } from '../api';
import { Chart } from 'chart.js/auto';

const CHART_TIMEFRAME_KEY = 'chartTimeframe';
let nextInterval = getNextInterval();

function setChartTimeframe(tf) {
  localStorage.setItem(CHART_TIMEFRAME_KEY, tf);
  updateChart();
}

if (localStorage.getItem(CHART_TIMEFRAME_KEY) == null) {
  void setChartTimeframe('3d');
} else {
  updateChart();
}

function getNextInterval() {
  let now = new Date();
  let millisTillNext =
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours() + 1,
      0,
      5,
      0
    ) - now;
  if (millisTillNext < 0) {
    getNextInterval();
  }
  return millisTillNext;
}

// Update chart every hour
setInterval(updateChart, nextInterval);

function updateChart() {
  void fetchDhtData(localStorage.getItem(CHART_TIMEFRAME_KEY));
  nextInterval = getNextInterval();
}

let chart;

function makeChart(data) {
  if (chart) {
    chart.destroy();
  }
  chart = new Chart(document.getElementById('chart'), {
    type: 'line',
    data: {
      labels: data.map((row) => formatDate(new Date(row.date))),
      datasets: [
        {
          label: 'Temp (F)',
          data: data.map((row) => convertToFahrenheit(row.temp_c)),
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

  useEffect(() => {
    fetchDhtData(localStorage.getItem(CHART_TIMEFRAME_KEY)).then((data) => {
      makeChart(data);
      setChartMade(true);
    });
  }, []);

  useEffect(() => {
    if (chartMade) {
      setIsLoading(false);
    }
  }, [chartMade]);

  return (
    <>
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
    </>
  );
}