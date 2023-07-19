from django.urls import path, include
from rest_framework import routers
import backend.api.dht.views as dht_views
import backend.api.dht.views_metrics as metric_views

dht_router = routers.DefaultRouter(trailing_slash=False)
dht_router.register(r'get_data', dht_views.DhtSensorDataViewSet)
dht_router.register(r'graph_data',
                    dht_views.DhtSensorGraphDataViewSet, 'graph-data')
dht_router.register(r'historical_data',
                    dht_views.DhtSensorHistoricalDataViewSet,
                    'historical_data')
dht_patterns = dht_router.urls

dht_patterns += [
    path('get_latest', dht_views.get_last_record, name='get_latest'),
    path('get_current', dht_views.get_current_record, name='get_current')
]

metrics_patterns = [
    path('humidity_avg', metric_views.get_humidity_avg_record,
         name='metrics_humidity_avg'),
    path('humidity_high', metric_views.get_humidity_high_record,
         name='metrics_humidity_high'),
    path('humidity_low', metric_views.get_humidity_low_record,
         name='metrics_humidity_low'),
    path('temp_avg', metric_views.get_temp_avg_record,
         name='metrics_temp_avg'),
    path('temp_high', metric_views.get_temp_high_record,
         name='metrics_temp_high'),
    path('temp_low', metric_views.get_temp_low_record,
         name='metrics_temp_low'),
]

urlpatterns = [
    path('metrics/', include((metrics_patterns, 'metrics'),
                             namespace='metrics')),
    path('', include((dht_patterns, 'dht'), namespace='dht')),
]
