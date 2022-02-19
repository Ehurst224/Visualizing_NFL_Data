from flask import Flask, render_template, redirect,jsonify
# from flask_pymongo import PyMongo
# import scrape_costa
from sqlalchemy import create_engine
# import pandas as pd

# Download the Iris Dataset and place it in the same directory as this newapp.py
# file.  Then comment out everything but the lines 14,15,16.  Run it.
# Create a very basic index.html file and place it in your templates directory.
# Then comment out lines 15 and 16 and uncomment the rest of the file
# Rerun and visit http://127.0.0.1:5000/data
# Use d3.json(http://127.0.0.1:5000/data).then() to access that data for your
# plot.  Now you have an api feeding your web app data all controlled by flask
# engine = create_engine('sqlite:///mydatabase.db')
# df = pd.read_csv('iris.csv')
# df.to_sql('iris',engine)
# Create an instance of Flask


app = Flask(__name__)


# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    # Return template and data
    return render_template("index.html")

#################################################

@app.route("/data")
def data():

    return render_template("data.html")

#################################################

@app.route("/player")
def player():

    return render_template("player.html")

#################################################

@app.route("/team")
def team():

    return render_template("team.html")

#################################################

@app.route("/position")
def position():

    return render_template("position.html")

#################################################

# @app.route("/data")
# def scrape():
#     # Run the scrape function
#     data = pd.read_sql('iris',engine)
#     return jsonify(data.to_dict())
#     # Redirect back to home page
  

if __name__ == "__main__":
    app.run(debug=True)


