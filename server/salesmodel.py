import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import joblib
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.metrics import r2_score, mean_squared_error

#///////////////prepare traing data////////////////////

df = pd.read_csv('C:\\Users\\HP\Desktop\\Sales-Prediction\\Data\\Adidas.csv')


#df.drop("Invoice Date", inplace=True, axis=1)
df.drop("Retailer ID", inplace=True, axis=1)

X = df.drop(columns=['Total Sales'])
y = df['Total Sales']
SEED = 42

X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.2,random_state=SEED)

#////////////////////////traing data////////////////////////

cat_feats = X_train.select_dtypes(include=['object'])

# one hot encoding
ohe = OneHotEncoder(handle_unknown='ignore')
ohe.fit(cat_feats)

ohe_feature_names = ohe.get_feature_names_out(input_features=cat_feats.columns)

num_feats_train = X_train.select_dtypes(exclude=['object']).reset_index(drop=True)

cat_feats_train = X_train.select_dtypes(include=['object'])
X_train_cat_ohe = pd.DataFrame(ohe.transform(cat_feats_train).toarray(), columns=ohe_feature_names)
X_train_final = pd.concat([num_feats_train,X_train_cat_ohe],axis=1)
final_columns = X_train_final.columns.values

#///////////////////////testing Data////////////////////////

num_feats_test = X_test.select_dtypes(exclude=['object']).reset_index(drop=True)
cat_feats_test = X_test.select_dtypes(include=['object'])
X_test_cat_ohe = pd.DataFrame(ohe.transform(cat_feats_test).toarray(), columns=ohe_feature_names)
X_test_final = pd.concat([num_feats_test,X_test_cat_ohe],axis=1)

def finalize_dataline(data_frame):
    num_feats_dataline = data_frame.select_dtypes(exclude=['object']).reset_index(drop=True)
    cat_feats_dataline = data_frame.select_dtypes(include=['object'])
    dataline_cat_ohe = pd.DataFrame(ohe.transform(cat_feats_dataline).toarray(), columns=ohe_feature_names)
    dataline_final = pd.concat([num_feats_dataline, dataline_cat_ohe], axis=1)
    return dataline_final

#//////////////////////Model Building////////////////////////

xgr = xgb.XGBRegressor(objective='reg:squarederror', random_state=SEED)
xgr.fit(X_train_final,y_train)

y_pred = xgr.predict(X_test_final)
y_pred_c=pd.DataFrame(y_pred,columns=['Predicted Sale'])
pred_vs_test = pd.concat([y_pred_c, y_test.reset_index(drop=True)], axis=1)
print(pred_vs_test.head(10))
print('R2 Score:', r2_score(y_test,y_pred))
print('RSME Score:',mean_squared_error(y_test, y_pred, squared=False))
joblib.dump(xgr, 'xgboost_model_reg.pkl')




# X = df.drop(columns=['Item_Outlet_Sales'])
# y = df['Item_Outlet_Sales']
# SEED = 42
# X_train, X_test, y_train, y_test = train_test_split(
#     X, y, test_size=0.3, random_state=SEED)


# def finalize_dataline(data_frame):
#     item_identifier_list_line = [[item]
#                                  for item in data_frame['Item_Identifier']]

#     hashed_data_line = fh.transform(item_identifier_list_line)
#     hashed_dataline_df = pd.DataFrame(hashed_data_line.toarray(), columns=[
#         'H' + str(i) for i in range(hash_vector_size)])
#     num_feats_dataline = data_frame.select_dtypes(
#         exclude=['object']).reset_index(drop=True)
#     cat_feats_dataline = data_frame.select_dtypes(
#         include=['object']).drop(columns=['Item_Identifier'])
#     dataline_cat_ohe = pd.DataFrame(ohe.transform(
#         cat_feats_dataline).toarray(), columns=ohe_feature_names)
#     dataline_final = pd.concat(
#         [num_feats_dataline, hashed_dataline_df, dataline_cat_ohe], axis=1)
#     return dataline_final


# def create_item_type(data_frame):
#     data_frame['Item_Type'] = data_frame['Item_Identifier'].str[:2]
#     data_frame['Item_Type'] = data_frame['Item_Type'].map(
#         {'FD': 'Food', 'NC': 'Non_Consumables', 'DR': 'Drinks'})
#     return data_frame


# X_train_c = X_train.copy()
# X_train_c = create_item_type(X_train_c)
# ITEM_ID_WEIGHT_PIVOT = X_train_c.pivot_table(
#     values='Item_Weight', index='Item_Identifier').reset_index()
# ITEM_ID_WEIGHT_MAPPING = dict(
#     zip(ITEM_ID_WEIGHT_PIVOT['Item_Identifier'], ITEM_ID_WEIGHT_PIVOT['Item_Weight']))
# ITEM_TYPE_WEIGHT_PIVOT = X_train_c.pivot_table(
#     values='Item_Weight', index='Item_Type', aggfunc='median').reset_index()
# ITEM_TYPE_WEIGHT_MAPPING = dict(
#     zip(ITEM_TYPE_WEIGHT_PIVOT['Item_Type'], ITEM_TYPE_WEIGHT_PIVOT['Item_Weight']))


# def impute_item_weight(data_frame):
#     data_frame.loc[:, 'Item_Weight'] = data_frame.loc[:, 'Item_Weight'].fillna(
#         data_frame.loc[:, 'Item_Identifier'].map(ITEM_ID_WEIGHT_MAPPING))
#     data_frame.loc[:, 'Item_Weight'] = data_frame.loc[:, 'Item_Weight'].fillna(
#         data_frame.loc[:, 'Item_Type'].map(ITEM_TYPE_WEIGHT_MAPPING))
#     return data_frame


# X_train_c = impute_item_weight(X_train_c)
# print(X_train_c.isnull().sum())
# OUTLET_TYPE_SIZE_PIVOT = X_train_c.pivot_table(
#     values='Outlet_Size', index='Outlet_Type', aggfunc=lambda x: x.mode().iloc[0]).reset_index()
# OUTLET_TYPE_SIZE_MAPPING = dict(
#     zip(OUTLET_TYPE_SIZE_PIVOT['Outlet_Type'], OUTLET_TYPE_SIZE_PIVOT['Outlet_Size']))


# def impute_outlet_size(data_frame):
#     data_frame.loc[:, 'Outlet_Size'] = data_frame.loc[:, 'Outlet_Size'].fillna(
#         data_frame.loc[:, 'Outlet_Type'].map(OUTLET_TYPE_SIZE_MAPPING))
#     return data_frame


# X_train_c = impute_outlet_size(X_train_c)


# def standardize_item_fat_content(data_frame):
#     data_frame['Item_Fat_Content'] = data_frame['Item_Fat_Content'].replace({'Low Fat': 'Low_Fat', 'LF': 'Low_Fat', 'reg': 'Regular', 'low fat': 'Low_Fat'
#                                                                              })
#     data_frame.loc[data_frame['Item_Type'] ==
#                    'Non_Consumables', 'Item_Fat_Content'] = 'Non_Edible'
#     return data_frame


# def prepare_dataset(data_frame):
#     data_frame = create_item_type(data_frame)
#     data_frame = impute_item_weight(data_frame)
#     data_frame = impute_outlet_size(data_frame)
#     data_frame = standardize_item_fat_content(data_frame)
#     return data_frame


# X_train_c = standardize_item_fat_content(X_train_c)
# X_train = prepare_dataset(X_train)
# X_test = prepare_dataset(X_test)

# hash_vector_size = 50
# fh = FeatureHasher(n_features=hash_vector_size, input_type='string')
# item_identifier_list = [[item] for item in X_train['Item_Identifier']]
# hashed_data = fh.transform(item_identifier_list)
# hashed_df = pd.DataFrame(hashed_data.toarray(), columns=[
#                          'H' + str(i) for i in range(hash_vector_size)])

# cat_feats = X_train.select_dtypes(
#     include=['object']).drop(columns=['Item_Identifier'])
# ohe = OneHotEncoder(handle_unknown='ignore')
# ohe.fit(cat_feats)
# ohe_feature_names = ohe.get_feature_names_out(input_features=cat_feats.columns)
# num_feats_train = X_train.select_dtypes(
#     exclude=['object']).reset_index(drop=True)
# cat_feats_train = X_train.select_dtypes(
#     include=['object']).drop(columns=['Item_Identifier'])
# X_train_cat_ohe = pd.DataFrame(ohe.transform(
#     cat_feats_train).toarray(), columns=ohe_feature_names)
# X_train_final = pd.concat(
#     [num_feats_train, hashed_df, X_train_cat_ohe], axis=1)

# item_identifier_list_test = [[item] for item in X_test['Item_Identifier']]
# hashed_data_test = fh.transform(item_identifier_list_test)
# hashed_test_df = pd.DataFrame(hashed_data_test.toarray(), columns=[
#                               'H' + str(i) for i in range(hash_vector_size)])
# num_feats_test = X_test.select_dtypes(
#     exclude=['object']).reset_index(drop=True)
# cat_feats_test = X_test.select_dtypes(
#     include=['object']).drop(columns=['Item_Identifier'])
# X_test_cat_ohe = pd.DataFrame(ohe.transform(
#     cat_feats_test).toarray(), columns=ohe_feature_names)
# X_test_final = pd.concat(
#     [num_feats_test, hashed_test_df, X_test_cat_ohe], axis=1)

# xgr = xgb.XGBRegressor(objective='reg:squarederror', random_state=SEED)
# xgr.fit(X_train_final, y_train)
# y_pred = xgr.predict(X_test_final)
# y_pred_c = pd.DataFrame(y_pred, columns=['Predicted Sale'])
# pred_vs_test = pd.concat([y_pred_c, y_test.reset_index(drop=True)], axis=1)
# print(pred_vs_test.head(10))
# print('R2 Score:', r2_score(y_test, y_pred))
# print('RSME Score:', mean_squared_error(y_test, y_pred, squared=False))
# joblib.dump(xgr, 'xgboost_model.pkl')
