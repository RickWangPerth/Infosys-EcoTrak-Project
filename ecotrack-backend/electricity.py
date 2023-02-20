import psycopg2
import pandas as pd

host = 'localhost'
database = 'ecotrakbackend'
user = 'postgres'
password = 'postgres'
column_names = ["state", "scope2_kgco2pkwh", "scope2_kgco2pGJ", "scope3_kgco2pkwh", "scope3_kgco2pGJ"]


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
    conn, "select * from electricityef", column_names)
df.head()


def elecal(state, unit, Q_elec):
    for i in range(11):
        if unit == 'kWh':
            if df.iloc[i][0] == state:
                EF_2 = df.iloc[i][1]
                EF_3 = df.iloc[i][3]
                print(state)
        if unit == 'GJ':
            if df.iloc[i][0] == state:
                EF_2 = df.iloc[i][2]
                EF_3 = df.iloc[i][4]
                print(state)
    elec_e = float(Q_elec) * (EF_2 + EF_3) / 1000
    return elec_e
    print(df.iloc[1][0])


Q_elec = 11300000  # INPUT FROM FRONT END - ENERGY USAGE
state = 'National'       # INPUT FROM FRONT END - STATE
unit = 'kWh'

emissions = elecal(state, unit, Q_elec)
print(emissions)
