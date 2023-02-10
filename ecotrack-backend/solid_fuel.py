import pandas as pd

parameters = pd.read_excel('./Documentation/Emission_Source_Parameters_Data.xlsx',
                           sheet_name=['Electricity', 'Solid Waste', 'Wastewater Treatment', 'Waste Incineration', 'Biological Treatment'])

electricity_parameters = parameters.get('Electricity')


def solid_fuel_calc(Q, EC, EF_1, EF_3):
    solid_e = Q * EC * (EF_1 + EF_3) / 1000
    return solid_e
