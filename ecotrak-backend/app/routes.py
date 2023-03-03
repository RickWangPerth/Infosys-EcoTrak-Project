from app import app, db
from flask import Flask, request,jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from electricity import elecal
from waste import wastecal
from fuel import fuelcal
from US_electricity import uselecal
from app.models import ElecData, FuelData, Electricityef, Fuelsef, Wasteef, WasteData, USElectricityef, USElecData
import json

ma = Marshmallow(app)  
class ElecDataSchema(ma.Schema):
    class Meta:
        fields = ('id', 'state', 'elec', 'unit', 'result')
elecdata_schema = ElecDataSchema()
elecdata_schemas = ElecDataSchema(many=True)
class FuelDataSchema(ma.Schema):
    class Meta:
        fields = ('id', 'fuel', 'fuelTpye', 'fuelSubType', 'unit', 'total', 'CO2', 'CH4', 'N2O')
fueldata_schema = FuelDataSchema()
fueldata_schemas = FuelDataSchema(many=True)

class WasteDataSchema(ma.Schema):
    class Meta:
        fields = ('id', 'waste','unit','result')
wastedata_schema = WasteDataSchema()
wastedata_schemas = WasteDataSchema(many=True)

class USElecDataSchema(ma.Schema):
    class Meta:
        fields = ('id', 'eGRID_Subregion', 'sc_co2', 'sc_ch4', 'sc_n2o')
uselecdata_schema = USElecDataSchema()
uselecdata_schemas = USElecDataSchema(many=True)


class USElectricityefSchema(ma.Schema):
    class Meta:
        fields = ('id','eGRID_Subregion', 'sc_co2', 'sc_ch4', 'sc_n20')
USElectricityef_schema = USElectricityefSchema()
USElectricityef_schemas = USElectricityefSchema(many=True)

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

class WasteefSchema(ma.Schema):
    class Meta:
        fields = ('id','name', 'unit', 'type', 'value','scope', 'ratio', 'treatment')
Wasteef_schema = WasteefSchema()
Wasteef_schemas = WasteefSchema(many=True)

@app.route('/')


# Electricity calculator
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
              state:
              unit:
    responses:
      200:
        description: The response JSON string 
        schema:
          type: array of strings
      404:

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
    result = elecal(elec,state,unit)

    elecdata = ElecData(state, elec,unit,result)
    db.session.add(elecdata)
    db.session.commit()
    return elecdata_schema.jsonify(elecdata)

@app.route('/sc2data/<state>/<unit>', methods=['GET'])
def add_sc2data(state,unit):
    sc2 = Electricityef.query.with_entities(Electricityef.sc2).filter_by(state=state,unit=unit).all()
    sc2_list = [item[0] for item in sc2]
    json_data = json.dumps(sc2_list)
    return  json_data

@app.route('/sc3data/<state>/<unit>', methods=['GET'])
def add_sc3data(state,unit):
    sc3 = Electricityef.query.with_entities(Electricityef.sc3).filter_by(state=state,unit=unit).all()
    sc3_list = [item[0] for item in sc3]
    json_data = json.dumps(sc3_list)
    return  json_data

@app.route('/elecresult', methods=['GET'])
def send_elecresult():
    data = ElecData.query.order_by(ElecData.id.desc()).first()
    result = elecdata_schema.dump(data)
    return jsonify(result)


# fuel calculator
@app.route('/fueltype', methods=['GET'])
def send_fueltype():
    data = Fuelsef.query.with_entities(Fuelsef.subsector).distinct().all()
    data_list = [item[0] for item in data]
    json_data = json.dumps(data_list)
    return  json_data

@app.route('/solidfueltype', methods=['GET'])
def send_solidfueltype():
    data = Fuelsef.query.with_entities(Fuelsef.type).filter_by(subsector='Solid Fuel').all()
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

@app.route('/fueldata', methods=['POST'])
def add_fueldata():
    fuel = request.json['fuel']
    fuelType = request.json['fueltype']
    fuelSubType = request.json['fuelsubtype']
    unit = request.json['unit']
    print(fuel,fuelType,fuelSubType,unit)
    total, CO2, CH4, N2O = fuelcal(fuel,fuelSubType,fuelType,unit)
    fueldata = FuelData(id, fuel, fuelType, fuelSubType, unit, total, CO2, CH4, N2O)
    
    db.session.add(fueldata)
    db.session.commit()
    return fueldata_schema.jsonify(fueldata)

@app.route('/fuelresult', methods=['GET'])
def send_fuelresult():
    data = FuelData.query.order_by(FuelData.id.desc()).first()
    result = fueldata_schema.dump(data)
    return jsonify(result)

# waste calculator
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
    data = Wasteef.query.with_entities(Wasteef.name).filter_by(type='Combined Waste').distinct().all()
    data_list = [item[0] for item in data]
    json_data = json.dumps(data_list)
    return  json_data

@app.route('/wastedata', methods=['POST'])
def add_wastedata():
    waste = request.json['waste']
    type = request.json['type']
    subtype = request.json['subtype']
    unit = request.json['unit']
    result = wastecal(waste, unit, type, subtype)

    wastedata = WasteData(waste,unit,result)
    db.session.add(wastedata)
    db.session.commit()
    return wastedata_schema.jsonify(wastedata)

@app.route('/wasteresult', methods=['GET'])
def send_wasteresult():
    data = WasteData.query.order_by(WasteData.id.desc()).first()
    result = wastedata_schema.dump(data)
    return jsonify(result)

# transport calculator


# US electricity calculator
@app.route('/usregion', methods=['GET'])
def send_usregion():
    data = USElectricityef.query.with_entities(USElectricityef.eGRID_Subregion).distinct().all()
    data_list = [item[0] for item in data]
    json_data = json.dumps(data_list)
    return  json_data

@app.route('/uselecdata', methods=['POST'])
def add_uselecdata():
    region = request.json['region']
    elec = request.json['elec']
    total, CO2, CH4, N2O = uselecal(elec,region)

    uselecdata = USElecData(region, CO2, CH4, N2O)
    db.session.add(uselecdata)
    db.session.commit()
    return uselecdata_schema.jsonify(uselecdata)

@app.route('/uselecresult', methods=['GET'])
def send_uselecresult():
    data = USElecData.query.order_by(USElecData.id.desc()).first()
    result = uselecdata_schema.dump(data)
    return jsonify(result)


