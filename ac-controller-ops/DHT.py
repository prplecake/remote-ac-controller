# https://peppe8o.com/using-raspberry-pi-with-dht11-temperature-and-humidity-sensor-and-python/

from datetime import datetime
import time
import board
import adafruit_dht

# Initialize DHT11 sensor
dhtDevice = adafruit_dht.DHT11(board.D14)

while True:
    try:
        # Print the values to the serial port
        temp_c = dhtDevice.temperature
        temp_f = temp_c * (9/5) + 32
        humidity = dhtDevice.humidity
        print('{} :: Temp: {:.2f} F : Humidity: {:.2f}%'.format(
            datetime.now(),
            temp_f,
            humidity
        ))
    except RuntimeError as error:
        # print(error.args[0])
        pass

    time.sleep(2.0)
