async function getDhtData(limit) {
    const response = await fetch('/api/dht/graph_data/?limit=' + limit);

    let data = await response.json();
    makeChart(data);
}

getDhtData('3d');

let chart;

function makeChart(data) {
    if (chart) { chart.destroy(); }
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

function convert_to_fahrenheit(temp_c) {
    return (temp_c * (9 / 5) + 32).toFixed(1)
}