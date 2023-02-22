import psycopg2
import pandas as pd

host = 'localhost'
database = 'ecotrak'
user = 'postgres'
password = ''
table_name = 'fuels_ef'
column_names = ['id', 'sector', 'subsector', 'type', 'ratio',
                'unit', 'sc1_co2', 'sc1_ch4', 'sc1_n20', 'sc1_sum', 'sc3_ef']

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

    # Naturally we get a list of tupples
    tupples = cursor.fetchall()
    cursor.close()

    # We just need to turn it into a pandas dataframe
    df = pd.DataFrame(tupples, columns=column_names)
    return df


conn = connect(param_dic)
column_names = column_names
# Execute the "SELECT *" query
df = postgresql_to_dataframe(
    conn, "select * from " + table_name, column_names)
df.head()

# SOLID FUEL
solid_df = df.loc[df['subsector'] == 'Solid Fuel']


def solidfuelcal(Q, type):
    EC = solid_df.loc[solid_df['type']
                      == type, 'ratio'].iloc[0]
    sc1_co2 = solid_df.loc[solid_df['type']
                           == type, 'sc1_co2'].iloc[0]
    sc1_ch4 = solid_df.loc[solid_df['type']
                           == type, 'sc1_ch4'].iloc[0]
    sc1_n20 = solid_df.loc[solid_df['type']
                           == type, 'sc1_n20'].iloc[0]
    sc1_sum = solid_df.loc[solid_df['type']
                           == type, 'sc1_sum'].iloc[0]
    sc3_ef = solid_df.loc[solid_df['type']
                          == type, 'sc3_ef'].iloc[0]

    CO2_e = float(Q) * EC * (sc1_co2) / 1000
    CH4_e = float(Q) * EC * (sc1_ch4) / 1000
    N2O_e = float(Q) * EC * (sc1_n20) / 1000

    total_e = float(Q) * EC * (sc1_sum + sc3_ef) / 1000

    return total_e, CO2_e, CH4_e, N2O_e


# LIQUID FUEL
liquid_df = df.loc[df['subsector'] == 'Liquid Fuel']


def liquidfuelcal(Q, type, unit):
    if unit == 'kL':
        kL_df = df.loc[df['unit'] == 'kL']

        EC = liquid_df.loc[liquid_df['type']
                           == type, 'ratio'].iloc[0]
        sc1_co2 = liquid_df.loc[liquid_df['type']
                                == type, 'sc1_co2'].iloc[0]
        sc1_ch4 = liquid_df.loc[liquid_df['type']
                                == type, 'sc1_ch4'].iloc[0]
        sc1_n20 = liquid_df.loc[liquid_df['type']
                                == type, 'sc1_n20'].iloc[0]
        sc1_sum = liquid_df.loc[liquid_df['type']
                                == type, 'sc1_sum'].iloc[0]
        sc3_ef = liquid_df.loc[liquid_df['type']
                               == type, 'sc3_ef'].iloc[0]

        CO2_e = float(Q) * EC * (sc1_co2) / 1000
        CH4_e = float(Q) * EC * (sc1_ch4) / 1000
        N2O_e = float(Q) * EC * (sc1_n20) / 1000
        total_e = float(Q) * EC * (sc1_sum + sc3_ef) / 1000

    return total_e, CO2_e, CH4_e, N2O_e
