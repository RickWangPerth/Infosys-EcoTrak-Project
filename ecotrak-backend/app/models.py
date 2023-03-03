from app import db

class USElectricityef(db.Model):
    __tablename__ = "us_emissions"
    id = db.Column(db.String(200), primary_key=True)
    eGRID_Subregion = db.Column(db.String(200), unique=False, nullable=False)
    sc_co2 = db.Column(db.Float, unique=False, nullable=False)
    sc_ch4 = db.Column(db.Float, unique=False, nullable=False)
    sc_n2o = db.Column(db.Float, unique=False, nullable=False)

    def __init__(self, id, eGRID_Subregion, sc_co2, sc_ch4, sc_n2o):
        self.id = id
        self.eGRID_Subregion = eGRID_Subregion
        self.sc_co2 = sc_co2
        self.sc_ch4 = sc_ch4
        self.sc_n2o = sc_n2o

    def __repr__(self):
        return '[ID: {}, eGRID Subregion: {}, sc_co2: {}, sc_ch4: {}, sc_n2o: {}]'.format(self.id, self.eGRID_Subregion, self.sc_co2, self.sc_ch4, self.sc_n2o)
class Electricityef(db.Model):
    __tablename__ = "electricityef"
    id = db.Column(db.String(200), primary_key=True)
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

class Fuelsef(db.Model):
    __tablename__ = "fuels_ef"
    id = db.Column(db.String(200), primary_key=True)
    sector = db.Column(db.String(200), unique=False, nullable=True)
    subsector = db.Column(db.String(200), unique=False, nullable=True)
    type = db.Column(db.String(200), unique=False, nullable=True)
    ratio = db.Column(db.Float, unique=False, nullable=True)
    unit = db.Column(db.String(200), unique=False, nullable=True) 
    sc1_co2 = db.Column(db.Float, unique=False, nullable=True)
    sc1_ch4  = db.Column(db.Float, unique=False, nullable=True)
    sc1_n20  = db.Column(db.Float, unique=False, nullable=True)
    sc1_sum = db.Column(db.Float, unique=False, nullable=True)
    sc3_ef = db.Column(db.Float, unique=False, nullable=True)

    def __init__(self, id, sector, subsector, type, ratio, unit, sc1_co2, sc1_ch4, sc1_n20, sc1_sum, sc3_ef):
        self.id = id
        self.sector = sector
        self.subsector = subsector
        self.type = type
        self.ratio = ratio
        self.unit = unit
        self.sc1_co2 = sc1_co2
        self.sc1_ch4 = sc1_ch4
        self.sc1_n20 = sc1_n20
        self.sc1_sum = sc1_sum
        self.sc3_ef = sc3_ef
    
    def __repr__(self):
        return '[ID:{}, Sector:{}, Subsector:{}, Type:{}, Ratio:{}, Unit:{}, SC1_CO2:{}, SC1_CH4:{}, SC1_N20:{}, SC1_SUM:{}, SC3_EF:{}]'.format(self.id, self.sector, self.subsector, self.type, self.ratio, self.unit, self.sc1_co2, self.sc1_ch4, self.sc1_n20, self.sc1_sum, self.sc3_ef)

class Wasteef(db.Model):
    __tablename__ = "wastes_ef"
    id = db.Column(db.String(200), primary_key=True)
    name = db.Column(db.String(200), unique=False, nullable=True)
    unit = db.Column(db.String(200), unique=False, nullable=True)
    type = db.Column(db.String(200), unique=False, nullable=True)
    value = db.Column(db.Float, unique=False, nullable=True)
    scope = db.Column(db.Float, unique=False, nullable=True)
    ratio = db.Column(db.Float, unique=False, nullable=True)
    treatment = db.Column(db.String(200), unique=False, nullable=True)
    
    def __init__(self, id, name, unit, type, value, scope, ratio, treatment):
        self.id = id
        self.name = name
        self.unit = unit
        self.type = type
        self.value = value
        self.scope = scope
        self.ratio = ratio
        self.treatment = treatment
    
    def __repr__(self):
        return '[ID:{}, Name:{}, Unit:{}, Type:{}, Value:{}, Scope:{}, Ratio:{}, Treatment:{}]'.format(self.id, self.name, self.unit, self.type, self.value, self.scope, self.ratio, self.treatment)

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

class FuelData(db.Model):
    __tablename__ = "fueldata"

    id = db.Column(db.Integer, primary_key=True)
    fuel = db.Column(db.Float, unique=False, nullable=False)
    fuelTpye = db.Column(db.String(80), unique=False, nullable=False)
    fuelSubType = db.Column(db.String(80), unique=False, nullable=False)
    unit = db.Column(db.String(80), unique=False, nullable=False)
    total = db.Column(db.Float, unique=False, nullable=False)
    CO2 = db.Column(db.Float, unique=False, nullable=False)
    CH4 = db.Column(db.Float, unique=False, nullable=False)
    N2O = db.Column(db.Float, unique=False, nullable=False)

    def __init__(self, id, fuel, fuelTpye, fuelSubType, unit, total, CO2, CH4, N2O):
        self.id = id
        self.fuel = fuel
        self.fuelTpye = fuelTpye
        self.fuelSubType = fuelSubType
        self.unit = unit
        self.total = total
        self.CO2 = CO2
        self.CH4 = CH4
        self.N2O = N2O

    def __repr__(self):
        return '[Fuel:{}, FuelType:{}, FuelSubType:{}, Unit:{}, Total:{}, CO2:{}, CH4:{}, N2O:{}]'.format(self.fuel, self.fuelTpye, self.fuelSubType, self.unit, self.total, self.CO2, self.CH4, self.N2O)
class WasteData(db.Model):
    __tablename__ = "wastedata"
    id = db.Column(db.Integer, primary_key=True)
    waste = db.Column(db.Float, unique=False, nullable=False)
    unit = db.Column(db.String(80), unique=False, nullable=False)
    result = db.Column(db.Float, unique=False, nullable=False)
    def __init__(self,waste,unit,result):

        self.waste = waste
        self.unit = unit
        self.result = result

    def __repr__(self):
        return '[ Waste:{}, Unit:{}, Result:{}]'.format( self.waste, self.unit, self.result)
    
class USElecData(db.Model):
    __tablename__ = "US_Emissions"
    id = db.Column(db.Integer, primary_key=True)
    eGRID_Subregion = db.Column(db.String(80), unique=False, nullable=False)
    sc_co2 = db.Column(db.Float, unique=False, nullable=False)
    sc_ch4 = db.Column(db.Float, unique=False, nullable=False)
    sc_n2o = db.Column(db.Float, unique=False, nullable=False)

    def __init__(self, eGRID_Subregion, sc_co2, sc_ch4, sc_n2o):
        self.eGRID_Subregion = eGRID_Subregion
        self.sc_co2 = sc_co2
        self.sc_ch4 = sc_ch4
        self.sc_n2o = sc_n2o

    def __repr__(self):
        return '[eGRID_Subregion:{}, SC_CO2:{}, SC_CH4:{}, SC_N2O:{}]'.format(self.eGRID_Subregion, self.sc_co2, self.sc_ch4, self.sc_n2o)

