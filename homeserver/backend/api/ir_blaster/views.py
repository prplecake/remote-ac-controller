from django.http import HttpResponseBadRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response

from backend.services.ir_blaster import IRBlaster


@api_view(['post'])
def send_once(request):
    command = request.data['command']
    if not command:
        return HttpResponseBadRequest()
    result = IRBlaster.send_once(command)
    return Response({'result': result})


@api_view(['post'])
def send_many(request):
    try:
        command = request.data['command']
    except KeyError:
        return HttpResponseBadRequest()
    try:
        duration = request.data['duration']
    except KeyError:
        duration = 3
    result = IRBlaster.send_many(command, duration)
    return Response({'result': result})
