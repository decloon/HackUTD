from models import response
from flask import Flask, request

app = Flask(__name__)

@app.route('/api', methods=['POST'])
def handle_post():
    data = request.json


def api_call(message):
    ans = response(message)