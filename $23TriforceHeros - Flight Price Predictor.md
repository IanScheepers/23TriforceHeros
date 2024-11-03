# $23TriforceHeros - Flight Price Predictor.
## _COS30049 - Computing Technology Innovation Project_

## Introduction
This web application will allow the user to generate predictions on the average lowest price of domestic flights in a given month and year, using the distance and number of flights flown in that period.
## Installation
*In order to build the local server, you must have python 3.12 installed, ideally using the microsoft store version.
1. Extract the zip file provided.
2. Open Powershell
    1. Change directory (cd) into the extracted files.
    2. Change directory (cd) into the backend file.
    3. run: Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
    4. Select [y]es.
    5. run: python3 -m venv .venv
    6. run: .venv\Scripts\Activate.ps1
    7. run: python -m pip install --upgrade pip
    8. run: python.exe -m pip install "fastapi[standard]"
    9. run: python.exe -m pip install "pandas"
    10. run: python.exe -m pip install "scikit-learn"
    11. run: python.exe -m pip install "pydantic"
    12. run: python.exe -m pip install -e flight_price_model
    13. run: uvicorn main:app --reload
3. Open a new Powershell, without closing the original powershell.
    1. Change directory  (cd) into the extracted files.
    2. Change directory (cd) into the backend file.
    3. run: Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
    4. Select [y]es.
    5. run: winget install Schniz.fnm
    6. run: fnm env --use-on-cd | Out-String | Invoke-Expression
    7. run: fnm use --install-if-missing 22
    8. run: npm install
    9. run: npm start
4. The web application will run in a new window.

## Using the predictor
In order to make a prediction, enter a year, number of flights, month, distance into the text boxes, then click the "PREDICT PRICE" button. Please ensure all data is within these ranges:

- 2010<=year<=3000 
- 0<flights_flown<=2500
- 0<=month<=12
- 200<=km<=3700

While flights flown has an upper limit of 2500, be aware the relationship between it and distance strongly affects the price, and if the number is too great, it may produce nonsensical (i.e. negative) output. As a general rule of thumb, try to avoid exceeding 1000, unless absolutely necessary.

