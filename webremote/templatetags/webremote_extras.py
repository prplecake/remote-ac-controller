from django import template

from services import dht

register = template.Library()


@register.filter
def convert_to_fahrenheit(value):
    return dht.convert_to_fahrenheit(value)
