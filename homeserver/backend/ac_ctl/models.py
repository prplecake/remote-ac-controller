from django.db import models


class State(models.Model):
    ac_unit_on = models.BooleanField()
    weather_station = models.TextField(blank=True)
    wx_grid_points = models.TextField(blank=True)

    class Meta:
        db_table = 'app_state'


class DhtSensorData(models.Model):
    date = models.DateTimeField(auto_now_add=False)
    temp_c = models.FloatField()
    humidity = models.FloatField()

    class Meta:
        verbose_name = 'DHT Sensor Data'
        verbose_name_plural = verbose_name
