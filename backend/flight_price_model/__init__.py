import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
import joblib

class FlightPriceModel:
    def __init__(self, degrees, load):
        self.poly = PolynomialFeatures(degree=degrees)
        self.lin = LinearRegression()
        if load:
            self.load_weights()
    
    def predict(self, year, flightsFlown, month, km):
        X_new = np.array([[year, flightsFlown, month, km]])
        X_new_poly = self.poly.transform(X_new)
        return self.lin.predict(X_new_poly)
    
    def load_weights(self):
        weights = joblib.load("data/pretrained_weights.pkl")
        self.poly = weights['poly']
        self.lin = weights['lin']

    def dump_weights_from_csv(self, filepath):
        df = pd.read_csv(filepath)
        dfDATAONLY = pd.DataFrame({
            'Year': df['Year'],
            'Flights Flown': df['Flights Flown'],
            'Month': df['Month'],
            'Price': df['Price'],
            'KM': df['KM']
        })
        X = dfDATAONLY.drop('Price', axis=1)
        y = dfDATAONLY['Price']

        self.lin.fit(self.poly.fit_transform(X), y)

        joblib.dump({
            'poly': self.poly,
            'lin': self.lin
        }, "data/pretrained_weights.pkl")