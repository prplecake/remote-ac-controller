import os

from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ac_ctl_web.settings')

app = Celery('ac_ctl_web')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.conf.beat_schedule = {
    "every minute": {
        "task": "update_dht_data",
        "schedule": crontab(minute='*/5')  # this is also every 5 minutes wtf
    },
    "every five minutes": {
        "task": "temperature_check",
        "schedule": crontab(minute='*/5')
    }
}

app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
