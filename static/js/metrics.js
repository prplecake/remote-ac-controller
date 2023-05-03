function update_temp_metric(metric, temp_c) {
  let elem = document.getElementById('metrics_'+metric);
  let htmlText = '';
  let temp_f = convertToFahrenheit(temp_c);
  temp_c = temp_c.toFixed(0);
  let htmlString =
    temp_f +
    '&deg;F (' +
    temp_c +
    '&deg;C)';
  htmlText += htmlString;
  elem.innerHTML = htmlText;
}

async function getDhtAvgTemp() {
  await fetch('/api/dht/metrics/temp_avg')
    .then((response) => response.json())
    .then((data) => update_temp_metric('temp_avg', data.temp_c__avg));
}

async function getDhtHighTemp() {
  await fetch('/api/dht/metrics/temp_high')
    .then((response) => response.json())
    .then((data) => update_temp_metric('temp_high', data.temp_c__max));
}

async function getDhtLowTemp() {
  await fetch('/api/dht/metrics/temp_low')
    .then((response) => response.json())
    .then((data) => update_temp_metric('temp_low', data.temp_c__min));
}

function update_temps() {
  void getDhtLowTemp();
  void getDhtAvgTemp();
  void getDhtHighTemp();
}

function updateMetrics() {
  void update_temps();
  setTimeout(updateMetrics, minuteInMiliseconds * 60);
}

updateMetrics();