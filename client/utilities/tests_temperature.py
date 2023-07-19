from unittest import TestCase

from utilities.temperature import (
    convert_to_celcius,
    convert_string_to_celcius,
    convert_to_fahrenheit
)


class TemperatureTests(TestCase):
    def test_convert_to_celcius(self):
        expected = 20.0
        actual = convert_to_celcius(68)
        self.assertEqual(expected, actual)

    def test_convert_string_to_celcius(self):
        expected = 20.0
        actual = convert_string_to_celcius('68')
        self.assertEqual(expected, actual)

    def test_convert_string_to_celcius_with_unit(self):
        expected = 20.0
        actual = convert_string_to_celcius('68f')
        self.assertEqual(expected, actual)

    def test_convert_to_fahrenheit(self):
        expected = 68.0
        actual = convert_to_fahrenheit(20)
        self.assertEqual(expected, actual)
