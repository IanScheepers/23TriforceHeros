from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from flight_price_model import FlightPriceModel

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # URL of React application
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load data and initialize the model
model = FlightPriceModel(degrees=8, load=True)

@app.get("/")
async def root():
    return {"message": "This is the flight price prediction API."}

@app.get("/predict/{year}/{flights_flown}/{month}/{km}")
async def predict_price(year: int, flights_flown: int, month: int, km: int):
    try:
        price = model.predict(year, flights_flown, month, km)
        return {"price": round(price, 2)}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"\
                            Invalid input: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Load and predict
print("Prediction:", model.predict(2018, 401, 12, 476))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)