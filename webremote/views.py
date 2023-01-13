from django.views.generic import TemplateView

from services.DHT import get_dht_data, convert_to_fahrenheit

from .models import DhtSensorData

class IndexView(TemplateView):
    template_name = 'webremote/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        (temp_c, humidity, dht_error) = get_dht_data()
        obj = DhtSensorData.objects.order_by('-date')[:20]
        context['temp_c'] = temp_c
        context['temp_f'] = convert_to_fahrenheit(temp_c)
        context['humidity'] = humidity
        context['dht_error'] = dht_error
        context['obj'] = obj
        return context
