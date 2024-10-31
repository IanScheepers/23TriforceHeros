# setup.py

from setuptools import setup, find_packages

setup(
    name="flight_price_model",
    version="1.12",
    packages=find_packages(),
    install_requires=[
        "numpy",
        "pandas",
        "scikit-learn",
        "joblib"
    ],
    description="Polynomial regression package for predicting flight prices.",
    author="Ian Scheepers",
    author_email="104455565@student.swin.edu.au",
)