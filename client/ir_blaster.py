from flask import Blueprint, request

from .services.ir_blaster import IRBlaster

bp = Blueprint("ir_blaster", __name__, url_prefix="/ir_blaster")


@bp.route("send_once", methods=["POST"])
def send_once():
    command = request.json['command']
    print('got command: ', command)
    if not command:
        return '', 400
    try:
        result = IRBlaster.send_once(command)
    except IRBlaster.InvalidCommandException:
        return '', 400
    return {result: result}, 200

@bp.route("send_many", methods=["POST"])
def send_many():
    try:
        command = request.json['command']
    except KeyError:
        return '', 400
    try:
        duration = request.json['duration']
    except KeyError:
        return '', 400
    try:
        result = IRBlaster.send_many(command, duration)
    except IRBlaster.InvalidCommandException:
        return '', 400
    return {result: result}, 200
