# https://peppe8o.com/using-raspberry-pi-with-dht11-temperature-and-humidity-sensor-and-python/

from datetime import datetime
import time

try:
    import board
except NotImplementedError:
    pass
import adafruit_dht

# Initialize DHT11 sensor
try:
    dhtDevice = adafruit_dht.DHT11(board.D14)
except NameError:
    pass


def get_dht_data() -> (float, float, str):
    temp_c: float = 0.0
    humidity: float = 0.0
    error: str = ''
    try:
        # Print the values to the serial port
        temp_c = dhtDevice.temperature
        humidity = dhtDevice.humidity
    except RuntimeError as err:
        # print(error.args[0])
        error = err.args[0]
    except NameError as err:
        error = err.args[0]

    if error != '':
        (temp_c, humidity, error) = get_dht_data()

    return temp_c, humidity, error


def convert_to_fahrenheit(temp_c: float) -> float:
    return temp_c * (9 / 5) + 32


def main():
    while True:
        (temp_c, humidity, _) = get_dht_data()
        temp_f = convert_to_fahrenheit(temp_c)
        print(f'{datetime.now()} :: Temp: {temp_f:.2f} F'
              f' ({temp_c:.2f} C) : Humidity: {humidity:.2f}%')
        time.sleep(2.0)


if __name__ == '__main__':
    main()
