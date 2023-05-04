from django.test import TestCase
from django.utils import timezone

from .models import (
    DhtSensorData
)


class DhtSensorDataTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all the test methods
        date = timezone.now()
        temp_c = 20.0
        humidity = 10.0
        DhtSensorData.objects.create(
            date=date, temp_c=temp_c, humidity=humidity)

    def test_date_label(self):
        obj = DhtSensorData.objects.get(id=1)
        field_label = obj._meta.get_field('date').verbose_name
        self.assertEqual(field_label, 'date')

    def test_temp_c_label(self):
        obj = DhtSensorData.objects.get(id=1)
        field_label = obj._meta.get_field('temp_c').verbose_name
        self.assertEqual(field_label, 'temp c')

    def test_humidity_label(self):
        obj = DhtSensorData.objects.get(id=1)
        field_label = obj._meta.get_field('humidity').verbose_name
        self.assertEqual(field_label, 'humidity')
