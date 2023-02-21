import psycopg2
import pandas as pd

host = 'localhost'
database = 'ecotrak'
user = 'postgres'
password = 'postgres'
table_name = 'electricityef'
column_names = ['id', 'sector', 'state', 'sc2', 'sc3', 'unit']

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
    conn, "select * from "+ table_name, column_names)
df.head()


def elecal(state, unit, Q_elec):

    if unit == 'kWh':
        kWh_df = df.loc[df['unit'] == 'kWh']
        sc2 = kWh_df.loc[kWh_df['state'] == state, 'sc2'].iloc[0]
        sc3 = kWh_df.loc[kWh_df['state'] == state, 'sc3'].iloc[0]
    if unit == 'GJ':
        GJ_df = df.loc[df['unit'] == 'GJ']
        sc2 = GJ_df.loc[GJ_df['state'] == state, 'sc2'].iloc[0]
        sc3 = GJ_df.loc[GJ_df['state'] == state, 'sc3'].iloc[0]

    elec_e = float(Q_elec) * (sc2 + sc3) / 1000
    print(elec_e)
    return elec_e
 


Q_elec = 11300000  # INPUT FROM FRONT END - ENERGY USAGE
state = 'National'       # INPUT FROM FRONT END - STATE
unit = 'kWh'

#emissions = elecal(state, unit, Q_elec)
#print(emissions)
