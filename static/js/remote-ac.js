function convert_to_fahrenheit(temp_c) {
    return (temp_c * (9 / 5) + 32).toFixed(2)
}

const minuteInMiliseconds = 60000;

async function get_latest_sensor_data() {
    const response = await fetch("/api/dht/get_current");
    let data = await response.json();
    update_latest_data(data);
}

async function get_historical_sensor_data() {
    const response = await fetch("/api/dht/historical_data");
    let data = await response.json();
    update_historical_data(data);
}

function update_latest_data(data) {
    let elem = document.getElementById("latest-sensor-data");
    let htmlText;
    if (data.error != "") {
        htmlText = "<p>" + data.error + "</p>";
    } else {
        let temp_f = convert_to_fahrenheit(data.temp_c);
        let temp_c = data.temp_c.toFixed(2);
        let humidity = data.humidity.toFixed(2);
        htmlText = "<p>Temp: " + temp_f + " F (" + temp_c + " C)</p>"
            + "<p>Humidity: " + humidity + "%</p>";
    }
    elem.innerHTML = htmlText;
}

function update_historical_data(data) {
    let elem = document.getElementById("historical-sensor-data");
    let htmlText = "";
    data.forEach(item => {
        var date = new Date(item.date).toLocaleString();
        let temp_f = convert_to_fahrenheit(item.temp_c);
        let temp_c = item.temp_c.toFixed(2);
        let humidity = item.humidity.toFixed(2);
        let htmlString = "<p>" + date + " :: " + temp_f + " F (" + temp_c + " C) "
            + "Humidity: " + humidity + "</p>";
        htmlText += htmlString;
    });
    elem.innerHTML = htmlText;
}

function update_index() {
    get_latest_sensor_data();
    get_historical_sensor_data();
    setTimeout(update_index, minuteInMiliseconds * 5);
}

update_index()