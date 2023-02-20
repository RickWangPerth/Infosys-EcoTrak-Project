from app import db


class Electricityef(db.Model):
    __tablename__ = "electricityef"
    id = db.Column(db.String(200), unique=True, nullable=False, primary_key=True)
    sector = db.Column(db.String(200), unique=False, nullable=False)
    state = db.Column(db.String(200), unique=False, nullable=False)
    sc2 = db.Column(db.Float, unique=False, nullable=False)
    sc3 = db.Column(db.Float, unique=False, nullable=False)
    unit = db.Column(db.String(200), unique=False, nullable=False)

    def __init__(self, id, sector, state, sc2, sc3, unit):
        self.id = id
        self.sector = sector
        self.state = state
        self.sc2 = sc2
        self.sc3 = sc3
        self.unit = unit
    
    def __repr__(self):
        return '[ID:{}, Sector:{}, State:{}, SC2:{}, SC3:{}, Unit:{}]'.format(self.id, self.sector, self.state, self.sc2, self.sc3, self.unit)


class ElecData(db.Model):
    __tablename__ = "elecdata"
    id = db.Column(db.Integer, primary_key=True)
    state = db.Column(db.String(80), unique=False, nullable=False)
    elec = db.Column(db.Float, unique=False, nullable=False)
    unit = db.Column(db.String(80), unique=False, nullable=False)
    result = db.Column(db.Float, unique=False, nullable=False)

    def __init__(self, state, elec,unit,result):
        self.state = state
        self.elec = elec
        self.unit = unit
        self.result = result

    def __repr__(self):
        return '[State:{}, Elec:{}, Unit:{}, Result:{}]'.format(self.state, self.elec, self.unit, self.result)

# class WasteData(db.Model):
#     __tablename__ = "wastedata"
#     id = db.Column(db.Integer, primary_key=True)
#     state = db.Column(db.String(80), unique=False, nullable=False)
#     waste = db.Column(db.Float, unique=False, nullable=False)
#     unit = db.Column(db.String(80), unique=False, nullable=False)
#     result = db.Column(db.Float, unique=False, nullable=False)

#     def __init__(self, state, waste,unit,result):
#         self.state = state
#         self.waste = waste
#         self.unit = unit
#         self.result = result

#     def __repr__(self):
#         return '[State:{}, Waste:{}, Unit:{}, Result:{}]'.format(self.state, self.waste, self.unit, self.result)

class FuelData(db.Model):
    __tablename__ = "fueldata"
    id = db.Column(db.Integer, primary_key=True)
    state = db.Column(db.String(80), unique=False, nullable=False)
    fuel = db.Column(db.Float, unique=False, nullable=False)
    fuelTpye = db.Column(db.String(80), unique=False, nullable=False)
    fuelSubType = db.Column(db.String(80), unique=False, nullable=False)
    unit = db.Column(db.String(80), unique=False, nullable=False)
    result = db.Column(db.Float, unique=False, nullable=False)

    def __init__(self, state, fuel, fuelType ,fuelSubType, unit, result):
        self.state = state
        self.fuel = fuel
        self.fuelType = fuelType
        self.fuelSubType = fuelSubType
        self.unit = unit
        self.result = result
       

    def __repr__(self):
        return '[State:{}, Fuel:{}, FuelType:{}, FuelSubType:{}, Unit:{}, Result:{}]'.format(self.state, self.fuel,self.fuelType, self.fuelSubType, self.unit, self.result )