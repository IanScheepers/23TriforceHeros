from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from flight_price_model import FlightPriceModel
from pydantic import BaseModel, Field
from utils import logger

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

# Define a Pydantic model to validate and parse input data for prediction
class PredictionInput(BaseModel):
    year: int = Field(ge=2010, le=3000, description="Year of the flight") #2010<=year<=3000
    flights_flown: int = Field(gt=0, description="Amount of flights that this route has seen this month") #0<flights_flown
    month: int = Field(ge=0, le=12, description="Month of the flight") #0<=month<=12
    km: int = Field(ge=200, le=3700, description="Flight distance in kms rounded to nearest whole") #200<=km<=3700
  
# Define a POST endpoint for predicting flight prices
@app.get("/predict")
async def predict_price(input: PredictionInput):
    try:
        price = model.predict(input.year, input.flights_flown, input.month, input.km)[0]
        logger.info(f"Prediction made: {price} for {input.month}/{input.year}, a {input.km}km flight with {input.flights_flown} other flights on that route that month.")
        return {"price": round(price, 2)}
    except ValueError as e:
        logger.error(f"Recieved invalid input: {str(e)}")
        raise HTTPException(status_code=400, detail=f"\
                            Invalid input: {str(e)}")
    except Exception as e:
        logger.error(f"Error during prediction: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

#Define a GET endpoint for predicting flight prices
# @app.get("/predict/{year}/{flights_flown}/{month}/{km}")
# async def predict_price(year: int, flights_flown: int, month: int, km: int):
#     try:
#         price = model.predict(year, flights_flown, month, km)[0]
#         return {"price": round(price, 2)}
#     except ValueError as e:
#         raise HTTPException(status_code=400, detail=f"\
#                             Invalid input: {str(e)}")
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)