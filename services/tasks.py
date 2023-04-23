from celery import Celery, shared_task

app = Celery()


@shared_task(bind=True,
             name='temperature_check',
             soft_time_limit=5)
def temperature_check(self):  # pylint: disable=unused-argument
    print('temperature_check called')
