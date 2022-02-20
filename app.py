import os
from flask.globals import session
import pandas as pd
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, engine, func, or_
from sqlalchemy.ext.automap import automap_base

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)


engine = create_engine("sqlite:///league.db")

Base = automap_base()

Base.prepare(engine, reflect=True)

print(Base.classes.keys())

nfl = Base.classes.nfl
nfl_clean = Base.classes.nfl_all
qb = Base.classes.qb
rb = Base.classes.rb
te = Base.classes.te
wr = Base.classes.wr

app = Flask(__name__)

@app.route("/")
def home():

    return render_template('index.html')

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
#API

@app.route("/api/nfl")
def nfl_grid():

    df = pd.read_sql_table('nfl_all',con=engine)
    table_results = df.to_dict('records')
    print(df)
    return jsonify(table_results)


if __name__ == "__main__":
    app.run(debug=True)