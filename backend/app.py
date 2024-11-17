from models import response
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

@app.route('/api', methods=['POST'])
def handle_post():
    data = request.json
    print(data)
    message = data['text']
    print(message)
    ans = response(message)
        # Process the message here
    info = {
            'text': ans
        }
    print(info)
    return jsonify(info)

CORS(app)
if __name__ == '__main__':
        app.run(port=5000, debug=True)
    
