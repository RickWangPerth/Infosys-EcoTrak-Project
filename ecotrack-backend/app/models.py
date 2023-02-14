from app import db

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


class WasteData(db.Model):
    __tablename__ = "wastedata"
    id = db.Column(db.Integer, primary_key=True)
    state = db.Column(db.String(80), unique=False, nullable=False)
    waste = db.Column(db.Float, unique=False, nullable=False)
    unit = db.Column(db.String(80), unique=False, nullable=False)
    result = db.Column(db.Float, unique=False, nullable=False)

    def __init__(self, state, waste,unit,result):
        self.state = state
        self.waste = waste
        self.unit = unit
        self.result = result

    def __repr__(self):
        return '[State:{}, Waste:{}, Unit:{}, Result:{}]'.format(self.state, self.waste, self.unit, self.result)

class FuelData(db.Model):
    __tablename__ = "fueldata"
    id = db.Column(db.Integer, primary_key=True)
    state = db.Column(db.String(80), unique=False, nullable=False)
    fuel = db.Column(db.Float, unique=False, nullable=False)
    unit = db.Column(db.String(80), unique=False, nullable=False)
    result = db.Column(db.Float, unique=False, nullable=False)

    def __init__(self, state, fuel,unit,result):
        self.state = state
        self.fuel = fuel
        self.unit = unit
        self.result = result

    def __repr__(self):
        return '[State:{}, Fuel:{}, Unit:{}, Result:{}]'.format(self.state, self.fuel, self.unit, self.result)