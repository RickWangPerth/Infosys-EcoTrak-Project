import psycopg2
import pandas as pd

host = 'postgresdb'
database = 'ecotrak'
user = 'postgres'
password = ''
table_name = 'US_electricity_ef'
column_names = ['eGRID Subregion', 'sc_co2', 'sc_ch4', 'sc_n2o']

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

Q = 1000
subregion = 'CAMX (WECC California)'


def electricitycal(Q, subregion):
    sc_co2 = df.loc[df['eGRID Subregion'] == subregion, 'sc_co2'].iloc[0]
    sc_ch4 = df.loc[df['eGRID Subregion'] == subregion, 'sc_ch4'].iloc[0]
    sc_n2o = df.loc[df['eGRID Subregion'] == subregion, 'sc_n2o'].iloc[0]

    CO2_e = float(Q) * (sc_co2) / 1000
    CH4_e = float(Q) * (sc_ch4) / 1000
    N2O_e = float(Q) * (sc_n2o) / 1000
    total_e = float(Q) * (sc_co2 + sc_ch4 + sc_n2o) / 1000

    return total_e, CO2_e, CH4_e, N2O_e
