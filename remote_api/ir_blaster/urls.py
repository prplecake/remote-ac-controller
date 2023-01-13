from django.urls import path, include

import remote_api.ir_blaster.views as ir_blaster_views

ir_blaster_patterns = [
    path('send_once', ir_blaster_views.send_once, name='send_once'),
    path('send_many', ir_blaster_views.send_many, name='send_many')
]

urlpatterns = [
    path('', include((ir_blaster_patterns, 'ir_blaster'),
                     namespace='ir_blaster'))
]
