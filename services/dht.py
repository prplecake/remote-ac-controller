# https://peppe8o.com/using-raspberry-pi-with-dht11-temperature-and-humidity-sensor-and-python/
import logging
from datetime import datetime
import time

from django.conf import settings

try:
    # noinspection PyPackageRequirements
    import board
except NotImplementedError:
    pass
import adafruit_dht

logger = logging.getLogger(__name__)


def dht_initialize():
    # Initialize DHT11 sensor
    try:
        dhtDevice = adafruit_dht.DHT11(board.D14, use_pulseio=False)
        return dhtDevice
    except NameError:
        logger.warning("Could not initialize DHT11 sensor")
        pass


def get_dht_data() -> (float, float, str):
    dht_device = dht_initialize()
    logger.debug("running 'get_dht_data'")
    temp_c: float = 0.0
    humidity: float = 0.0
    error: str = ''
    if dht_device is not None:
        try:
            # Print the values to the serial port
            temp_c = dht_device.temperature
            humidity = dht_device.humidity
        except RuntimeError as err:
            # print(error.args[0])
            error = err.args[0]
        except NameError as err:
            error = err.args[0]

        logger.warning("'get_dht_data' got error: %s", error)

        if error and not settings.DJANGO_ENV == 'development':
            (temp_c, humidity, error) = get_dht_data()

        logger.debug("calling dhtDevice.exit()")
        dht_device.exit()

    return temp_c, humidity, error


def convert_to_fahrenheit(temp_c: float) -> float:
    return temp_c * (9 / 5) + 32


def main():
    while True:
        (temp_c, humidity, _) = get_dht_data()
        temp_f = convert_to_fahrenheit(temp_c)
        print(f'{datetime.now()} :: Temp: {temp_f:.1f} F'
              f' ({temp_c:.0f} C) : Humidity: {humidity:.2f}%')
        time.sleep(2.0)


if __name__ == '__main__':
    main()
