from rest_framework import serializers

from backend.ac_ctl.models import DhtSensorData


class DhtSensorDataSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = DhtSensorData
        fields = ['date', 'temp_c', 'humidity']
