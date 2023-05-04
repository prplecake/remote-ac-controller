const BASE_API_URL = '';

export async function fetchLatestSensorData() {
  return await fetch(BASE_API_URL + '/api/dht/get_current')
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      if (error instanceof SyntaxError) {
        console.log(error);
      } else {
        console.error(error);
      }
    });
}

export async function fetchHistoricalSensorData() {
  return await fetch(BASE_API_URL + '/api/dht/historical_data').then(
    (response) => response.json()
  );
}

export async function fetchDhtData(limit) {
  return await fetch(BASE_API_URL + '/api/dht/graph_data/?limit=' + limit).then(
    (response) => response.json()
  );
}

export async function fetchDhtAvgHumidity() {
  return await fetch(BASE_API_URL + '/api/dht/metrics/humidity_avg').then(
    (response) => response.json()
  );
}

export async function fetchDhtHighHumidity() {
  return await fetch(BASE_API_URL + '/api/dht/metrics/humidity_high').then(
    (response) => response.json()
  );
}

export async function fetchDhtLowHumidity() {
  return await fetch(BASE_API_URL + '/api/dht/metrics/humidity_low').then(
    (response) => response.json()
  );
}

export async function fetchDhtAvgTemp() {
  return await fetch(BASE_API_URL + '/api/dht/metrics/temp_avg').then(
    (response) => response.json()
  );
}

export async function fetchDhtHighTemp() {
  return await fetch(BASE_API_URL + '/api/dht/metrics/temp_high').then(
    (response) => response.json()
  );
}

export async function fetchDhtLowTemp() {
  return await fetch(BASE_API_URL + '/api/dht/metrics/temp_low').then(
    (response) => response.json()
  );
}
