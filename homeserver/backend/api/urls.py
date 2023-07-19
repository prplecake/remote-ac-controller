from django.urls import path, include


app_name = 'api'
urlpatterns = [
    path('app/', include(('backend.api.app_state.urls', 'app_state'))),
    path('dht/', include(('backend.api.dht.urls', 'dht'))),
]
