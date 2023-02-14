import pandas as pd

parameters = pd.read_excel('./Documentation/Emission_Source_Parameters_Data.xlsx',
                           sheet_name=['Electricity', 'Solid Fuel', 'Gaseous Fuel', 'Natural Gas Data', 'Liquid Fuel kL', 'Liquid Fuel t', 'Solid Waste', 'Wastewater Treatment', 'Waste Incineration', 'Biological Treatment'])

liquid_fuel_kL_parameters = parameters.get('Liquid Fuel kL')
liquid_fuel_t_parameters = parameters.get('Liquid Fuel t')

# INPUT FROM FRONT END - Quantity of Fuel Type in tonnes
Q = 700
# INPUT FROM FRONT END - Type of fuel
type = 'Diesel oil'
mass_unit = 'kL'
unit = 'kL'


def liquid(Q, type, unit):
    for i in range(20):
        if mass_unit == 'kL':
            if liquid_fuel_kL_parameters.iloc[i][0] == type:
                if unit == 'GJ':
                    EC = 1
                else:
                    EC = liquid_fuel_kL_parameters.iloc[i][1]

                # Scope 1 Emission Factors for CO2, CH4 and N2O
                EF_1_CO2 = liquid_fuel_kL_parameters.iloc[i][2]
                EF_1_CH4 = liquid_fuel_kL_parameters.iloc[i][3]
                EF_1_N2O = liquid_fuel_kL_parameters.iloc[i][4]
                total_EF_1 = EF_1_CO2 + EF_1_CH4 + EF_1_N2O
                # Scope 3 Emission Factor
                EF_3 = liquid_fuel_kL_parameters.iloc[i][6]
        else:
            if liquid_fuel_t_parameters.iloc[i][0] == type:
                if unit == 'GJ':
                    EC = 1
                else:
                    EC = liquid_fuel_t_parameters.iloc[i][1]

                # Scope 1 Emission Factors for CO2, CH4 and N2O
                EF_1_CO2 = liquid_fuel_t_parameters.iloc[i][2]
                EF_1_CH4 = liquid_fuel_t_parameters.iloc[i][3]
                EF_1_N2O = liquid_fuel_t_parameters.iloc[i][4]
                total_EF_1 = EF_1_CO2 + EF_1_CH4 + EF_1_N2O
                # Scope 3 Emission Factor
                EF_3 = liquid_fuel_t_parameters.iloc[i][6]

    # Scope 1 Emission
    CO2_e = float(Q) * EC * (EF_1_CO2) / 1000
    CH4_e = float(Q) * EC * (EF_1_CH4) / 1000
    N2O_e = float(Q) * EC * (EF_1_N2O) / 1000
    # Scope 3 Emission
    scope_3_e = float(Q) * EC * (EF_3) / 1000
    # Total Combined Emissions
    total_e = float(Q) * EC * (total_EF_1 + EF_3) / 1000

    return total_e, CO2_e, CH4_e, N2O_e, scope_3_e


total = liquid(Q, type, unit)
print(total)