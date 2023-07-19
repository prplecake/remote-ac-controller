const BASE_API_URL = "";

export async function fetchLatestSensorData() {
  return await fetch(BASE_API_URL + "/api/dht/get_current")
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

export async function fetchHistoricalSensorData(page?: number) {
  let url = BASE_API_URL + "/api/dht/historical_data"
  if (page && page > 0){
    url = url + "?page=" + page
  }
  return await fetch(url).then(
    (response) => response.json()
  );
}

export async function fetchDhtData(limit: string) {
  return await fetch(BASE_API_URL + "/api/dht/graph_data?limit=" + limit).then(
    (response) => response.json()
  );
}

export async function fetchDhtAvgHumidity() {
  return await fetch(BASE_API_URL + "/api/dht/metrics/humidity_avg").then(
    (response) => response.json()
  );
}

export async function fetchDhtHighHumidity() {
  return await fetch(BASE_API_URL + "/api/dht/metrics/humidity_high").then(
    (response) => response.json()
  );
}

export async function fetchDhtLowHumidity() {
  return await fetch(BASE_API_URL + "/api/dht/metrics/humidity_low").then(
    (response) => response.json()
  );
}

export async function fetchDhtAvgTemp() {
  return await fetch(BASE_API_URL + "/api/dht/metrics/temp_avg").then(
    (response) => response.json()
  );
}

export async function fetchDhtHighTemp() {
  return await fetch(BASE_API_URL + "/api/dht/metrics/temp_high").then(
    (response) => response.json()
  );
}

export async function fetchDhtLowTemp() {
  return await fetch(BASE_API_URL + "/api/dht/metrics/temp_low").then(
    (response) => response.json()
  );
}

export async function postToggleAcPowerState() {
  return await fetch("/api/app/state/ac_power/toggle", {
    method: "POST",
  })
    .then(function (res) {
      if (!res.ok) {
        console.warn("Request failed.");
        console.warn(res.json());
      }
      return res.json();
    })
}

export async function fetchAcPowerState() {
  return await fetch("/api/app/state/ac_power")
    .then((response) => {
      if (!response.ok) {
        console.warn("Request failed");
        console.debug(response.json());
      }
      return response.json();
    });
}

export function postIrCommand(command: string) {
  fetch("/api/ir_blaster/send_once", {
    method: "POST",
    body: JSON.stringify({
      command: command,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function (res) {
    if (res.ok) {
      console.log(res);
      console.log(res.json());
    } else {
      console.log("Request failed.");
      console.log(res.json());
    }
  });
}

export async function fetchWeatherStation() {
  return await fetch(BASE_API_URL + "/api/app/state/weather_station").then(
    (response) => response.json()
  );
}

export async function fetchWxGridPoints() {
  return await fetch(BASE_API_URL + "/api/app/state/wx_grid_points").then(
    (response) => response.json()
  );
}
