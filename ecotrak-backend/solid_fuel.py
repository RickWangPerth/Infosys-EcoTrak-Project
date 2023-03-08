import psycopg2
import pandas as pd
import sys

host = 'localhost'
database = 'ecotrak'
user = 'postgres'
password = 'postgres'
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


# INPUT FROM FRONT END - Quantity of Fuel Type in tonnes
Q = 20000
# INPUT FROM FRONT END - Type of fuel
type = 'Brown coal (lignite)'
subsector = 'Solid Fuel'

subsector_df = df.loc[df['subsector'] == 'Solid Fuel']


def solidfuelcal(Q, type):
    EC = subsector_df.loc[subsector_df['type']
                          == type, 'ratio'].iloc[0]
    sc1_co2 = subsector_df.loc[subsector_df['type']
                               == type, 'sc1_co2'].iloc[0]
    sc1_ch4 = subsector_df.loc[subsector_df['type']
                               == type, 'sc1_ch4'].iloc[0]
    sc1_n20 = subsector_df.loc[subsector_df['type']
                               == type, 'sc1_n20'].iloc[0]
    sc1_sum = subsector_df.loc[subsector_df['type']
                               == type, 'sc1_sum'].iloc[0]
    sc3_ef = subsector_df.loc[subsector_df['type']
                              == type, 'sc3_ef'].iloc[0]

    CO2_e = float(Q) * EC * (sc1_co2) / 1000
    CH4_e = float(Q) * EC * (sc1_ch4) / 1000
    N2O_e = float(Q) * EC * (sc1_n20) / 1000

    total_e = float(Q) * EC * (sc1_sum + sc3_ef) / 1000

    return round(total_e, 2), round(CO2_e, 2), round(CH4_e, 2), round(N2O_e, 2)


total = solidfuelcal(Q, type)
print(total)
