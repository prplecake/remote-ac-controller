def convert_to_fahrenheit(temp_c: float) -> float:
    return temp_c * (9 / 5) + 32


def convert_to_celcius(temp_f: float) -> float:
    return (temp_f - 32) * (5 / 9)


def convert_string_to_celcius(temp_f: str) -> float:
    try:
        temp_f = float(temp_f)
    except ValueError:
        if temp_f.endswith('f'):
            temp_f = float(temp_f[:-1])
    return convert_to_celcius(temp_f)
