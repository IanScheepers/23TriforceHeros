import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
import joblib

# Load and prepare data
df = pd.read_csv("dfDATAONLY.csv")
dfDATAONLY = pd.DataFrame({
    'Year': df['Year'],
    'Flights Flown': df['Flights Flown'],
    'Month': df['Month'],
    'Price': df['Price'],
    'KM': df['KM']
})

# Separate features and target
X = dfDATAONLY.drop('Price', axis=1)  # Features
y = dfDATAONLY['Price']               # Target variable

lin = LinearRegression()
poly = PolynomialFeatures(degree=8)

lin.fit(poly.fit_transform(X), y)

joblib.dump({
    'poly': poly,
    'lin': lin
}, "pretrained_weights.pkl")