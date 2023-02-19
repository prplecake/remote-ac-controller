async function getDhtData(limit) {
    const response = await fetch('/api/dht/graph_data/?limit=' + limit);

    let data = await response.json();
    makeChart(data);
}

const CHART_TIMEFRAME_KEY = 'chartTimeframe';

function setChartTimeframe(tf){
    localStorage.setItem(CHART_TIMEFRAME_KEY, tf);
    getDhtData(tf);
}

if (localStorage.getItem(CHART_TIMEFRAME_KEY) == null) {
    getDhtData('3d');
} else {
    getDhtData(localStorage.getItem(CHART_TIMEFRAME_KEY));
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
                labels: data.map(row => row.date),
                datasets: [
                    {
                        label: 'Temp (F)',
                        data: data.map(row => convert_to_fahrenheit(row.temp_c))
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
