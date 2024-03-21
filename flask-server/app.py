from flask import Flask, request, jsonify
import joblib
import pandas as pd
from salesmodel import prepare_dataset
from salesmodel import finalize_dataline
app = Flask(__name__)

# Load the saved XGBoost model
model = joblib.load("xgboost_model.pkl")


@app.route('/predict', methods=['POST'])
def predict():
    # Get the data sent from the frontend
    data = request.json
    data_values = [value for value in data.values()]
    for i in range(0, len(data_values)):
        if i in [1, 3, 5, 7]:
            data_values[i] = float(data_values[i])
    data_key = [key for key in data.keys()]
    df = pd.DataFrame([data_values], columns=data_key)
    print(df.head())
    df = prepare_dataset(df)
    df = finalize_dataline(df)
    print(df.head())
    # Make predictions
    predictions = model.predict(df)
    print(predictions)
    # Optionally, you can return the predictions as JSON
    return jsonify({"predictions": predictions.tolist()})


if __name__ == '__main__':
    app.run(debug=True)
