from app import db

class Electricityef(db.Model):
    __tablename__ = "electricityef"
    state = db.Column(db.String(80), unique=False, nullable=False, primary_key=True)
    scope2_kgco2pkwh = db.Column(db.Float, unique=False, nullable=False)
    scope2_kgco2pGJ = db.Column(db.Float, unique=False, nullable=False)
    scope3_kgco2pkwh = db.Column(db.Float, unique=False, nullable=False)
    scope3_kgco2pGJ = db.Column(db.Float, unique=False, nullable=False)

    def __repr__(self):
        return '[State:{}, Scope2_kgco2pkwh:{}, Scope2_kgco2pGJ:{}, Scope3_kgco2pkwh:{}, Scope3_kgco2pGJ:{}]'.format(self.state, self.scope2_kgco2pkwh, self.scope2_kgco2pGJ, self.scope3_kgco2pkwh, self.scope3_kgco2pGJ)


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