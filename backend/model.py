import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures

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

# Predict for new data
X_new = np.array([[2018, 401, 12, 476]])     # New input example
X_new_poly = poly.transform(X_new)    # Transform it to polynomial features

# Get the prediction
print(f'Polynomial Regression result for new data: {lin.predict(X_new_poly)}')