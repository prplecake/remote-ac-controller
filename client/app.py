from flask import Flask

app = Flask(__name__)

from . import ir_blaster
app.register_blueprint(ir_blaster.bp)

