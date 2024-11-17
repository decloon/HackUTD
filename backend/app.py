from models import response
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api', methods=['POST'])
def handle_post():
    data = request.json
    message = str(data['message'])
    ans = response(message)
        # Process the message here
    info = {
            'replies': ans
        }
    print(info)
    return jsonify(response)
    
