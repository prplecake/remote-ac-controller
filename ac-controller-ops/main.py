from datetime import datetime
import serial

with serial.Serial() as ser:
    ser.port = '/dev/serial/by-id/usb-Arduino__www.arduino.cc__0043_142353037353513081F1-if00'
    ser.baudrate = 9600
    ser.open()

    try:
        while True:
            result = ser.readline().decode('utf-8').strip()
            print("[{timestamp}]\t{result}".format(
                timestamp=datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f'),
                result=result
            ))
    finally:
        print('done, closing serial port')
        ser.close()

print('fin.')
