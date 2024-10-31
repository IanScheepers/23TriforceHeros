## Creating a virtual environment
# FIRST TIME
[navigate to here in powershell]
python3 -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python.exe -m pip install "fastapi[standard]"
python.exe -m pip install "pandas"
python.exe -m pip install "matplotlib"
python.exe -m pip install "seaborn"
python.exe -m pip install "scikit-learn"

# EVERY SUBSEQUENT TIME
.venv\Scripts\Activate.ps1

Now you should be able to run the python scripts to run the code

## To select the environment in VSCode
Ctrl+Shift+P
Python: Select Interpreter
choose the one that shows as being in the venv