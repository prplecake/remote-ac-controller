from django.urls import path, include

import backend.api.app_state.views as state_views

app_state_patterns = [
    path('ac_power', state_views.get_ac_power, name='get_ac_power'),
    path('ac_power/toggle', state_views.toggle_ac_power,
         name='toggle_ac_power')
]

urlpatterns = [
    path('state/', include((app_state_patterns, 'app_state'),
                           namespace='app_state'))
]
