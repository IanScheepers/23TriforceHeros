## Creating a virtual environment
# FIRST TIME
[navigate to here in powershell]
python3 -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python.exe -m pip install "fastapi[standard]"
python.exe -m pip install "pandas"
python.exe -m pip install "scikit-learn"
python.exe -m pip install -e flight_price_model

# EVERY SUBSEQUENT TIME
[navigate to backend folder]
.venv\Scripts\Activate.ps1
uvicorn main:app --reload

Now you should be able to run the python scripts to run the code

## To select the environment in VSCode
Ctrl+Shift+P
Python: Select Interpreter
choose the one that shows as being in the venv