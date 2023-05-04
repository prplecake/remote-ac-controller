from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from backend.ac_ctl.state import state


@api_view(['post'])
def toggle_ac_power(request):
    try:
        state.ac_unit_on = not state.ac_unit_on
        return Response(
            data={
                "power_on": state.ac_unit_on
            },
            status=status.HTTP_200_OK)
    except Exception as ex:
        return Response(
            data={
                "error": str(ex)
            },
            status=status.HTTP_503_SERVICE_UNAVAILABLE)


@api_view()
def get_ac_power(request):
    try:
        return Response(
            data={
                "power_on": state.ac_unit_on
            },
            status=status.HTTP_200_OK)
    except Exception as ex:
        return Response(
            data={
                "error": str(ex)
            },
            status=status.HTTP_503_SERVICE_UNAVAILABLE
        )
