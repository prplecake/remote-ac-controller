from django.urls import path, include


app_name = 'remote_api'
urlpatterns = [
    path('dht/', include(('remote_api.dht.urls', 'dht'))),
    path('ir_blaster/', include(('remote_api.ir_blaster.urls', 'ir_blaster')))
]
