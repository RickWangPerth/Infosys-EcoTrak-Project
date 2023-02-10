import pandas as pd

parameters = pd.read_excel('./Documentation/Emission_Source_Parameters_Data.xlsx',
                           sheet_name=['Electricity', 'Solid Waste', 'Wastewater Treatment', 'Waste Incineration', 'Biological Treatment'])

electricity_parameters = parameters.get('Electricity')
# Emissions based on electricity from electrical grid

# Q_elec = 11300000  # INPUT FROM FRONT END - ENERGY USAGE
# state = 'National'       # INPUT FROM FRONT END - STATE
# unit = 'kWh'

def elecal(state,unit,Q_elec):
    for i in range(12):
        if unit == 'kWh':
            if electricity_parameters.iloc[i][0] == state:
                EF_2 = electricity_parameters.iloc[i][1]
                EF_3 = electricity_parameters.iloc[i][3]
                print(state)
        if unit == 'GJ':
            if electricity_parameters.iloc[i][0] == state:
                EF_2 = electricity_parameters.iloc[i][2]
                EF_3 = electricity_parameters.iloc[i][4]
                print(state)
    elec_e =  float(Q_elec) * (EF_2 + EF_3) / 1000
    return elec_e 
