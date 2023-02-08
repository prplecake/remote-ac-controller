from django.views.generic import TemplateView

from .models import DhtSensorData


class IndexView(TemplateView):
    template_name = 'webremote/index.html'
