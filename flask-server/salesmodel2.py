import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import joblib
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.metrics import r2_score, mean_squared_error

# ///////////////prepare traing data////////////////////

df = pd.read_csv('D:\Sahil\\react+flask\\flask-server\\Adidas.csv')


# df.drop("Invoice Date", inplace=True, axis=1)
df.drop("Retailer ID", inplace=True, axis=1)

X = df.drop(columns=['Total Sales'])
y = df['Total Sales']
SEED = 42

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=SEED)

# ////////////////////////traing data////////////////////////

cat_feats = X_train.select_dtypes(include=['object'])

# one hot encoding
ohe = OneHotEncoder(handle_unknown='ignore')
ohe.fit(cat_feats)

ohe_feature_names = ohe.get_feature_names_out(input_features=cat_feats.columns)

num_feats_train = X_train.select_dtypes(
    exclude=['object']).reset_index(drop=True)

cat_feats_train = X_train.select_dtypes(include=['object'])
X_train_cat_ohe = pd.DataFrame(ohe.transform(
    cat_feats_train).toarray(), columns=ohe_feature_names)
X_train_final = pd.concat([num_feats_train, X_train_cat_ohe], axis=1)
final_columns = X_train_final.columns.values

# ///////////////////////testing Data////////////////////////

num_feats_test = X_test.select_dtypes(
    exclude=['object']).reset_index(drop=True)
cat_feats_test = X_test.select_dtypes(include=['object'])
X_test_cat_ohe = pd.DataFrame(ohe.transform(
    cat_feats_test).toarray(), columns=ohe_feature_names)
X_test_final = pd.concat([num_feats_test, X_test_cat_ohe], axis=1)


def finalize_dataline(data_frame):
    num_feats_dataline = data_frame.select_dtypes(
        exclude=['object']).reset_index(drop=True)
    cat_feats_dataline = data_frame.select_dtypes(include=['object'])
    dataline_cat_ohe = pd.DataFrame(ohe.transform(
        cat_feats_dataline).toarray(), columns=ohe_feature_names)
    dataline_final = pd.concat([num_feats_dataline, dataline_cat_ohe], axis=1)
    return dataline_final

# //////////////////////Model Building////////////////////////


xgr = xgb.XGBRegressor(objective='reg:squarederror', random_state=SEED)
xgr.fit(X_train_final, y_train)

y_pred = xgr.predict(X_test_final)
y_pred_c = pd.DataFrame(y_pred, columns=['Predicted Sale'])
pred_vs_test = pd.concat([y_pred_c, y_test.reset_index(drop=True)], axis=1)
print(pred_vs_test.head(10))
print('R2 Score:', r2_score(y_test, y_pred))
print('RSME Score:', mean_squared_error(y_test, y_pred, squared=False))
joblib.dump(xgr, 'xgboost_model_reg.pkl')
