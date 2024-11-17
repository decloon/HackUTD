from models import response
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import pandas as pd
from get_insights import process_data

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'csv'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Process the uploaded file
        result = process_data(filepath)
        
        return jsonify(result)
    else:
        return jsonify({'error': 'File type not allowed'}), 400

@app.route('/api', methods=['POST'])
def handle_post():
    #turn data into python variables
    data = request.json
    print(data)
    message = data['text']
    csv_data = data['fileContent']
    if csv_data != None:
        with open('temp.csv', 'w') as temp:
            temp.write(csv_data)
    print(message)
    ans = response(message)
        # Process the message here
    info = {
            'text': ans
        }
    return jsonify(info)
      

CORS(app)
if __name__ == '__main__':
        app.run(port=5000, debug=True)

