import inspect
import os

REMOTE_NAME = 'ac-remote'


class IRBlaster:
    # pylint: disable=too-few-public-methods

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

    ALLOWED_CMDS = [x[1] for x in inspect.getmembers(RemoteCommands)
                    if not x[0].startswith("_") and not inspect.ismethod(x)]

    @staticmethod
    def send_once(cmd: str) -> bool:
        if cmd not in IRBlaster.ALLOWED_CMDS:
            raise IRBlaster.InvalidCommandException()
        return not bool(os.system(f'irsend SEND_ONCE {REMOTE_NAME} {cmd}'))

    @staticmethod
    def send_many(cmd: str, duration: int) -> bool:
        if cmd not in IRBlaster.ALLOWED_CMDS:
            raise IRBlaster.InvalidCommandException()
        return not bool(os.system(f'irsend SEND_START {REMOTE_NAME} {cmd};'
                                  f'sleep {duration};'
                                  f'irsend SEND_STOP {REMOTE_NAME} {cmd}'))

    class InvalidCommandException(Exception):
        """Raised when provided command not in allowed list"""

        def __init__(self):
            message = "Provided command not in allowed commands list. See " \
                      "IRBlaster.RemoteCommands"
            super().__init__(message)


def main():
    print(f'send_once test: '
          f'{IRBlaster.send_once(IRBlaster.RemoteCommands.POWER)}')
    print(f'send_many test: '
          f'{IRBlaster.send_many(IRBlaster.RemoteCommands.POWER, 3)}')


if __name__ == '__main__':
    main()
