from celery import Celery
from celery import shared_task
from django.utils import timezone

from services.dht import get_dht_data
from utilities.temperature import convert_to_fahrenheit

from .models import DhtSensorData

app = Celery()


# noinspection PyUnusedLocal
@shared_task(bind=True,
             name='update_dht_data',
             max_retries=3,
             soft_time_limit=5)
def update_dht_data(self):  # pylint: disable=unused-argument
    print('update_dht_data called')

    (temp_c, humidity, error) = get_dht_data()
    temp_f = convert_to_fahrenheit(temp_c)
    now = timezone.now()
    print(f'{now} :: Temp: {temp_f:.2f} F '
          f'({temp_c:.2f} C) : Humidity: {humidity:.2f}%')
    sensor_data = DhtSensorData(
        date=now,
        temp_c=temp_c,
        humidity=humidity,
    )
    if error == '':
        sensor_data.save()
        print(f'record saved: {sensor_data.id}')
    else:
        print(error)
