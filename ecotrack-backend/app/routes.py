

from app import app, db
from flask import Flask, request,jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from electricity import elecal
from solid_fuel import solidfuelcal
from liquid_fuel import liquidfuelcal
# from gaseous_fuel import gaseousfuelcal
from app.models import ElecData, FuelData, Electricityef
import json

ma = Marshmallow(app)  
class ElecDataSchema(ma.Schema):
    class Meta:
        fields = ('id', 'state', 'elec', 'unit', 'result')
elecdata_schema = ElecDataSchema()
elecdata_schemas = ElecDataSchema(many=True)

class FuelDataSchema(ma.Schema):
    class Meta:
        fields = ('id','state', 'fuel', 'unit', 'result', 'fuelType')
fueldata_schema = FuelDataSchema()
fueldata_schemas = FuelDataSchema(many=True)

class ElectricityefSchema(ma.Schema):
    class Meta:
        fields = ('state', 'scope2_kgco2pkwh', 'scope2_kgco2pGJ', 'scope3_kgco2pkwh', 'scope3_kgco2pGJ')
Electricityef_schema = ElectricityefSchema()
Electricityef_schemas = ElectricityefSchema(many=True)

# class WasteDataSchema(ma.Schema):
#     class Meta:
#         fields = ('id','state', 'waste','unit','result')
# wastedata_schema = WasteDataSchema()
# wastedata_schemas = WasteDataSchema(many=True)

@app.route('/')
# @app.route('/index')
# def index():
#     #data = Electricityef.query.filter_by(state='National').first()
#     #result = Electricityef_schema.dump(data)

#     # data = Electricityef.query.all()
#     # result = Electricityef_schemas.dump(data)
#     data = Electricityef.query.with_entities(Electricityef.state).all()
#     data_list = [item[0] for item in data]
#     json_data = json.dumps(data_list)
#     return  json_data
#     #return jsonify(result)
#     #return data

@app.route('/statedata', methods=['GET'])

def send_statedata():
    """
    This is an example route that takes a JSON object and returns a string.

    ---
    parameters:
      - in: body
        name: body
        description: JSON object containing parameters
        schema:
          type: object
          properties:
            key:
              type: string
    responses:
      200:
        description: The response string
        schema:
          type: string
    """
    data = Electricityef.query.with_entities(Electricityef.state).all()
    data_list = [item[0] for item in data]
    json_data = json.dumps(data_list)
    return  json_data


# @app.route('/elecdata', methods=['POST'])
# def add_elecdata():
#     state = request.json['state']
#     elec = request.json['elec']
#     unit = request.json['unit']
#     result = elecal(state,unit,elec)

#     elecdata = ElecData(state, elec,unit,result)
#     db.session.add(elecdata)
#     db.session.commit()
#     return elecdata_schema.jsonify(elecdata)

@app.route('/elecresult', methods=['GET'])
def send_elecresult():
    data = ElecData.query.order_by(ElecData.id.desc()).first()
    result = elecdata_schema.dump(data)
    return jsonify(result)


# @app.route('/wastedata', methods=['POST'])
# def add_wastedata():
#     state = request.json['state']
#     waste = request.json['waste']
#     unit = request.json['unit']
#     result = wastecal(state,unit,waste)

#     wastedata = WasteData(state, waste,unit,result)
#     db.session.add(wastedata)
#     db.session.commit()
#     return wastedata_schema.jsonify(wastedata)

# @app.route('/wasteresult', methods=['GET'])
# def send_wasteresult():
#     data = WasteData.query.order_by(WasteData.id.desc()).first()
#     result = wastedata_schema.dump(data)
#     return jsonify(result)

# @app.route('/fueldata', methods=['POST'])
# def add_fueldata():
#     state = request.json['state']
#     fuel = request.json['fuel']
#     fuelType = request.json['fueltype']
#     fuelSubType = request.json['fuelsubtype']
#     unit = request.json['unit']
#     if fuelType == 'solid':
#         result = solidfuelcal(fuel,fuelSubType)
#     # elif fuelType == 'liquid':
#     #     result = liquidfuelcal(state,unit,fuel)
#     # elif fuelType == 'gaseous':
#     #     result = gaseousfuelcal(state,unit,fuel)

#     fueldata = FuelData(state, fuel, fuelType, fuelSubType, unit, result)
#     db.session.add(fueldata)
#     db.session.commit()
#     return fueldata_schema.jsonify(fueldata)

# @app.route('/fuelresult', methods=['GET'])
# def send_fuelresult():
#     data = FuelData.query.order_by(FuelData.id.desc()).first()
#     result = fueldata_schema.dump(data)
#     return jsonify(result)