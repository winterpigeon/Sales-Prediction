import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import TimeseriesGenerator
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM, Dropout
from statsmodels.tools.eval_measures import rmse
from keras.models import load_model


def futureForecast():
    model = load_model(
        'D:\Sahil\\react+flask\\flask-server\\LSTM_model4.keras')
    df = pd.read_csv('D:\Sahil\\react+flask\\flask-server\\Adidas_Sales.csv')
    X = df[['Invoice Date', 'Total Sales']]

    # Data preprocessing
    X['Invoice Date'] = pd.to_datetime(X['Invoice Date'])
    X = X.sort_values(by="Invoice Date")
    X.rename(columns={'Invoice Date': 'ds', 'Total Sales': 'y'}, inplace=True)
    X = X.groupby('ds').sum()
    X.reset_index(inplace=True)

    # Handling missing values
    X = X.set_index('ds').reindex(pd.date_range(
        '01/01/2020', '31/12/2021', freq='D')).reset_index()
    X.rename(columns={'index': 'ds'}, inplace=True)

    count = 0
    for i in range(10):
        if (X['y'].isnull().sum()):
            count = count+1
            X['y'] = X['y'].fillna(X['y'].rolling(
                window=5, min_periods=1).mean())
        else:
            print("ran ", count, " times")
            break

    X.set_index('ds', inplace=True)
    X.index.freq = 'D'

    # Train-test split
    train = X.iloc[:670]
    test = X.iloc[670:]
    n_input = 14
    bs = 1
    n_features = 1
    # Scaling data
    scaler = MinMaxScaler()
    scaler.fit(train)
    scaled_train = scaler.transform(train)
    scaled_test = scaler.transform(test)
    test_predictions = []
    first_eval_batch = scaled_train[-n_input:]
    current_batch = first_eval_batch.reshape((1, n_input, n_features))
    for i in range(len(test)):
        current_pred = model.predict(current_batch)[0]
        test_predictions.append(current_pred)
        current_batch = np.append(current_batch[:, 1:, :], [
            [current_pred]], axis=1)

    # Inverse scaling
    true_predictions = scaler.inverse_transform(test_predictions)
    test['Predictions'] = true_predictions
    test.drop(columns=['y'], inplace=True)
    return test.to_json()
