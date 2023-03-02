--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: elecdata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.elecdata (
    id integer NOT NULL,
    state character varying(80),
    elec double precision,
    unit character varying(80),
    result double precision
);


ALTER TABLE public.elecdata OWNER TO postgres;

--
-- Name: elecdata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.elecdata_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.elecdata_id_seq OWNER TO postgres;

--
-- Name: elecdata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.elecdata_id_seq OWNED BY public.elecdata.id;


--
-- Name: electricityef; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.electricityef (
    id character varying(200) NOT NULL,
    sector character varying(200),
    state character varying(200),
    sc2 double precision,
    sc3 double precision,
    unit character varying(200)
);


ALTER TABLE public.electricityef OWNER TO postgres;

--
-- Name: fueldata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fueldata (
    id integer NOT NULL,
    fuel double precision NOT NULL,
    "fuelTpye" character varying(80) NOT NULL,
    "fuelSubType" character varying(80) NOT NULL,
    unit character varying(80) NOT NULL,
    total double precision NOT NULL,
    co2 double precision NOT NULL,
    ch4 double precision NOT NULL,
    n2o double precision NOT NULL
);


ALTER TABLE public.fueldata OWNER TO postgres;

--
-- Name: fuel_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.fuel_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fuel_data_id_seq OWNER TO postgres;

--
-- Name: fuel_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fuel_data_id_seq OWNED BY public.fueldata.id;


--
-- Name: fuels_ef; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fuels_ef (
    id character varying(200) NOT NULL,
    sector character varying(200),
    subsector character varying(200),
    type character varying(200),
    ratio double precision,
    unit character varying(200),
    sc1_co2 double precision,
    sc1_ch4 double precision,
    sc1_n20 double precision,
    sc1_sum double precision,
    sc3_ef double precision
);


ALTER TABLE public.fuels_ef OWNER TO postgres;

--
-- Name: transport_ef; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transport_ef (
    id character varying(200) NOT NULL,
    transport_type character varying(200),
    fuel_type character varying(200),
    unit character varying(200),
    "ratioGJperKL" double precision,
    sc1_co2 double precision,
    sc1_ch4 double precision,
    sc1_n20 double precision,
    sc1_sum double precision,
    sc3_ef double precision
);


ALTER TABLE public.transport_ef OWNER TO postgres;

--
-- Name: us_emissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.us_emissions (
    id integer NOT NULL,
    "eGRID_Subregion" character varying(80) NOT NULL,
    sc_co2 double precision NOT NULL,
    sc_ch4 double precision NOT NULL,
    sc_n2o double precision NOT NULL
);


ALTER TABLE public.us_emissions OWNER TO postgres;

--
-- Name: us_emissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.us_emissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.us_emissions_id_seq OWNER TO postgres;

--
-- Name: us_emissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.us_emissions_id_seq OWNED BY public.us_emissions.id;


--
-- Name: uselecdata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.uselecdata (
    id integer NOT NULL,
    region character varying(80) NOT NULL,
    total double precision NOT NULL,
    co2_e double precision NOT NULL,
    ch4_e double precision NOT NULL,
    n2o_e double precision NOT NULL
);


ALTER TABLE public.uselecdata OWNER TO postgres;

--
-- Name: uselecdata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.uselecdata_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.uselecdata_id_seq OWNER TO postgres;

--
-- Name: uselecdata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.uselecdata_id_seq OWNED BY public.uselecdata.id;


--
-- Name: wastedata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.wastedata (
    id integer NOT NULL,
    waste double precision NOT NULL,
    unit character varying(80) NOT NULL,
    result double precision NOT NULL
);


ALTER TABLE public.wastedata OWNER TO postgres;

--
-- Name: wastedata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.wastedata_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.wastedata_id_seq OWNER TO postgres;

--
-- Name: wastedata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.wastedata_id_seq OWNED BY public.wastedata.id;


--
-- Name: wastes_ef; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.wastes_ef (
    id character varying(200) NOT NULL,
    name character varying(200),
    unit character varying(200),
    type character varying(200),
    value double precision,
    scope double precision,
    ratio double precision,
    treatment character varying(200)
);


ALTER TABLE public.wastes_ef OWNER TO postgres;

--
-- Name: elecdata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.elecdata ALTER COLUMN id SET DEFAULT nextval('public.elecdata_id_seq'::regclass);


--
-- Name: fueldata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fueldata ALTER COLUMN id SET DEFAULT nextval('public.fuel_data_id_seq'::regclass);


--
-- Name: us_emissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.us_emissions ALTER COLUMN id SET DEFAULT nextval('public.us_emissions_id_seq'::regclass);


--
-- Name: uselecdata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uselecdata ALTER COLUMN id SET DEFAULT nextval('public.uselecdata_id_seq'::regclass);


--
-- Name: wastedata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wastedata ALTER COLUMN id SET DEFAULT nextval('public.wastedata_id_seq'::regclass);


--
-- Data for Name: elecdata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.elecdata (id, state, elec, unit, result) FROM stdin;
1	New South Wales and Australian Capital Territory	100	kWh	0.079
2	New South Wales 	1999	kWh	1.57921
3	New South Wales 	221	kWh	0.17459
4	New South Wales 	21232	kWh	16.773280000000003
5	New South Wales 	21232	kWh	16.773280000000003
6	New South Wales 	21232	kWh	16.773280000000003
7	New South Wales 	21232	kWh	16.773280000000003
\.


--
-- Data for Name: electricityef; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.electricityef (id, sector, state, sc2, sc3, unit) FROM stdin;
E-NSW-1	Electricity	New South Wales 	0.73	0.06	kWh
E-ACT-1	Electricity	Australian Capital Territory	0.73	0.06	kWh
E-VIC-1	Electricity	Victoria	0.85	0.07	kWh
E-QLD-1	Electricity	Queensland	0.73	0.15	kWh
E-SA-1	Electricity	South Australia	0.25	0.08	kWh
E-WA-1	Electricity	Western Australia	0.51	0.04	kWh
E-SWIS-1	Electricity	South West Interconnected System (SWIS)	\N	\N	kWh
E-TAS-1	Electricity	Tasmania	0.17	0.01	kWh
E-NT-1	Electricity	Northern Territory	0.54	0.07	kWh
E-DKIS-1	Electricity	Darwin Katherine Interconnected System (DKIS)	\N	\N	kWh
E-NWIS-1	Electricity	Western Australia - North Western Interconnected System (NWIS)	0.58	\N	kwh
E-NAT-1	Electricity	National	0.68	0.09	kwh
E-NSW-2	Electricity	New South Wales 	202	15	GJ
E-ACT-2	Electricity	Australian Capital Territory	202	15	GJ
E-VIC-2	Electricity	Victoria	238	20	GJ
E-QLD-2	Electricity	Queensland	202	41	GJ
E-SA-2	Electricity	South Australia	72	23	GJ
E-WA-2	Electricity	Western Australia	164	12	GJ
E-SWIS-2	Electricity	South West Interconnected System (SWIS)	\N	\N	GJ
E-TAS-2	Electricity	Tasmania	47	3	GJ
E-NT-2	Electricity	Northern Territory	152	19	GJ
E-DKIS-2	Electricity	Darwin Katherine Interconnected System (DKIS)	\N	\N	GJ
E-NWIS-2	Electricity	Western Australia - North Western Interconnected System (NWIS)	160	\N	GJ
E-NAT-2	Electricity	National	189	25	GJ
\.


--
-- Data for Name: fueldata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fueldata (id, fuel, "fuelTpye", "fuelSubType", unit, total, co2, ch4, n2o) FROM stdin;
\.


--
-- Data for Name: fuels_ef; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fuels_ef (id, sector, subsector, type, ratio, unit, sc1_co2, sc1_ch4, sc1_n20, sc1_sum, sc3_ef) FROM stdin;
SF-1	Fuel	Solid Fuel	Bituminous coal	27	t	90	0.04	0.2	90.24	3
SF-2	Fuel	Solid Fuel	Sub-bituminous coal	21	t	90	0.04	0.2	90.24	2.5
SF-3	Fuel	Solid Fuel	Anthracite	29	t	90	0.04	0.2	90.24	\N
SF-4	Fuel	Solid Fuel	Brown coal (lignite)	10.2	t	93.5	0.02	0.3	93.82	0.4
SF-5	Fuel	Solid Fuel	Coking coal	30	t	91.8	0.03	0.2	92.03	6.4
SF-6	Fuel	Solid Fuel	Coal briquettes	22.1	t	95	0.08	0.3	95.38	\N
SF-7	Fuel	Solid Fuel	Coal coke	27	t	107	0.03	0.2	107.23	\N
SF-8	Fuel	Solid Fuel	Coal tar	37.5	t	81.8	0.03	0.2	82.03	\N
SF-9	Fuel	Solid Fuel	Solid fossil fuels other than those mentioned in the items above	22.1	t	95	0.08	0.2	95.28	\N
SF-10	Fuel	Solid Fuel	Industrial materials that are derived from fossil fuels, if recycled and combusted to produce heat or electricity	26.3	t	81.6	0.03	0.2	81.83	\N
SF-11	Fuel	Solid Fuel	Passenger car tyres, if recycled and combusted to produce heat or electricity	32	t	62.8	0.03	0.2	63.03	\N
SF-12	Fuel	Solid Fuel	Truck and off-road tyres, if recycled and combusted to produce heat or electricity	27.1	t	55.9	0.03	0.2	56.13	\N
SF-13	Fuel	Solid Fuel	biomass municipal materials, if combusted to produce heat or electricity	10.5	t	87.1	0.8	1	88.9	\N
SF-14	Fuel	Solid Fuel	Dry wood	16.2	t	0	0.1	1.1	1.2	\N
SF-15	Fuel	Solid Fuel	Green and air dried wood	10.4	t	0	0.1	1.1	1.2	\N
SF-16	Fuel	Solid Fuel	Sulphite lyes	12.4	t	0	0.08	0.5	0.58	\N
SF-17	Fuel	Solid Fuel	Bagasse	9.6	t	0	0.3	1.1	1.4	\N
SF-18	Fuel	Solid Fuel	Biomass, municipal and industrial materials, if combusted to produce heat or electricity	12.2	t	0	0.8	1	1.8	\N
SF-19	Fuel	Solid Fuel	Charcoal	31.1	t	0	5.3	1	6.3	\N
SF-20	Fuel	Solid Fuel	Primary solid biomass fuels other than those mentioned in the items above	12.2	t	0	0.8	1	1.8	\N
GF-1	Fuel	Gaseous Fuel	Natural gas distributed in a pipeline	0.04	m3	51.4	0.1	0.03	51.53	\N
GF-2	Fuel	Gaseous Fuel	Coal seam methane that is captured for combustion	0.04	m3	51.4	0.2	0.03	51.63	\N
GF-3	Fuel	Gaseous Fuel	Coal mine waste gas that is captured for combustion	0.04	m3	51.9	4.6	0.3	56.8	\N
GF-4	Fuel	Gaseous Fuel	Compressed natural gas (reverting to standard conditions)	0.04	m3	51.4	0.1	0.03	51.53	\N
GF-5	Fuel	Gaseous Fuel	Unprocessed natural gas	0.04	m3	51.4	0.1	0.03	51.53	\N
GF-6	Fuel	Gaseous Fuel	Ethane	0.06	m3	56.5	0.03	0.03	56.56	\N
GF-7	Fuel	Gaseous Fuel	Coke oven gas	0.02	m3	37	0.03	0.05	37.08	\N
GF-8	Fuel	Gaseous Fuel	Blast furnace gas	0	m3	234	0.03	0.02	234.05	\N
GF-9	Fuel	Gaseous Fuel	Town gas	0.04	m3	60.2	0.04	0.03	60.27	\N
GF-10	Fuel	Gaseous Fuel	Liquefied natural gas	25.3	m3	51.4	0.1	0.03	51.53	\N
GF-11	Fuel	Gaseous Fuel	Gaseous fossil fuels other than those mentioned in the items above	0.04	m3	51.4	0.1	0.03	51.53	\N
GF-12	Fuel	Gaseous Fuel	Landfill biogas that is captured for combustion (methane only)	0.04	m3	0	6.4	0.03	6.43	\N
GF-13	Fuel	Gaseous Fuel	Sludge biogas that is captured for combustion (methane only)	0.04	m3	0	6.4	0.03	6.43	\N
GF-14	Fuel	Gaseous Fuel	A biogas that is captured for combustion, other than those mentioned in the items above	0.04	m3	0	6.4	0.03	6.43	\N
GF-15	Fuel	Gaseous Fuel	Biomethane	0.04	m3	0	0.1	0.03	0.13	\N
LF-1	Fuel	Liquid Fuel	Petroleum based oils (other than petroleum based oil used as fuel), e.g. lubricants	38.8	kL	13.9	0	0	13.9	18
LF-2	Fuel	Liquid Fuel	Petroleum based greases	38.8	kL	3.5	0	0	3.5	18
LF-3	Fuel	Liquid Fuel	Automotive gasoline/petrol (other than for use as fuel in an aircraft)	34.2	kL	67.4	0.2	0.2	67.8	17.2
LF-4	Fuel	Liquid Fuel	Aviation gasoline	33.1	kL	67	0.2	0.2	67.4	18
LF-5	Fuel	Liquid Fuel	Kerosene (other than for use as fuel in an aircraft)	37.5	kL	68.9	0.01	0.2	69.11	18
LF-6	Fuel	Liquid Fuel	Aviation turbine fuel/kerosene	36.8	kL	69.6	0.02	0.2	69.82	18
LF-7	Fuel	Liquid Fuel	Heating oil	37.3	kL	69.5	0.03	0.2	69.73	18
LF-8	Fuel	Liquid Fuel	Diesel oil	38.6	kL	69.9	0.1	0.2	70.2	17.3
LF-9	Fuel	Liquid Fuel	Fuel oil	39.7	kL	73.6	0.04	0.2	73.84	18
LF-10	Fuel	Liquid Fuel	Liquefied aromatic hydrocarbons	34.4	kL	69.7	0.03	0.2	69.93	18
LF-11	Fuel	Liquid Fuel	Solvents: mineral turpentine or white spirits	34.4	kL	69.7	0.03	0.2	69.93	18
LF-12	Fuel	Liquid Fuel	Liquefied petroleum gas (LPG)	25.7	kL	60.2	0.2	0.2	60.6	20.2
LF-13	Fuel	Liquid Fuel	Naphtha	31.4	kL	69.8	0.01	0.01	69.82	18
LF-14	Fuel	Liquid Fuel	Petroleum based products other than mentioned in the items above	34.4	kL	69.8	0.02	0.1	69.92	18
LF-15	Fuel	Liquid Fuel	Biodiesel	34.6	kL	0	0.08	0.2	0.28	\N
LF-16	Fuel	Liquid Fuel	Ethanol for use as a fuel in an internal combustion engine	23.4	kL	0	0.08	0.2	0.28	\N
LF-17	Fuel	Liquid Fuel	Biofuels other than those mentioned in the items above	23.4	kL	0	0.08	0.2	0.28	\N
LF-18	Fuel	Liquid Fuel	Crude oil including crude oil condensates	45.3	t	69.6	0.08	0.2	69.88	\N
LF-19	Fuel	Liquid Fuel	Other natural gas liquids	46.5	t	61	0.08	0.2	61.28	\N
LF-20	Fuel	Liquid Fuel	Petroleum coke	34.2	t	92.6	0.08	0.2	92.88	18
LF-21	Fuel	Liquid Fuel	Refinery gas and liquids	42.9	t	54.7	0.03	0.03	54.76	18
LF-22	Fuel	Liquid Fuel	Refinery coke	34.2	t	92.6	0.08	0.2	92.88	18
\.


--
-- Data for Name: transport_ef; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transport_ef (id, transport_type, fuel_type, unit, "ratioGJperKL", sc1_co2, sc1_ch4, sc1_n20, sc1_sum, sc3_ef) FROM stdin;
1	Cars and light commercial vehicles	Gasoline	kL	34.2	67.4	0.02	0.2	67.62	17.2
2	Cars and light commercial vehicles	Diesel oil	kL	38.6	69.9	0.01	0.5	70.41	17.3
3	Cars and light commercial vehicles	Liquefied petroleum gas (LPG)	kL	26.2	60.2	0.5	0.3	61	20.2
4	Cars and light commercial vehicles	Fuel oil	kL	39.7	73.6	0.08	0.5	74.18	18
5	Cars and light commercial vehicles	Ethanol	kL	23.4	0	0.2	0.2	0.4	\N
6	Cars and light commercial vehicles	Biodiesel	kL	34.6	0	0.8	1.7	2.5	\N
7	Cars and light commercial vehicles	Other biofuels	kL	23.4	0	0.8	1.7	2.5	\N
8	Light duty vehicles	Compressed natural gas	m3	0.0393	51.4	7.3	0.3	59	18
9	Light duty vehicles	Liquefied natural gas	kL	25.3	51.4	7.3	0.3	59	18
10	Heavy duty vehicles	Compressed natural gas	m3	0.0393	51.4	2.8	0.3	54.5	18
11	Heavy duty vehicles	Liquefied natural gas	kL	25.3	51.4	2.8	0.3	54.5	18
12	Heavy duty vehicles	Diesel oil - Euro iv or higher	kL	38.6	69.9	0.07	0.4	70.37	17.3
13	Heavy duty vehicles	Diesel oil - Euro iii	kL	38.6	69.9	0.1	0.4	70.4	17.3
14	Heavy duty vehicles	Diesel oil - Euro i	kL	38.6	69.9	0.2	0.4	70.5	17.3
15	Aviation	Gasoline for use as fuel in an aircraft	kL	33.1	67	0.06	0.6	67.66	18
16	Aviation	Kerosene for use as fuel in an aircraft	kL	36.8	69.6	0.01	0.6	70.21	18
\.


--
-- Data for Name: us_emissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.us_emissions (id, "eGRID_Subregion", sc_co2, sc_ch4, sc_n2o) FROM stdin;
1	AKGD (ASCC Alaska Grid)	1097.6	0.1	0.014
2	AKMS (ASCC Miscellaneous)	534.1	0.027	0.005
3	AZNM (WECC Southwest)	846.6	0.054	0.007
4	CAMX (WECC California)	513.5	0.032	0.004
5	ERCT (ERCOT All)	818.6	0.052	0.007
6	FRCC (FRCC All)	835.1	0.049	0.006
7	HIMS (HICC Miscellaneous)	1143.2	0.11	0.017
8	HIOA (HICC Oahu)	1653	0.178	0.027
9	MROE (MRO East)	1526.4	0.139	0.02
10	MROW (MRO West)	979.5	0.104	0.015
11	NEWE (NPCC New England)	528.2	0.074	0.01
12	NWPP (WECC Northwest)	600	0.056	0.008
13	NYCW (NPCC NYC/Westchester)	634.6	0.022	0.003
14	NYLI (NPCC Long Island)	1203.9	0.138	0.018
15	NYUP (NPCC Upstate NY)	233.5	0.016	0.002
16	PRMS (Puerto Rico Miscellaneous)	1602.2	0.085	0.014
17	RFCE (RFC East)	652.5	0.045	0.006
18	RFCM (RFC Michigan)	1153.1	0.101	0.014
19	RFCW (RFC West)	985	0.086	0.012
20	RMPA (WECC Rockies)	1144.8	0.101	0.014
21	SPNO (SPP North)	954	0.1	0.014
22	SPSO (SPP South)	931.8	0.06	0.009
23	SRMV (SERC Mississippi Valley)	740.4	0.032	0.004
24	SRMW (SERC Midwest)	1480.7	0.156	0.023
25	SRSO (SERC South)	860.2	0.06	0.009
26	SRTV (SERC Tennessee Valley)	834.2	0.075	0.011
27	SRVC (SERC Virginia/Carolina)	623.1	0.05	0.007
28	US Average	818.3	0.065	0.009
\.


--
-- Data for Name: uselecdata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.uselecdata (id, region, total, co2_e, ch4_e, n2o_e) FROM stdin;
\.


--
-- Data for Name: wastedata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.wastedata (id, waste, unit, result) FROM stdin;
\.


--
-- Data for Name: wastes_ef; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.wastes_ef (id, name, unit, type, value, scope, ratio, treatment) FROM stdin;
SW-1	Food	t	Solid Waste	2.1	3	1	landfill
SW-2	Paper and cardboard	t	Solid Waste	3.3	3	1	landfill
SW-3	Garden and green	t	Solid Waste	1.6	3	1	landfill
SW-4	Wood	t	Solid Waste	0.7	3	1	landfill
SW-5	Textiles	t	Solid Waste	2	3	1	landfill
SW-6	Sludge	t	Solid Waste	0.4	3	1	landfill
SW-7	Nappies	t	Solid Waste	2	3	1	landfill
SW-8	Rubber and leather	t	Solid Waste	3.3	3	1	landfill
SW-9	Inert waste (including concrete/metal/plastics/glass)	t	Solid Waste	\N	3	1	landfill
SW-10	Municipal solid waste	t	Solid Waste	1.6	3	1	landfill
SW-11	Commercial and industrial waste	t	Solid Waste	1.3	3	1	landfill
SW-12	Construction and demolition waste	t	Solid Waste	0.2	3	1	landfill
SW-13	Food	m3	Solid Waste	2.1	\N	0.5	landfill
SW-14	Paper and cardboard	m3	Solid Waste	3.3	\N	0.09	landfill
SW-15	Garden and green	m3	Solid Waste	1.6	\N	0.24	landfill
SW-16	Wood	m3	Solid Waste	0.7	\N	0.15	landfill
SW-17	Textiles	m3	Solid Waste	2	\N	0.14	landfill
SW-18	Sludge	m3	Solid Waste	0.4	\N	0.72	landfill
SW-19	Nappies	m3	Solid Waste	2	\N	0.39	landfill
SW-20	Rubber and leather	m3	Solid Waste	3.3	\N	0.14	landfill
SW-21	Inert waste (including concrete/metal/plastics/glass)	m3	Solid Waste	\N	\N	0.42	landfill
SW-22	Municipal solid waste	m3	Solid Waste	1.6	\N	1.1	landfill
SW-23	Commercial and industrial waste	m3	Solid Waste	1.3	\N	1.1	landfill
SW-24	Construction and demolition waste	m3	Solid Waste	0.2	\N	1.1	landfill
CW-1	Clinical Waste	t	Combined Waste	0.88	\N	1	incineration
CW-2	Sewage Sludge	t	Combined Waste	\N	\N	1	incineration
CW-3	Fossil Liquid	t	Combined Waste	2.93	\N	1	incineration
CW-4	Industrial Waste	t	Combined Waste	1.65	\N	1	incineration
CW-5	Municipal Solid Waste	t	Combined Waste	5.36	\N	1	incineration
\.


--
-- Name: elecdata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.elecdata_id_seq', 7, true);


--
-- Name: fuel_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fuel_data_id_seq', 1, false);


--
-- Name: us_emissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.us_emissions_id_seq', 1, false);


--
-- Name: uselecdata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.uselecdata_id_seq', 1, false);


--
-- Name: wastedata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.wastedata_id_seq', 1, false);


--
-- Name: elecdata elecdata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.elecdata
    ADD CONSTRAINT elecdata_pkey PRIMARY KEY (id);


--
-- Name: electricityef electricity_ef_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.electricityef
    ADD CONSTRAINT electricity_ef_pkey PRIMARY KEY (id);


--
-- Name: fueldata fuel_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fueldata
    ADD CONSTRAINT fuel_data_pkey PRIMARY KEY (id);


--
-- Name: fuels_ef fuels_ef_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fuels_ef
    ADD CONSTRAINT fuels_ef_pkey PRIMARY KEY (id);


--
-- Name: transport_ef transport_ef_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transport_ef
    ADD CONSTRAINT transport_ef_pkey PRIMARY KEY (id);


--
-- Name: us_emissions us_emissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.us_emissions
    ADD CONSTRAINT us_emissions_pkey PRIMARY KEY (id);


--
-- Name: uselecdata uselecdata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uselecdata
    ADD CONSTRAINT uselecdata_pkey PRIMARY KEY (id);


--
-- Name: wastedata wastedata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wastedata
    ADD CONSTRAINT wastedata_pkey PRIMARY KEY (id);


--
-- Name: wastes_ef wastes_ef_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wastes_ef
    ADD CONSTRAINT wastes_ef_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

