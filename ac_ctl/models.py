from django.db import models


class State(models.Model):
    ac_unit_on = models.BooleanField()

    class Meta:
        db_table = 'app_state'
