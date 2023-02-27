import psycopg2
import pandas as pd

host = 'localhost'
database = 'ecotrakv2'
user = 'postgres'
password = 'pB1@ckburn'
table_name = 'transport_ef'
column_names = ['id', 'transport_type', 'fuel_type', 'unit', 'ratioGJperKL',
                'sc1_co2', 'sc1_ch4', 'sc1_n20', 'sc1_sum', 'sc3_ef']

# Connection parameters
param_dic = {
    "host": host,
    "database": database,
    "user": user,
    "password": password
}


def connect(params_dic):
    """ Connect to the PostgreSQL database server """
    conn = None
    try:
        # connect to the PostgreSQL server
        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(**params_dic)
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        sys.exit(1)
    print("Connection successful")
    return conn


def postgresql_to_dataframe(conn, select_query, column_names):
    """
    Tranform a SELECT query into a pandas dataframe
    """
    cursor = conn.cursor()
    try:
        cursor.execute(select_query)
    except (Exception, psycopg2.DatabaseError) as error:
        print("Error: %s" % error)
        cursor.close()
        return 1

    tupples = cursor.fetchall()
    cursor.close()

    df = pd.DataFrame(tupples, columns=column_names)
    return df


conn = connect(param_dic)
column_names = column_names
# Create Dataframe
df = postgresql_to_dataframe(
    conn, "select * from " + table_name, column_names)
df.head()


Q = 1150
transport_type = 'Cars and light commercial vehicles'
fuel_type = 'Gasoline'
unit = 'kL'

cars_df = df.loc[df['transport_type'] == 'Cars and light commercial vehicles']
heavy_df = df.loc[df['transport_type'] == 'Heavy duty vehicles']
light_df = df.loc[df['transport_type'] == 'Light duty vehicles']
aviation_df = df.loc[df['transport_type'] == 'Aviation']


def cars(Q, fuel_type, unit):
    if unit == 'GJ':
        EC = 1
    else:
        EC = cars_df.loc[df['fuel_type']
                         == fuel_type, 'ratioGJperKL'].iloc[0]

    sc1_co2 = cars_df.loc[df['fuel_type']
                          == fuel_type, 'sc1_co2'].iloc[0]
    sc1_ch4 = cars_df.loc[df['fuel_type']
                          == fuel_type, 'sc1_ch4'].iloc[0]
    sc1_n20 = cars_df.loc[df['fuel_type']
                          == fuel_type, 'sc1_n20'].iloc[0]
    sc1_sum = cars_df.loc[df['fuel_type']
                          == fuel_type, 'sc1_sum'].iloc[0]

    CO2_e = float(Q) * EC * (sc1_co2) / 1000
    CH4_e = float(Q) * EC * (sc1_ch4) / 1000
    N2O_e = float(Q) * EC * (sc1_n20) / 1000
    total_e = float(Q) * EC * (sc1_sum) / 1000

    return total_e, CO2_e, CH4_e, N2O_e


def heavy(Q, fuel_type, unit):
    if unit == 'GJ':
        EC = 1
    else:
        EC = heavy_df.loc[df['fuel_type']
                          == fuel_type, 'ratioGJperKL'].iloc[0]

    sc1_co2 = heavy_df.loc[df['fuel_type']
                           == fuel_type, 'sc1_co2'].iloc[0]
    sc1_ch4 = heavy_df.loc[df['fuel_type']
                           == fuel_type, 'sc1_ch4'].iloc[0]
    sc1_n20 = heavy_df.loc[df['fuel_type']
                           == fuel_type, 'sc1_n20'].iloc[0]
    sc1_sum = heavy_df.loc[df['fuel_type']
                           == fuel_type, 'sc1_sum'].iloc[0]

    CO2_e = float(Q) * EC * (sc1_co2) / 1000
    CH4_e = float(Q) * EC * (sc1_ch4) / 1000
    N2O_e = float(Q) * EC * (sc1_n20) / 1000
    total_e = float(Q) * EC * (sc1_sum) / 1000

    return total_e, CO2_e, CH4_e,


def light(Q, fuel_type, unit):
    if unit == 'GJ':
        EC = 1
    else:
        EC = light_df.loc[df['fuel_type']
                          == fuel_type, 'ratioGJperKL'].iloc[0]

    sc1_co2 = light_df.loc[df['fuel_type']
                           == fuel_type, 'sc1_co2'].iloc[0]
    sc1_ch4 = light_df.loc[df['fuel_type']
                           == fuel_type, 'sc1_ch4'].iloc[0]
    sc1_n20 = light_df.loc[df['fuel_type']
                           == fuel_type, 'sc1_n20'].iloc[0]
    sc1_sum = light_df.loc[df['fuel_type']
                           == fuel_type, 'sc1_sum'].iloc[0]

    CO2_e = float(Q) * EC * (sc1_co2) / 1000
    CH4_e = float(Q) * EC * (sc1_ch4) / 1000
    N2O_e = float(Q) * EC * (sc1_n20) / 1000
    total_e = float(Q) * EC * (sc1_sum) / 1000

    return total_e, CO2_e, CH4_e, N2O_e


def aviation(Q, fuel_type, unit):
    if unit == 'GJ':
        EC = 1
    else:
        EC = aviation_df.loc[df['fuel_type']
                             == fuel_type, 'ratioGJperKL'].iloc[0]

    sc1_co2 = aviation_df.loc[df['fuel_type']
                              == fuel_type, 'sc1_co2'].iloc[0]
    sc1_ch4 = aviation_df.loc[df['fuel_type']
                              == fuel_type, 'sc1_ch4'].iloc[0]
    sc1_n20 = aviation_df.loc[df['fuel_type']
                              == fuel_type, 'sc1_n20'].iloc[0]
    sc1_sum = aviation_df.loc[df['fuel_type']
                              == fuel_type, 'sc1_sum'].iloc[0]

    CO2_e = float(Q) * EC * (sc1_co2) / 1000
    CH4_e = float(Q) * EC * (sc1_ch4) / 1000
    N2O_e = float(Q) * EC * (sc1_n20) / 1000
    total_e = float(Q) * EC * (sc1_sum) / 1000

    return total_e, CO2_e, CH4_e, N2O_e
