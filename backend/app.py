from models import response
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import pandas as pd
from get_insights import process_data
from models import analyze_csv

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})  # Allow requests from React app) 

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'csv'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST', 'GET'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(filename)
        
        # Process the uploaded file
        result = process_data(filename)
        
        return jsonify(result)
    else:
        return jsonify({'error': 'File type not allowed'}), 400

@app.route('/predict', methods=['POST', 'GET'])
def predict():
    if 'file' not in request.files:
        print('No file part')
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(filename)
        
        # Read the CSV file
        df = pd.read_csv(filename)
        
        # Initialize a dictionary to store predictions
        predictions = {}
        
        # List of metrics to predict
        metrics = [
            'total_expense', 'electricity_bill', 'electricity_usage', 'water_bill', 
            'water_usage', 'waste_produced', 'percent_waste_recycled', 
            'hvac_expenses', 'lighting_expenses', 'ghg_emissions'
        ]
        
        # Train and predict for each metric
        for metric in metrics:
            data = df[['month', metric]].dropna()
            data_dict = dict(zip(data['month'], data[metric]))
            predictions[metric] = analyze_csv(data_dict)
        
        print(predictions)
        return jsonify(predictions)
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
      

# CORS(app)
if __name__ == '__main__':
    app.run(port=5173, debug=True)

