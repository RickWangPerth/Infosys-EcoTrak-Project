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
-- Name: biologicaltreatmentef; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.biologicaltreatmentef (
    name character varying(200) NOT NULL,
    scope1_tco2ppt double precision
);


ALTER TABLE public.biologicaltreatmentef OWNER TO postgres;

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
    state character varying(200) NOT NULL,
    scope2_kgco2pkwh double precision,
    "scope2_kgco2pGJ" double precision,
    scope3_kgco2pkwh double precision,
    "scope3_kgco2pGJ" double precision
);


ALTER TABLE public.electricityef OWNER TO postgres;

--
-- Name: gaseousfuelef; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gaseousfuelef (
    name character varying(200) NOT NULL,
    "GJpm3" double precision,
    scope1_co2 double precision,
    scope1_ch4 double precision,
    scope1_n20 double precision,
    scope1_combinedgases double precision
);


ALTER TABLE public.gaseousfuelef OWNER TO postgres;

--
-- Name: liquidfuelklef; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.liquidfuelklef (
    name character varying(200) NOT NULL,
    "GJpkl" double precision,
    scope1_co2 double precision,
    scope1_ch4 double precision,
    scope1_n20 double precision,
    scope1_combinedgases double precision,
    "scope3_kgco2pGJ" double precision
);


ALTER TABLE public.liquidfuelklef OWNER TO postgres;

--
-- Name: liquidfueltef; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.liquidfueltef (
    name character varying(200) NOT NULL,
    "GJpt" double precision,
    scope1_co2 double precision,
    scope1_ch4 double precision,
    scope1_n20 double precision,
    scope1_combinedgases double precision,
    "scope3_kgco2pGJ" double precision
);


ALTER TABLE public.liquidfueltef OWNER TO postgres;

--
-- Name: naturalgasdataef; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.naturalgasdataef (
    state character varying(200) NOT NULL,
    scope3_kgco2gj_metro double precision,
    scope3_kgco2gj_nonmetro double precision
);


ALTER TABLE public.naturalgasdataef OWNER TO postgres;

--
-- Name: solidfuelef; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.solidfuelef (
    name character varying(200) NOT NULL,
    "GJpt" double precision,
    scope1_co2 double precision,
    scope1_ch4 double precision,
    scope1_n20 double precision,
    scope1_gasses double precision,
    "scope3_kgco2pGJ" double precision
);


ALTER TABLE public.solidfuelef OWNER TO postgres;

--
-- Name: solidwasteef; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.solidwasteef (
    name character varying(200) NOT NULL,
    scope3_kgco2pt double precision,
    tpm double precision
);


ALTER TABLE public.solidwasteef OWNER TO postgres;

--
-- Name: wasteincerationef; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.wasteincerationef (
    name character varying(200) NOT NULL,
    tco2ppt double precision
);


ALTER TABLE public.wasteincerationef OWNER TO postgres;

--
-- Name: wastewatertreatmentef; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.wastewatertreatmentef (
    name character varying(200) NOT NULL,
    tco2pperson double precision
);


ALTER TABLE public.wastewatertreatmentef OWNER TO postgres;

--
-- Name: elecdata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.elecdata ALTER COLUMN id SET DEFAULT nextval('public.elecdata_id_seq'::regclass);


--
-- Data for Name: biologicaltreatmentef; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.biologicaltreatmentef (name, scope1_tco2ppt) FROM stdin;
Composting	0.05
Anaerobic digestion	0.03
\.


--
-- Data for Name: elecdata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.elecdata (id, state, elec, unit, result) FROM stdin;
\.


--
-- Data for Name: electricityef; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.electricityef (state, scope2_kgco2pkwh, "scope2_kgco2pGJ", scope3_kgco2pkwh, "scope3_kgco2pGJ") FROM stdin;
New South Wales and Australian Capital Territory	0.73	202	0.06	15
Victoria	0.85	238	0.07	20
Queensland	0.73	202	0.15	41
South Australia	0.25	72	0.08	23
Western Australia	0.51	164	0.04	12
South West Interconnected System (SWIS)	\N	\N	\N	\N
Tasmania	0.17	47	0.01	3
Northern Territory	0.54	152	0.07	19
Darwin Katherine Interconnected System (DKIS)	\N	\N	\N	\N
Western Australia - North Western Interconnected System (NWIS)	0.58	160	\N	\N
National	0.68	189	0.09	25
\.


--
-- Data for Name: gaseousfuelef; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gaseousfuelef (name, "GJpm3", scope1_co2, scope1_ch4, scope1_n20, scope1_combinedgases) FROM stdin;
Natural gas distributed in a pipeline	0.04	51.4	0.1	0.03	51.53
Coal seam methane that is captured for combustion	0.04	51.4	0.2	0.03	51.63
Coal mine waste gas that is captured for combustion	0.04	51.9	4.6	0.3	56.8
Compressed natural gas (reverting to standard conditions)	0.04	51.4	0.1	0.03	51.53
Unprocessed natural gas	0.04	51.4	0.1	0.03	51.53
Ethane	0.06	56.5	0.03	0.03	56.56
Coke oven gas	0.02	37	0.03	0.05	37.08
Blast furnace gas	0	234	0.03	0.02	234.05
Town gas	0.04	60.2	0.04	0.03	60.27
Liquefied natural gas	25.3	51.4	0.1	0.03	51.53
Gaseous fossil fuels other than those mentioned in the items above	0.04	51.4	0.1	0.03	51.53
Landfill biogas that is captured for combustion (methane only)	0.04	0	6.4	0.03	6.43
Sludge biogas that is captured for combustion (methane only)	0.04	0	6.4	0.03	6.43
A biogas that is captured for combustion, other than those mentioned in the items above	0.04	0	6.4	0.03	6.43
Biomethane	0.04	0	0.1	0.03	0.13
\.


--
-- Data for Name: liquidfuelklef; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.liquidfuelklef (name, "GJpkl", scope1_co2, scope1_ch4, scope1_n20, scope1_combinedgases, "scope3_kgco2pGJ") FROM stdin;
Petroleum based oils (other than petroleum based oil used as fuel), e.g. lubricants	38.8	13.9	0	0	13.9	18
Petroleum based greases	38.8	3.5	0	0	3.5	18
Automotive gasoline/petrol (other than for use as fuel in an aircraft)	34.2	67.4	0.2	0.2	67.8	17.2
Aviation gasoline	33.1	67	0.2	0.2	67.4	18
Kerosene (other than for use as fuel in an aircraft)	37.5	68.9	0.01	0.2	69.11	18
Aviation turbine fuel/kerosene	36.8	69.6	0.02	0.2	69.82	18
Heating oil	37.3	69.5	0.03	0.2	69.73	18
Diesel oil	38.6	69.9	0.1	0.2	70.2	17.3
Fuel oil	39.7	73.6	0.04	0.2	73.84	18
Liquefied aromatic hydrocarbons	34.4	69.7	0.03	0.2	69.93	18
Solvents: mineral turpentine or white spirits	34.4	69.7	0.03	0.2	69.93	18
Liquefied petroleum gas (LPG)	25.7	60.2	0.2	0.2	60.6	20.2
Naphtha	31.4	69.8	0.01	0.01	69.82	18
Petroleum based products other than mentioned in the items above	34.4	69.8	0.02	0.1	69.92	18
Biodiesel	34.6	0	0.08	0.2	0.28	\N
Ethanol for use as a fuel in an internal combustion engine	23.4	0	0.08	0.2	0.28	\N
Biofuels other than those mentioned in the items above	23.4	0	0.08	0.2	0.28	\N
\.


--
-- Data for Name: liquidfueltef; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.liquidfueltef (name, "GJpt", scope1_co2, scope1_ch4, scope1_n20, scope1_combinedgases, "scope3_kgco2pGJ") FROM stdin;
Crude oil including crude oil condensates	45.3	69.6	0.08	0.2	69.88	\N
Other natural gas liquids	46.5	61	0.08	0.2	61.28	\N
Petroleum coke	34.2	92.6	0.08	0.2	92.88	18
Refinery gas and liquids	42.9	54.7	0.03	0.03	54.76	18
Refinery coke	34.2	92.6	0.08	0.2	92.88	18
\.


--
-- Data for Name: naturalgasdataef; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.naturalgasdataef (state, scope3_kgco2gj_metro, scope3_kgco2gj_nonmetro) FROM stdin;
New South Wales and ACT	13.1	14
Victoria	4	4
Queensland	8.8	7.9
South Australia	10.7	10.6
Western Australia	4.1	4
Tasmania	\N	\N
Northern Territory	\N	\N
\.


--
-- Data for Name: solidfuelef; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.solidfuelef (name, "GJpt", scope1_co2, scope1_ch4, scope1_n20, scope1_gasses, "scope3_kgco2pGJ") FROM stdin;
Bituminous coal	27	90	0.04	0.2	90.24	3
Sub-bituminous coal	21	90	0.04	0.2	90.24	2.5
Anthracite	29	90	0.04	0.2	90.24	\N
Brown coal (lignite)	10.2	93.5	0.02	0.3	93.82	0.4
Coking coal	30	91.8	0.03	0.2	92.03	6.4
Coal briquettes	22.1	95	0.08	0.3	95.38	\N
Coal coke	27	107	0.03	0.2	107.23	\N
Coal tar	37.5	81.8	0.03	0.2	82.03	\N
Solid fossil fuels other than those mentioned in the items above	22.1	95	0.08	0.2	95.28	\N
Industrial materials that are derived from fossil fuels, if recycled and combusted to produce heat or electricity	26.3	81.6	0.03	0.2	81.83	\N
Passenger car tyres, if recycled and combusted to produce heat or electricity	32	62.8	0.03	0.2	63.03	\N
Truck and off-road tyres, if recycled and combusted to produce heat or electricity	27.1	55.9	0.03	0.2	56.13	\N
Nonâ€‘biomass municipal materials, if combusted to produce heat or electricity	10.5	87.1	0.8	1	88.9	\N
Dry wood	16.2	0	0.1	1.1	1.2	\N
Green and air dried wood	10.4	0	0.1	1.1	1.2	\N
Sulphite lyes	12.4	0	0.08	0.5	0.58	\N
Bagasse	9.6	0	0.3	1.1	1.4	\N
Biomass, municipal and industrial materials, if combusted to produce heat or electricity	12.2	0	0.8	1	1.8	\N
Charcoal	31.1	0	5.3	1	6.3	\N
Primary solid biomass fuels other than those mentioned in the items above	12.2	0	0.8	1	1.8	\N
\.


--
-- Data for Name: solidwasteef; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.solidwasteef (name, scope3_kgco2pt, tpm) FROM stdin;
Food	2.1	0.5
Paper and cardboard	3.3	0.09
Garden and green	1.6	0.24
Wood	0.7	0.15
Textiles	2	0.14
Sludge	0.4	0.72
Nappies	2	0.39
Rubber and leather	3.3	0.14
Inert waste (including concrete/metal/plastics/glass)	\N	0.42
Municipal solid waste	1.6	1.1
Commercial and industrial waste	1.3	1.1
Construction and demolition waste	0.2	1.1
\.


--
-- Data for Name: wasteincerationef; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.wasteincerationef (name, tco2ppt) FROM stdin;
Clinical Waste	0.88
Sewage Sludge	\N
Fossil Liquid	2.93
Industrial Waste	1.65
Municipal Solid Waste	5.36
\.


--
-- Data for Name: wastewatertreatmentef; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.wastewatertreatmentef (name, tco2pperson) FROM stdin;
Managed aerobic treatment	\N
Unmanaged aerobic treatment	0.12
Anaerobic digester/reactor	0.33
Anaerobic lagoon shallow (<2 metres)	0.08
Anaerobic lagoon deep (>2 metres)	0.33
\.


--
-- Name: elecdata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.elecdata_id_seq', 1, false);


--
-- Name: biologicaltreatmentef biologicaltreatmentef_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.biologicaltreatmentef
    ADD CONSTRAINT biologicaltreatmentef_pkey PRIMARY KEY (name);


--
-- Name: elecdata elecdata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.elecdata
    ADD CONSTRAINT elecdata_pkey PRIMARY KEY (id);


--
-- Name: electricityef electricityef_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.electricityef
    ADD CONSTRAINT electricityef_pkey PRIMARY KEY (state);


--
-- Name: gaseousfuelef gaseousfuelef_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gaseousfuelef
    ADD CONSTRAINT gaseousfuelef_pkey PRIMARY KEY (name);


--
-- Name: liquidfuelklef liquidfuelklef_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.liquidfuelklef
    ADD CONSTRAINT liquidfuelklef_pkey PRIMARY KEY (name);


--
-- Name: liquidfueltef liquidfueltef_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.liquidfueltef
    ADD CONSTRAINT liquidfueltef_pkey PRIMARY KEY (name);


--
-- Name: naturalgasdataef naturalgasdataef_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.naturalgasdataef
    ADD CONSTRAINT naturalgasdataef_pkey PRIMARY KEY (state);


--
-- Name: solidfuelef solidfuelef_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solidfuelef
    ADD CONSTRAINT solidfuelef_pkey PRIMARY KEY (name);


--
-- Name: solidwasteef solidwasteef_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solidwasteef
    ADD CONSTRAINT solidwasteef_pkey PRIMARY KEY (name);


--
-- Name: wasteincerationef wasteincerationef_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wasteincerationef
    ADD CONSTRAINT wasteincerationef_pkey PRIMARY KEY (name);


--
-- Name: wastewatertreatmentef wastewatertreatmentef_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wastewatertreatmentef
    ADD CONSTRAINT wastewatertreatmentef_pkey PRIMARY KEY (name);


--
-- PostgreSQL database dump complete
--

