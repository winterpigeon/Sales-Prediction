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
import random
random.seed(170424)
np.random.seed(170424)
tf.random.set_seed(170424)
# from keras.callbacks import Callback
# Load data

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
        X['y'] = X['y'].fillna(X['y'].rolling(window=5, min_periods=1).mean())
    else:
        print("ran ", count, " times")
        break

X.set_index('ds', inplace=True)
X.index.freq = 'D'

# Train-test split
train = X.iloc[:670]
test = X.iloc[670:]

# Scaling data
scaler = MinMaxScaler()
scaler.fit(train)
scaled_train = scaler.transform(train)
scaled_test = scaler.transform(test)

# Time series generator
n_input = 14
bs = 1
n_features = 1
generator = TimeseriesGenerator(
    scaled_train, scaled_train, length=n_input, batch_size=bs)

# Model building
model = Sequential()
model.add(LSTM(128, activation='relu', return_sequences=True,
          input_shape=(n_input, n_features)))
model.add(Dropout(0.2))
model.add(LSTM(64, activation='relu', return_sequences=True))
model.add(Dropout(0.2))
model.add(LSTM(32, activation='relu', return_sequences=False))
model.add(Dense(1))
model.compile(optimizer='adam', loss='mse')
loaded_model = load_model('LSTM_model4.keras')
# Model training
loaded_model.fit(generator, epochs=100, verbose=1)
loss_per_epoch = loaded_model.history.history['loss']
plt.plot(range(len(loss_per_epoch)), loss_per_epoch)
# Predictions
test_predictions = []
first_eval_batch = scaled_train[-n_input:]
current_batch = first_eval_batch.reshape((1, n_input, n_features))
for i in range(len(test)):
    current_pred = loaded_model.predict(current_batch)[0]
    test_predictions.append(current_pred)
    current_batch = np.append(current_batch[:, 1:, :], [
                              [current_pred]], axis=1)

# Inverse scaling
true_predictions = scaler.inverse_transform(test_predictions)

# Evaluation
test['Predictions'] = true_predictions
print("RMSE:", rmse(test['Predictions'], test['y']))
print("Mean:", test['y'].mean())

# Visualization
test.plot(figsize=(12, 6))
plt.show()
loaded_model.save('LSTM_model6.keras')
