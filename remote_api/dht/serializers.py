from remote_web.models import DhtSensorData
from rest_framework import serializers


class DhtSensorDataSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = DhtSensorData
        fields = ['date', 'temp_c', 'humidity']
