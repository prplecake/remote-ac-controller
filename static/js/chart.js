/* global Chart, formatDate, convertToFahrenheit */

async function getDhtData(limit) {
    await fetch('/api/dht/graph_data/?limit=' + limit)
        .then((response) => response.json())
        .then((data) => makeChart(data));
}

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
    let millisTillNext = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 5, 0) - now;
    if (millisTillNext < 0) {
        getNextInterval();
    }
    return millisTillNext;
}

// Update chart every hour
setInterval(updateChart, nextInterval);

function updateChart() {
    void getDhtData(localStorage.getItem(CHART_TIMEFRAME_KEY));
    nextInterval = getNextInterval();
}

let chart;

function makeChart(data) {
    if (chart) {
        chart.destroy();
    }
    chart = new Chart(
        document.getElementById('chart'),
        {
            type: 'line',
            data: {
                labels: data.map(row => formatDate(new Date(row.date))),
                datasets: [
                    {
                        label: 'Temp (F)',
                        data: data.map(row => convertToFahrenheit(row.temp_c)),
                        yAxisID: 'y'
                    },
                    {
                        label: 'Humidity (%)',
                        data: data.map(row => row.humidity),
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left'
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                    }
                },
                animation: false
            }
        }
    )
}
