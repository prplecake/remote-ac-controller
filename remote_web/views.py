from django.views.generic import TemplateView

from .models import DhtSensorData


class IndexView(TemplateView):
    template_name = 'webremote/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        obj = DhtSensorData.objects.order_by('-date')[:20]
        context['obj'] = obj
        return context
