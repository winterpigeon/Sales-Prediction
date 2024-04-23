from flask import Flask, request, jsonify
import joblib
import pandas as pd
from graphingSalesJson import postTrainData
from salesmodel2 import finalize_dataline
from forecasting import futureForecast
app = Flask(__name__)

# Load the saved XGBoost model
rmodel = joblib.load("xgboost_model_reg.pkl")


@app.route('/predict', methods=['POST'])
def predict():
    # Get the data sent from the frontend
    data = request.json
    data_values = [value for value in data.values()]
    for i in range(0, len(data_values)):
        if i in [5, 6, 7, 8]:
            print(data_values)
            data_values[i] = float(data_values[i])
    data_key = [key for key in data.keys()]
    df = pd.DataFrame([data_values], columns=data_key)
    print(df.head())
    df = finalize_dataline(df)
    print(df.head())
    # Make predictions
    predictions = rmodel.predict(df)
    print(predictions)
    # Optionally, you can return the predictions as JSON
    return jsonify({"predictions": predictions.tolist()})


@app.route("/upload", methods=["POST"])
def upload():
    if "file" not in request.files:
        return "No file found"
    file = request.files["file"]
    if file.filename == '':
        return 'No selected file'
    if file:
        # Save the uploaded file to the server
        file.save(file.filename)

        return 'File uploaded successfully'


@app.route('/past', methods=['POST', 'GET'])
def past():
    pastsales = postTrainData()
    print(pastsales)
    return jsonify(pastsales)


@app.route('/forecast', methods=['POST', 'GET'])
def future():
    futuresales = futureForecast()
    print(futuresales)
    return jsonify(futuresales)


if __name__ == '__main__':
    app.run(debug=True)
