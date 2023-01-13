from remote_web.models import DhtSensorData
from rest_framework import permissions, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import DhtSensorDataSerializer

from services.dht import get_dht_data


class DhtSensorDataViewSet(viewsets.ModelViewSet):
    queryset = DhtSensorData.objects.all().order_by('-date')
    serializer_class = DhtSensorDataSerializer
    http_method_names = ['get']


@api_view()
def get_last_record(request):
    obj = DhtSensorData.objects.last()
    return Response({
        'date': obj.date,
        'temp_c': obj.temp_c,
        'humidity': obj.humidity,
    })
