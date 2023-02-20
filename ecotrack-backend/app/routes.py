from app import app, db
from flask import Flask, request,jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from electricity import elecal
from solid_fuel import solidfuelcal
from liquid_fuel import liquidfuelcal
# from gaseous_fuel import gaseousfuelcal
from app.models import ElecData, FuelData, Electricityef, Fuelsef, Wasteef
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
        fields = ('id','state', 'sc2', 'sc3', 'unit')
Electricityef_schema = ElectricityefSchema()
Electricityef_schemas = ElectricityefSchema(many=True)

class FuelsefSchema(ma.Schema):
    class Meta:
        fields = ('id','sector', 'subsector', 'type', 'ratio', 'unit', 'sc1_co2', 'sc1_ch4', 'sc1_n20', 'sc1_sum', 'sc3_ef')
Fuelsef_schema = FuelsefSchema()
Fuelsef_schemas = FuelsefSchema(many=True)

# class WasteDataSchema(ma.Schema):
#     class Meta:
#         fields = ('id','state', 'waste','unit','result')
# wastedata_schema = WasteDataSchema()
# wastedata_schemas = WasteDataSchema(many=True)

@app.route('/')


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
        description: The response JSON string 
        schema:
          type: array of strings
    """
    data = Electricityef.query.with_entities(Electricityef.state).filter_by(unit='kWh').all()
    data_list = [item[0] for item in data]
    json_data = json.dumps(data_list)
    return  json_data


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
def send_elecresult():
    data = ElecData.query.order_by(ElecData.id.desc()).first()
    result = elecdata_schema.dump(data)
    return jsonify(result)

@app.route('/fueltype', methods=['GET'])
def send_fueltype():
    data = Fuelsef.query.with_entities(Fuelsef.subsector).distinct().all()
    data_list = [item[0] for item in data]
    json_data = json.dumps(data_list)
    return  json_data

@app.route('/solidfueltype', methods=['GET'])
def send_solidfueltype():
    data = Fuelsef.query.with_entities(Fuelsef.type).filter_by(subsector='Soild Fuel').all()
    data_list = [item[0] for item in data]
    json_data = json.dumps(data_list)
    return  json_data

@app.route('/liquidfueltype', methods=['GET'])
def send_liquidfueltype():
    data = Fuelsef.query.with_entities(Fuelsef.type).filter_by(subsector='Liquid Fuel').all()
    data_list = [item[0] for item in data]
    json_data = json.dumps(data_list)
    return  json_data

@app.route('/gaseousfueltype', methods=['GET'])
def send_gaseousfueltype():
    data = Fuelsef.query.with_entities(Fuelsef.type).filter_by(subsector='Gaseous Fuel').all()
    data_list = [item[0] for item in data]
    json_data = json.dumps(data_list)
    return  json_data

@app.route('/wastetype', methods=['GET'])
def send_wastetype():
    data = Wasteef.query.with_entities(Wasteef.type).distinct().all()
    data_list = [item[0] for item in data]
    json_data = json.dumps(data_list)
    return  json_data

@app.route('/solidwastetype', methods=['GET'])
def send_solidwastetype():
    data = Wasteef.query.with_entities(Wasteef.name).filter_by(type='Solid Waste').distinct().all()
    data_list = [item[0] for item in data]
    json_data = json.dumps(data_list)
    return  json_data

@app.route('/combinedwastetype', methods=['GET'])
def send_combinedwastetype():
    data = Wasteef.query.with_entities(Wasteef.name).filter_by(type='combined Waste').distinct().all()
    data_list = [item[0] for item in data]
    json_data = json.dumps(data_list)
    return  json_data
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