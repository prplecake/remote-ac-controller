async function getDhtData() {
    const response = await fetch('/api/dht/graph_data/');

    let data = await response.json();
    makeChart(data);
}

getDhtData();
function makeChart(data) {
    new Chart(
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
    return temp_c * (9 / 5) + 32
}