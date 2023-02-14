

from app import app, db
from flask import Flask, request,jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from electricity import elecal
from app.models import ElecData


ma = Marshmallow(app)
    
class ElecDataSchema(ma.Schema):
    class Meta:
        fields = ('id','state', 'elec','unit','result')

elecdata_schema = ElecDataSchema()
elecdata_schemas = ElecDataSchema(many=True)

@app.route('/')
@app.route('/elecdata', methods=['POST'])
def add_elecdata():
    state = request.json['state']
    elec = request.json['elec']
    unit = request.json['unit']
    result = elecal(state,unit,elec)

    elecdata = ElecData(state, elec,unit,result)
    db.session.add(elecdata)
    db.session.commit()
    return elecdata_schema.jsonify(elecdata)

@app.route('/elecresult', methods=['GET'])
def send_data():
    data = ElecData.query.order_by(ElecData.id.desc()).first()
    result = elecdata_schema.dump(data)
    return jsonify(result)

