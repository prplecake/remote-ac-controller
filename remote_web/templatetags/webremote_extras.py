from django import template

from utilities.temperature import convert_to_fahrenheit

register = template.Library()


@register.filter
def convert_to_fahrenheit(value):  # noqa: F811
    return convert_to_fahrenheit(value)
