from celery import Celery, shared_task
from django.conf import settings

from ac_ctl.state import state

from remote_web.models import DhtSensorData
from services.ir_blaster import IRBlaster
from utilities.temperature import convert_string_to_celcius, \
    convert_to_fahrenheit

app = Celery()


@shared_task(bind=True,
             name='temperature_check',
             soft_time_limit=5)
def temperature_check(self):  # pylint: disable=unused-argument
    print('temperature_check called')
    result = DhtSensorData.objects.last()
    temp = result.temp_c
    print(f'temperature: {convert_to_fahrenheit(temp)}({temp})')
    print(f'Settings Temp High: {settings.TEMP_HIGH}')
    print(f'Settings Temp Low: {settings.TEMP_LOW}')
    temp_high = convert_string_to_celcius(settings.TEMP_HIGH)
    temp_low = convert_string_to_celcius(settings.TEMP_LOW)

    if temp > temp_high:
        # temperature is too high
        print('temp is too high')
        # turn on AC
        if not state.ac_unit_on:
            IRBlaster.send_once(IRBlaster.RemoteCommands.POWER)
    if temp < temp_low:
        # temperature is too low
        print('temp is too low')
        # turn off AC
        if state.ac_unit_on:
            IRBlaster.send_once(IRBlaster.RemoteCommands.POWER)
