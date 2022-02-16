import os
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, engine, func, or_
from sqlalchemy.ext.automap import automap_base

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
)

engine = create_engine('sqlite:///nfl.db.sqlite')

Base = automap_base()

Base.prepare(engine, reflect=True)

print(Base.classes.keys())

nfl = Base.classes.nfl
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

    return render_template("/player.html")

#################################################

@app.route("/team")
def team():

    return render_template("/team.html")

#################################################

@app.route("/position")
def position():

    return render_template("/position.html")

#################################################
#API

@app.route("/api/nfl")
def nfl_grid():

    session = Session(engine)

    results = session.query(nfl.Player, nfl.Postition, nfl.Total_Fantasy_Points, nfl.Team, nfl.Age, nfl.Total_TDs).all()

    results = [list(r) for r in results]

    table_results = {
        "table": results
    }

    session.close()

    return jsonify(table_results)

if __name__ == "__main__":
    app.run()