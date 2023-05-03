import logging

from django.db.models import Q, Min, Max, Avg
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from remote_web.models import DhtSensorData
from services.dht import get_dht_data
from .serializers import DhtSensorDataSerializer

logger = logging.getLogger(__name__)


@api_view()
def get_humidity_low_record(request):
    obj = DhtSensorData.objects.aggregate(Min('humidity'))
    return Response(obj)


@api_view()
def get_humidity_high_record(request):
    obj = DhtSensorData.objects.aggregate(Max('humidity'))
    return Response(obj)


@api_view()
def get_humidity_avg_record(request):
    obj = DhtSensorData.objects.aggregate(Avg('humidity'))
    return Response(obj)


@api_view()
def get_temp_low_record(request):
    obj = DhtSensorData.objects.aggregate(Min('temp_c'))
    return Response(obj)


@api_view()
def get_temp_high_record(request):
    obj = DhtSensorData.objects.aggregate(Max('temp_c'))
    return Response(obj)


@api_view()
def get_temp_avg_record(request):
    obj = DhtSensorData.objects.aggregate(Avg('temp_c'))
    return Response(obj)
