import datetime
from flask import Flask, request,jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from electricity import elecal

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://rick:''@localhost/rick'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
class ElecData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    state = db.Column(db.String(80), unique=False, nullable=False)
    elec = db.Column(db.Float, unique=False, nullable=False)
    unit = db.Column(db.String(80), unique=False, nullable=False)
    date = db.Column(db.String(80), unique=False, nullable=False, default= datetime.datetime.now)

    def __init__(self, state, elec, unit):
        self.state = state
        self.elec = elec
        self.unit = unit
    
class ElecDataSchema(ma.Schema):
    class Meta:
        fields = ('id','state', 'elec','unit','date')

elecdata_schema = ElecDataSchema()
elecdata_schemas = ElecDataSchema(many=True)
    
@app.route('/elecdata', methods=['POST'])
def add_elecdata():
    state = request.json['state']
    elec = request.json['elec']
    unit = request.json['unit']

    elecdata = ElecData(state, elec, unit)
    db.session.add(elecdata)
    db.session.commit()
    return elecdata_schema.jsonify(elecdata)

@app.route('/data', methods=['GET'])
def send_data():
    # data = ElecData.query.order_by(ElecData.id.desc()).first()
    # result = elecdata_schema.dump(data)
    data = elecal("National","kwh",11300000)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)