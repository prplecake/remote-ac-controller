# static files

[django docs](https://docs.djangoproject.com/en/4.1/ref/contrib/staticfiles/)

## collect static files for deployment

this will copy static files to the path configured in `STATIC_ROOT` in `ac_ctl_web/env.py`

```shell
pipenv run python manage.py collectstatic
```
