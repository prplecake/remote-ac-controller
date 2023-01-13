import os

REMOTE_NAME = 'ac-remote'


class IRBlaster:

    class RemoteCommands:
        POWER = "KEY_POWER"
        TEMP_TIMER_UP = "TEMP_TIMER_UP"
        TEMP_TIMER_DWN = "TEMP_TIMER_DWN"
        FAN_SPEED_INC = "FAN_SPEED_INC"
        FAN_SPEED_DEC = "FAN_SPEED_DEC"
        MODE_COOL = "MODE_COOL"
        MODE_ENERGY_SAVER = "MODE_ENERGY_SAVER"
        MODE_FAN_ONLY = "MODE_FAN_ONLY"
        MODE_SLEEP = "MODE_SLEEP"
        MODE_AUTO_FAN = "MODE_AUTO_FAN"
        MODE_TIMER = "MODE_TIMER"

    @staticmethod
    def send_once(cmd: str) -> bool:
        return not bool(os.system(f'irsend SEND_ONCE {REMOTE_NAME} {cmd}'))

    @staticmethod
    def send_many(cmd: str, duration: int) -> bool:
        return not bool(os.system(f'irsend SEND_START {REMOTE_NAME} {cmd};'
                                  f'sleep {duration};'
                                  f'irsend SEND_STOP {REMOTE_NAME} {cmd}'))


def main():
    print(f'send_once test: {IRBlaster.send_once(IRBlaster.RemoteCommands.POWER)}')
    print(f'send_many test: {IRBlaster.send_many(IRBlaster.RemoteCommands.POWER, 3)}')


if __name__ == '__main__':
    main()
