from rest_framework import serializers

from remote_web.models import DhtSensorData


class DhtSensorDataSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = DhtSensorData
        fields = ['date', 'temp_c', 'humidity']
