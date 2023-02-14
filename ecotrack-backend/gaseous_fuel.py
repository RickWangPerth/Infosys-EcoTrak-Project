import pandas as pd

parameters = pd.read_excel('./Documentation/Emission_Source_Parameters_Data.xlsx',
                           sheet_name=['Electricity', 'Solid Fuel', 'Gaseous Fuel', 'Natural Gas Data', 'Liquid Fuel', 'Solid Waste', 'Wastewater Treatment', 'Waste Incineration', 'Biological Treatment'])

gaseous_fuel_parameters = parameters.get('Gaseous Fuel')
natural_gas_parameters = parameters.get('Natural Gas Data')

# TWO UNIQUE CASES - 1 for Natural Gas and 1 for Liquified Natural Gas

# INPUT FROM FRONT END - Quantity of Fuel Type in tonnes
Q = 100000
# INPUT FROM FRONT END - Type of fuel
type = 'Natural gas distributed in a pipeline'
unit = 'GJ'


def gaseous(Q, type, state, unit):
    for i in range(16):

        if gaseous_fuel_parameters.iloc[i][0] == type:
            if unit == 'GJ':
                EC = 1
            else:
                EC = gaseous_fuel_parameters.iloc[i][1]

            # Scope 1 Emission Factors for CO2, CH4 and N2O
            EF_1_CO2 = gaseous_fuel_parameters.iloc[i][2]
            EF_1_CH4 = gaseous_fuel_parameters.iloc[i][3]
            EF_1_N2O = gaseous_fuel_parameters.iloc[i][4]
            total_EF_1 = gaseous_fuel_parameters.iloc[i][5]

    # Scope 1 Emission
    CO2_e = float(Q) * EC * (EF_1_CO2) / 1000
    CH4_e = float(Q) * EC * (EF_1_CH4) / 1000
    N2O_e = float(Q) * EC * (EF_1_N2O) / 1000
    # Total Combined Emissions
    total_e = float(Q) * EC * total_EF_1 / 1000

    return total_e, CO2_e, CH4_e, N2O_e


total = gaseous(Q, type, unit)
print(total)