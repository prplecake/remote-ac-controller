from django.urls import path, include
from rest_framework import routers
import remote_api.dht.views as dht_views

dht_router = routers.DefaultRouter()
dht_router.register(r'get_data', dht_views.DhtSensorDataViewSet)
dht_router.register(r'graph_data',
                    dht_views.DhtSensorGraphDataViewSet, 'graph-data')
dht_patterns = dht_router.urls

dht_patterns += [
    path('get_latest', dht_views.get_last_record, name='get_latest')
]

urlpatterns = [
    path('', include((dht_patterns, 'dht'), namespace='dht'))
]
