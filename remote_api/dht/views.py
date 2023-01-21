from django.db.models import Q
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from remote_web.models import DhtSensorData
from .serializers import DhtSensorDataSerializer


class DhtSensorDataViewSet(viewsets.ModelViewSet):
    queryset = DhtSensorData.objects.all().order_by('-date')
    serializer_class = DhtSensorDataSerializer
    http_method_names = ['get']


class DhtSensorGraphDataViewSet(viewsets.ModelViewSet):
    queryset = DhtSensorData.objects.filter(Q(date__contains=':00:'))[:24*7]
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
