function convertToFahrenheit(temp_c) {
  return (temp_c * (9 / 5) + 32).toFixed(1);
}

const minuteInMiliseconds = 60000;

async function getLatestSensorData() {
  await fetch('/api/dht/get_current')
    .then((response) => response.json())
    .then((data) => updateLatestData(data))
    .catch((error) => {
      if (error instanceof SyntaxError) {
        console.log(error);
      } else {
        console.error(error);
      }
    });
}

async function getHistoricalSensorData() {
  await fetch('/api/dht/historical_data')
    .then((response) => response.json())
    .then((data) => updateHistoricalData(data));
}

function updateLatestData(data) {
  let elem = document.getElementById('latest-sensor-data');
  let htmlText;
  if (data.error !== '') {
    htmlText = '<p>' + data.error + '</p>';
  } else {
    let temp_f = convertToFahrenheit(data.temp_c);
    let temp_c = data.temp_c.toFixed(0);
    let humidity = data.humidity.toFixed(2);
    htmlText =
      '<p>Temp: ' +
      temp_f +
      '&deg;F (' +
      temp_c +
      '&deg;C)</p>' +
      '<p>Humidity: ' +
      humidity +
      '&percnt;</p>';
  }
  elem.innerHTML = htmlText;
}

function updateHistoricalData(data) {
  let elem = document.getElementById('historical-sensor-data');
  let htmlText = '';
  data.forEach((item) => {
    let date = formatDate(new Date(item.date));
    let temp_f = convertToFahrenheit(item.temp_c);
    let temp_c = item.temp_c.toFixed(0);
    let humidity = item.humidity.toFixed(2);
    let htmlString =
      '<p>' +
      date +
      ' :: ' +
      temp_f +
      '&deg;F (' +
      temp_c +
      '&deg;C) ' +
      'Humidity: ' +
      humidity +
      '&percnt;</p>';
    htmlText += htmlString;
  });
  elem.innerHTML = htmlText;
}

function updateIndex() {
  void getLatestSensorData();
  void getHistoricalSensorData();
  setTimeout(updateIndex, minuteInMiliseconds * 5);
}

// https://gist.github.com/mohokh67/e0c5035816f5a88d6133b085361ad15b
function formatDate(d) {
  const date = d.toISOString().split('T')[0];
  const time = d.toTimeString().split(' ')[0];
  return `${date} ${time}`;
}

updateIndex();
