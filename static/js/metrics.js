function update_humidity_metric(metric, humidity) {
  let elem = document.getElementById('metrics_'+metric);
  humidity = humidity.toFixed(2);
  let htmlText = '';
  let htmlString = humidity + '&percnt;';
  htmlText += htmlString;
  elem.innerHTML = htmlText;
}

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

async function getDhtAvgHumidity() {
  await fetch('/api/dht/metrics/humidity_avg')
    .then((response) => response.json())
    .then((data) => update_humidity_metric('humidity_avg', data.humidity__avg));
}

async function getDhtHighHumidity() {
  await fetch('/api/dht/metrics/humidity_high')
    .then((response) => response.json())
    .then((data) => update_humidity_metric('humidity_high', data.humidity__max));
}

async function getDhtLowHumidity() {
  await fetch('/api/dht/metrics/humidity_low')
    .then((response) => response.json())
    .then((data) => update_humidity_metric('humidity_low', data.humidity__min));
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

function update_humidity() {
  void getDhtLowHumidity();
  void getDhtAvgHumidity();
  void getDhtHighHumidity();
}

function updateMetrics() {
  void update_temps();
  void update_humidity();
  setTimeout(updateMetrics, minuteInMiliseconds * 60);
}

updateMetrics();