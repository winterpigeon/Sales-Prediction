import pandas as pd
import numpy as np
import matplotlib.pyplot as plt


def postTrainData():
    postdf = pd.read_csv(
        'D:\Sahil\\react+flask\\flask-server\\Adidas_Sales.csv')
    postX = postdf[['Invoice Date', 'Total Sales']]
    postX['Invoice Date'] = pd.to_datetime(postX['Invoice Date'])
    postX = postX.sort_values(by="Invoice Date")
    postX.rename(columns={'Invoice Date': 'ds',
                 'Total Sales': 'y'}, inplace=True)
    postX = postX.groupby('ds').sum()
    postX.reset_index(inplace=True)
    postX = postX.set_index('ds').reindex(pd.date_range(
        '01/01/2020', '31/12/2021', freq='D')).reset_index()
    postX.rename(columns={'index': 'ds'}, inplace=True)
    counter = 0
    for i in range(10):
        if (postX['y'].isnull().sum()):
            counter = counter+1
            postX['y'] = postX['y'].fillna(
                postX['y'].rolling(window=5, min_periods=1).mean())
        else:
            print("ran ", counter, " times")
            break
    postX.set_index('ds', inplace=True)
    postX.index.freq = 'D'
    posttrain = postX.iloc[:670]
    return posttrain.to_json()
