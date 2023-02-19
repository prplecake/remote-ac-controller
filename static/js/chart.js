async function getDhtData(limit) {
    await fetch('/api/dht/graph_data/?limit=' + limit)
        .then((response) => response.json())
        .then((data) => makeChart(data));
}

const CHART_TIMEFRAME_KEY = 'chartTimeframe';

function setChartTimeframe(tf){
    localStorage.setItem(CHART_TIMEFRAME_KEY, tf);
    void getDhtData(tf);
}

if (localStorage.getItem(CHART_TIMEFRAME_KEY) == null) {
    void getDhtData('3d');
} else {
    void getDhtData(localStorage.getItem(CHART_TIMEFRAME_KEY));
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
                        data: data.map(row => convertToFahrenheit(row.temp_c))
                    },
                    {
                        label: 'Humidity (%)',
                        data: data.map(row => row.humidity)
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        display: false
                    }
                }
            }
        }
    )
}
