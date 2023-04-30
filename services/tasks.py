from celery import Celery, shared_task
from django.conf import settings

from remote_web.models import DhtSensorData
from services.ir_blaster import IRBlaster
from utilities.temperature import convert_string_to_celcius

app = Celery()


@shared_task(bind=True,
             name='temperature_check',
             soft_time_limit=5)
def temperature_check(self):  # pylint: disable=unused-argument
    print('temperature_check called')
    result = DhtSensorData.objects.last()
    temp = result.temp_c
    print(f'temperature: {temp}')
    print(f'Settings Temp High: {settings.TEMP_HIGH}')
    print(f'Settings Temp Low: {settings.TEMP_LOW}')
    temp_high = convert_string_to_celcius(settings.TEMP_HIGH)
    temp_low = convert_string_to_celcius(settings.TEMP_LOW)

    if temp > temp_high:
        # temperature is too high
        print('temp is too high')
        # turn on AC
        IRBlaster.send_once(IRBlaster.RemoteCommands.POWER)
        # this will cause problems... need to store state of power somehow...
        # what if temp is too high but then we turn off the AC? :|
    if temp < temp_low:
        # temperature is too low
        print('temp is too low')
        # turn off AC
        IRBlaster.send_once(IRBlaster.RemoteCommands.POWER)
        # see above
