from flight_price_model import FlightPriceModel

# Load data and initialize the model
model = FlightPriceModel(degrees=8)

# Train and save the model
model.dump_weights_from_csv("dfDATAONLY.csv")

# Load and predict
model.load_weights()
print("Prediction:", model.predict(2018, 401, 12, 476))