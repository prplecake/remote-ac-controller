from unittest import TestCase

from services.ir_blaster import IRBlaster


class ServicesTests(TestCase):
    ALLOWED_CMDS = IRBlaster.ALLOWED_CMDS

    def test_command_in_allowed_commands(self):
        actual = "KEY_POWER" in self.ALLOWED_CMDS
        self.assertTrue(actual)

    def test_command_not_in_allowed_commands(self):
        actual = "BAD_COMMAND" in self.ALLOWED_CMDS
        self.assertFalse(actual)

    def test_invalid_command_throws_exception(self):
        with self.assertRaises(IRBlaster.InvalidCommandException):
            IRBlaster.send_once("bad_command")
        with self.assertRaises(IRBlaster.InvalidCommandException):
            IRBlaster.send_many("bad_command", 3)
