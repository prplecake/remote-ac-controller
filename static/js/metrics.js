function update_metric(metric, data) {
  let elem = document.getElementById(metric);
  let htmlText = '';
  let date = formatDate(new Date(data.date));
  let temp_f = convertToFahrenheit(data.temp_c);
  let temp_c = data.temp_c.toFixed(0);
  let htmlString =
    '<p>' +
    temp_f +
    '&deg;F (' +
    temp_c +
    '&deg;C) on ' +
    date +
    '</p>';
  htmlText += htmlString;
  elem.innerHTML = htmlText;
}

function updateLowTemp(data) {
  update_metric("low_temp", data);
}

async function getDhtLowTemp() {
  await fetch('/api/dht/metrics/temp_low')
    .then((response) => response.json())
    .then((data) => updateLowTemp(data));
}

function updateMetrics() {
  void getDhtLowTemp();
  setTimeout(updateMetrics, minuteInMiliseconds * 60);
}

updateMetrics();