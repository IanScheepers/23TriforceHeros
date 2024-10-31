import pandas as pd
from datetime import datetime 
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn import datasets
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, classification_report
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import silhouette_score

# Read in the and process the dataets datasets

## manual data maniplulation explainations
## These data sets have been synced in time  (only dates from 2010(jan)-2024(jan) contained)
##all redundant data was been removed e.g. "all port -> all ports" + individual airlines data. only the summaried data from all airlines will be used
## month combo column was created

## Reading in the raw RAW DATA
dfPrices = pd.read_csv('FlightPriceData.csv') # Port1, Port2
dfTimes = pd.read_csv('FlightTimeFrequencyData.csv') # Departing_Port, Arriving_Port
dfDistance = pd.read_csv('FlightPortDistancesData.csv') # lengths of flights (km) 

## there are some airports only present in a given dataset. these need to be timmed to create 1 uniform dataset

## get all the unique routes from this 1stdataset
routes1 = []
counter = 0
for route in dfPrices["Route"]:
    if route not in routes1:
        str = route.replace(" ", "") + dfPrices["MonthCombo"][counter] ## ensure no spaces
        routes1.append(str)
        counter+=1
        
## get all the unique routes from this 2nd dataset
counter = 0
routes2 = []
for route in dfTimes["Route"]:
    if route not in routes2:
        str = route.replace(" ", "")+ dfTimes["Month"][counter]
        routes2.append(str)
        counter+=1

## find all the common routes,month,year combos to keep
routes_to_keep = []
for route in routes1:
    if route in routes2:
        routes_to_keep.append(route)

routes_to_keep.sort()
print("Routes to keep:")
print (len(routes_to_keep))

## creating a dictionary of route names and their distances
counter = 0
airportDistDict = {}
for airport in dfDistance["AIRPORT NAME"]:
    str = (dfDistance["AIRPORT NAME"][counter] + "-" + dfDistance["AIRPORT NAME 2"][counter]).replace(" ", "")
    str2 = (dfDistance["AIRPORT NAME 2"][counter] + "-" + dfDistance["AIRPORT NAME"][counter]).replace(" ", "")
    airportDistDict[str] = dfDistance["KM"][counter]
    airportDistDict[str2] = dfDistance["KM"][counter]
    counter+=1

## adding some manual ones that dont exist in the dataset but do exist in the other datasets
#SunshineCoast-Sydney,SunshineCoast-Melbourne, Newcastle-GoldCoast,Melbourne-Newcastle, Brisbane-Newcastle
## rounded to the nearest whole
airportDistDict["SunshineCoast-Sydney"] = 836
airportDistDict["SunshineCoast-Melbourne"] = 1873
airportDistDict["Newcastle-GoldCoast"] = 649
airportDistDict["Melbourne-Newcastle"] = 1028
airportDistDict["Brisbane-Newcastle"] = 755

print("Known Route Lengths:")
print(len(airportDistDict))
##print(airportDistDict)
##print(airportDistDict["AbuDhabi-Adelaide"])

## syncing routes!

## remove all routes not in the "routes to keep list" from dataset 1
indexToRemove = []
for x in range(len(dfTimes)):
        str = dfTimes.iloc[x]["Route"].replace(" ", "") + dfTimes.iloc[x]["Month"]
        if str not in routes_to_keep:
            indexToRemove.append(x)
dfTimes.drop(dfTimes.index[indexToRemove],inplace=True)

## remove all routes not in the "routes to keep list" dataset 2
indexToRemove = []
for x in range(len(dfPrices)):
        str = dfPrices.iloc[x]["Route"].replace(" ", "")+ dfPrices.iloc[x]["MonthCombo"]
        if str not in routes_to_keep:
            indexToRemove.append(x)
dfPrices.drop(dfPrices.index[indexToRemove],inplace=True)

print("Check LENGTHS are the same")
print(len((dfPrices)))
print(len((dfTimes)))

## create compound key in both df's to sort the data into the same order before creating a combined dataset
## the key will be route name+month

## dataset 1 key
routeNameKey1 = []
sortData1 = []
for x in range(len(dfPrices)):
    str = dfPrices.iloc[x]["Route"].replace(" ", "")+ dfPrices.iloc[x]["MonthCombo"]
    routeNameKey1.append(str)
    sortData1.append(routes_to_keep.index(str))

dfPrices["COMBOKEY1"] = routeNameKey1
dfPrices["sortData1"] = sortData1
dfPrices.reset_index(drop=True, inplace=True)
dfPrices.sort_values(by=['COMBOKEY1'], ascending=True,inplace=True)
dfPrices.reset_index(drop=True, inplace=True)
dfPrices.sort_values(by=['sortData1'], ascending=True,inplace=True)

## dataset 2 key
routeNameKey2 = []
sortData2 = []
for x in range(len(dfTimes)):
    str = dfTimes.iloc[x]["Route"].replace(" ", "")+ dfTimes.iloc[x]["Month"]
    routeNameKey2.append(str)
    sortData2.append(routes_to_keep.index(str))

dfTimes["COMBOKEY2"] = routeNameKey2
dfTimes["sortData2"] = sortData2
dfTimes.reset_index(drop=True, inplace=True)
dfTimes.sort_values(by=['COMBOKEY2'], ascending=True,inplace=True)
dfTimes.reset_index(drop=True, inplace=True)
dfTimes.sort_values(by=['sortData2'], ascending=True,inplace=True)

## export the processed datasets for viewing if needed
#dfPrices.to_csv('FlightPriceDataPROCESSED.csv')
#dfTimes.to_csv('FlightTimeFrequencyDataPROCESSED.csv')

## create a blank DF
df = pd.DataFrame()

## selected columns
## Dataset1
df["Year"] = dfPrices["Year"]
df["Month"] = dfPrices["Month"]
df["Price"] = dfPrices["$Real"]
df["RouteNames"] = dfPrices["Route"]

## Dataset2
df["YearMonthCombined"] = dfTimes["Month"]
df["Flights Flown"] = dfTimes["Sectors_Flown"]

## create a new list of routes to distances using the dict
distList = []
for route in df["RouteNames"]:
    if route.replace(" ", "") in airportDistDict.keys():
        distList.append(airportDistDict[route.replace(" ", "")])
    else:
         distList.append("UNKNOWN")
        
df["KM"] = distList

## only used for data verification
df["COMBOKEY1"] = dfPrices["COMBOKEY1"] ## only used to verify the data works as intended
df["COMBOKEY2"] = dfTimes["COMBOKEY2"] ## only used to verify the data works as intended

## to view the dataset to test data was alligned correctly
#df.to_csv('COMPILED.csv')


## this is used for the correlation matrix visualisation and other visualisations
CORMATRIXDATA = pd.DataFrame()
CORMATRIXDATA['Year'] = df['Year']  
CORMATRIXDATA['Flights Flown'] = df['Flights Flown']
CORMATRIXDATA['Month'] = df['Month']
CORMATRIXDATA['Price'] = df['Price'] 
CORMATRIXDATA['KM'] = df['KM']

## this is a separate df with only the features needed to train the models
dfDATAONLY = pd.DataFrame()
dfDATAONLY['Year'] = df['Year']
dfDATAONLY['Flights Flown'] = df['Flights Flown']
dfDATAONLY['Month'] = df['Month']
dfDATAONLY['Price'] = df['Price'] 
dfDATAONLY['KM'] = df['KM']


## to view the final filtered data (only selected features)
#dfDATAONLY.to_csv('dfDATAONLY.csv')

print("COMPLETE")

#14
## poly regression model
## split dataset into features and testing
X = dfDATAONLY.drop('Price', axis=1)  # Features
#X = dfDATAONLY[['KM']]  # Features
#X = dfDATAONLY[['Flights Flown']]  # Features
y = dfDATAONLY['Price']  # Target variable

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Standardize the features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

## linear model which this will be based of
lin = LinearRegression()

## the poly model
poly = PolynomialFeatures(degree=8)
X_poly_train = poly.fit_transform(X_train_scaled)
X_test_poly = poly.transform(X_test_scaled)
## fit the models
poly.fit(X_poly_train,y_train)
lin.fit(X_poly_train,y_train)

## predict linear
y_pred = lin.predict(X_test_poly)
print('Mean Squared Error: %.2f' % mean_squared_error(y_test, y_pred))
print('R^2 Score: %.2f' % r2_score(y_test, y_pred))

##check for over fitting
y_pred_train = lin.predict(X_poly_train)
print('Mean Squared Error: %.2f' % mean_squared_error(y_train,y_pred_train))
print('R^2 Score: %.2f' % r2_score(y_train,y_pred_train))