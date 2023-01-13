from django.db import models


class DhtSensorData(models.Model):
    date = models.DateTimeField(auto_now_add=False)
    temp_c = models.FloatField()
    humidity = models.FloatField()
