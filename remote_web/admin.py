from django.contrib import admin

from .models import (
    DhtSensorData
)


class DhtSensorDataAdmin(admin.ModelAdmin):
    list_display = ('date', 'temp_c', 'humidity')

admin.site.register(DhtSensorData, DhtSensorDataAdmin)
