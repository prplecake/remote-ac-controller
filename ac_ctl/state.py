import logging

from ac_ctl.models import State

logger = logging.getLogger(__name__)


class AcControlState:
    instance = None

    def __new__(cls):
        if cls.instance is not None:
            return cls.instance
        else:
            inst = cls.instance = super(AcControlState, cls).__new__(cls)
            return inst

    def __init__(self):
        self.state = None
        self.get_or_create_state()

    def refresh(self):
        self.state = self.get_state()

    def get(self):
        return self.state

    def get_or_create_state(self):
        try:
            self.state = self.get_state()
        except State.DoesNotExist:
            logger.info("Creating state as it doesn't exist yet")
            self.state = State()

            # Set up initial state
            self.state.ac_unit_on = False

            # Save state
            self.state.save()

    @staticmethod
    def get_state():
        return State.objects.get(id=1)

    def _get_ac_unit_on(self):
        print("Get AC Unit Status")
        return self.state.ac_unit_on

    def _set_ac_unit_on(self, value):
        print("Setting AC Unit Status")
        self.state.ac_unit_on = value
        self.state.save()

    ac_unit_on = property(_get_ac_unit_on, _set_ac_unit_on)


state = AcControlState()
