from django.urls import path, include


app_name = 'remote_api'
urlpatterns = [
    path('app/', include(('backend.remote_api.app_state.urls', 'app_state'))),
    path('dht/', include(('backend.remote_api.dht.urls', 'dht'))),
    path('ir_blaster/', include(('backend.remote_api.ir_blaster.urls',
                                 'ir_blaster')))
]
