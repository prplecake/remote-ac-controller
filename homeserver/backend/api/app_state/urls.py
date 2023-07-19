from django.urls import path, include

import backend.api.app_state.views as state_views

app_state_patterns = [
    path('ac_power', state_views.get_ac_power, name='get_ac_power'),
    path('ac_power/toggle', state_views.toggle_ac_power,
         name='toggle_ac_power'),
    path('weather_station', state_views.handle_weather_station,
         name='get_weather_station'),
    path('wx_grid_points', state_views.handle_wx_grid_points,
         name='get_wx_grid_points')
]

urlpatterns = [
    path('state/', include((app_state_patterns, 'app_state'),
                           namespace='app_state'))
]
