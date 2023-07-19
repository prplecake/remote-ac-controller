const BASE_API_URL = "https://api.weather.gov"

export async function fetchLatestNWSObservation(weather_station: string) {
  return await fetch(BASE_API_URL + "/stations/" + weather_station + "/observations/latest")
    .then((response) => response.json())
}