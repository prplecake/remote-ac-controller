from django.urls import path, include
from rest_framework import routers
import remote_api.dht.views as dht_views

dht_router = routers.DefaultRouter()
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

urlpatterns = [
    path('', include((dht_patterns, 'dht'), namespace='dht'))
]
