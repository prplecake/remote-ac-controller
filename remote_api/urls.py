from django.urls import path, include


app_name = 'remote_api'
urlpatterns = [
    path('dht/', include(('remote_api.dht.urls', 'dht')))
]
