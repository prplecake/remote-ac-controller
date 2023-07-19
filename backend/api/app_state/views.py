import logging

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from backend.ac_ctl.state import state

logger = logging.getLogger(__name__)


@api_view(['post'])
def toggle_ac_power(request):
    try:
        state.ac_unit_on = not state.ac_unit_on
        return Response(
            data={
                "power_on": state.ac_unit_on
            },
            status=status.HTTP_200_OK)
    except Exception:
        return Response(
            status=status.HTTP_503_SERVICE_UNAVAILABLE)


@api_view()
def get_ac_power(request):
    try:
        return Response(
            data={
                "power_on": state.ac_unit_on
            },
            status=status.HTTP_200_OK)
    except Exception:
        return Response(
            status=status.HTTP_503_SERVICE_UNAVAILABLE
        )


@api_view(['get', 'post'])
def handle_weather_station(request):
    if request.method == 'GET':
        return Response(
            data={
                "weather_station": state.weather_station
            },
            status=status.HTTP_200_OK
        )

    if request.method == 'POST':
        if 'weather_station' in request.data:
            state.weather_station = request.data['weather_station']
            return Response(
                data={
                    "weather_station": state.weather_station
                }, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['get', 'post'])
def handle_wx_grid_points(request):
    if request.method == 'GET':
        return Response(
            data={
                "wx_grid_points": state.wx_grid_points
            }
        )

    if request.method == 'POST':
        if 'wx_grid_points' in request.data:
            state.wx_grid_points = request.data['wx_grid_points']
            return Response(data={
                "wx_grid_points": state.wx_grid_points
            }, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
