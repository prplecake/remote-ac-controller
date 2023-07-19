import logging

from django.db.models import Q
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from backend.ac_ctl.models import DhtSensorData
from backend.api.services import get_dht_data
from .serializers import DhtSensorDataSerializer
from ..pagination import HistoricalDataSetPagination

logger = logging.getLogger(__name__)


class DhtSensorDataViewSet(viewsets.ModelViewSet):
    queryset = DhtSensorData.objects.all().order_by('-date')
    serializer_class = DhtSensorDataSerializer
    http_method_names = ['get']


class DhtSensorGraphDataViewSet(viewsets.ModelViewSet):
    serializer_class = DhtSensorDataSerializer
    http_method_names = ['get']

    def get_queryset(self):
        logger.info('hello from the logger')
        logger.debug(self.request.query_params)
        limit_param = self.request.query_params.get('limit')
        if limit_param.endswith('d'):
            logger.debug(limit_param[:-1])
            limit = 24 * int(limit_param[:-1])
        elif limit_param.endswith('h'):
            limit = int(limit_param[:-1])
        else:
            limit = 24 * 7
        logger.debug(f'limit: {limit}')
        queryset = DhtSensorData.objects.filter(
            Q(date__contains=':00:')).order_by('-date')[:limit]
        logger.debug(len(queryset))
        queryset = list(reversed(queryset))
        return queryset


class DhtSensorHistoricalDataViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    pagination_class = HistoricalDataSetPagination
    serializer_class = DhtSensorDataSerializer

    def get_queryset(self):
        queryset = DhtSensorData.objects.order_by('-date')
        return queryset


@api_view()
def get_last_record(request):
    obj = DhtSensorData.objects.last()
    return Response({
        'date': obj.date,
        'temp_c': obj.temp_c,
        'humidity': obj.humidity
    })


@api_view()
def get_current_record(request):
    (temp_c, humidity, dht_error) = get_dht_data()
    return Response({
        'temp_c': temp_c,
        'humidity': humidity,
        'error': dht_error
    })
