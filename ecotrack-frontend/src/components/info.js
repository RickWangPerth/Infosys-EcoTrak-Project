import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState,useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Results from './result';


const calStyle = makeStyles({
  cal: {
       display: 'absolute',
       position: 'absolute',
       width: '100%',
       height: '100%',
       backgroundColor: '#F1F2ED',          
   },
   text:{
    position: 'relative',
    top: '10px',
    left: '30px',
   },

})

const AUStateName = [
    {label:'New South Wales and Australian Capital Territory'},
    {label:'Victoria'},
    {label:'Queensland'},
    {label:'South Australia'},
    {label:'Western Australia'},
    {label:'Tasmania'},
    {label:'South West Interconnected System (SWIS)'},
    {label:'Darwin Katherine Interconnected System (DKIS)'},
    {label:'Northern Territory'},
    {label:'National'},
  ]
const USAStateName = [
    {label:'Alabama'},
    {label:'Alaska'},
    {label:'Arizona'},
    {label:'Arkansas'},
    {label:'California'},
    {label:'Colorado'},
    {label:'Connecticut'},
    {label:'Delaware'},
    {label:'Florida'},
    {label:'Georgia'},
    {label:'Hawaii'},
    {label:'Idaho'},
    {label:'Illinois'},
    {label:'Indiana'},
    {label:'Iowa'},
    {label:'Kansas'},
    {label:'Kentucky'},
    {label:'Louisiana'},
    {label:'Maine'},
    {label:'Maryland'},
    {label:'Massachusetts'},
    {label:'Michigan'},
    {label:'Minnesota'},
    {label:'Mississippi'},
    {label:'Missouri'},
    {label:'Montana'},
    {label:'Nebraska'},
    {label:'Nevada'},
    {label:'New Hampshire'},
    {label:'New Jersey'},
    {label:'New Mexico'},
    {label:'New York'},
    {label:'North Carolina'},
    {label:'North Dakota'},
    {label:'Ohio'},
    {label:'Oklahoma'},
    {label:'Oregon'},
    {label:'Pennsylvania'},
    {label:'Rhode Island'},
    {label:'South Carolina'},
    {label:'South Dakota'},
    {label:'Tennessee'},
    {label:'Texas'},
    {label:'Utah'},
    {label:'Vermont'},
    {label:'Virginia'},
    {label:'Washington'},
    {label:'West Virginia'},
    {label:'Wisconsin'},
    {label:'Wyoming'},
    ]
const countryName = [
    {label:'Australia'},
    {label:'USA'},
    {label:'India'},
    {label:'New Zeland'},
  ]
  
const calType = [
    {label:'Electricity'},
    {label:'Waste'},
    {label:'Fuel'},
  ]

const typeFuel = [
    {label:'Gaseous Fuel'},
    {label:'Liquid Fuel'},
    {label:'Solid Fuel'},
  ]
const typeGasFuel = [
    {label:'Natural gas distributed in a pipeline'},
    {label:'Coal seam methane that is captured for combustion'},
    {label:'Coal mine waste gas that is captured for combustion'},
    {label:'Compressed natural gas (reverting to standard conditions)'},
    {label:'Unprocessed natural gas'},
    {label:'Ethane'},
    {label:'Coke oven gas'},
    {label:'Town gas'},
    {label:'Liquefied natural gas'},
    {label:'Gaseous fossil fuels other than those mentioned in the items above'},
    {label:'Landfill biogas that is captured for combustion (methane only)'},
    {label:'Sludge biogas that is captured for combustion (methane only)'},
    {label:'A biogas that is captured for combustion, other than those mentioned in the items above'},
    {label:'Biomethane'},
  ]

const typeLiquidFuel = [
    {label:'Petroleum based oils (other than petroleum based oil used as fuel), e.g. lubricants'},
    {label:'Petroleum based greases'},
    {label:'Crude oil including crude oil condensates'},
    {label:'Automotive gasoline/petrol (other than for use as fuel in an aircraft)'},
    {label:'Kerosene (other than for use as fuel in an aircraft)'},
    {label:'Aviation gasoline'},
    {label:'Aviation turbine fuel/kerosene '},
    {label:'Heating oil'},
    {label:'Diesel oil'},
    {label:'Fuel oil'},
    {label:'Liquefied aromatic hydrocarbons'},
    {label:'Solvents: mineral turpentine or white spirits'},
    {label:'Liquefied petroleum gas (LPG)'},
    {label:'Naphtha'},
    {label:'Petroleum coke'},
    {label:'Refinery gas and liquids'},
    {label:'Refinery coke'},
    {label:'Petroleum based products other than mentioned in the items above'},
    {label:'Biodiesel'},
    {label:'Ethanol for use as a fuel in an internal combustion engine'},
    {label:'Biofuels other than those mentioned in the items above'},
  ]

const typeSolidFuel = [
    {label:'Coal'},
    {label:'Peat'},
    {label:'Wood and wood waste'},
    {label:'Biomass and biogenic waste'},
    {label:'Other solid fuels'},
  ]


export default function Info() {
    const classes = calStyle();
    const resultDisplay = 'none'

    const [countryvalue, setCountryValue] = useState([]);
    const [statevalue, setStateValue] = useState([]);
    const [typevalue, setTypeValue] = useState([]);


    // Electricity value
    const [elecvalue, setElecValue] = useState([]);
    const [unitvalue, setUnitValue] = useState([]);
    const [elecresult, setElecResult] = useState([]);

    // Waste value
    const [wastevalue, setWasteValue] = useState([]);
    const [solidwastevalue, setSolidWasteValue] = useState([]);
    const [liquidwastevalue, setLiquidWasteValue] = useState([]);
    const [gaswastevalue, setGasWasteValue] = useState([]);
    const [wasteresult, setWasteResult] = useState([]);
    const [wastetypevalue, setWasteTypeValue] = useState([]);

    // Fuel value
    const [fuelvalue, setFuelValue] = useState([]);
    const [solidfuelvalue, setSolidFuelValue] = useState([]);
    const [liquidfuelvalue, setLiquidFuelValue] = useState([]);
    const [gasfuelvalue, setGasFuelValue] = useState([]);
    const [fuelresult, setFuelResult] = useState([]);
    const [fueltypevalue, setFuelTypeValue] = useState([]);
  
    function handleSubmit() {
            fetch('http://localhost:5000/elecdata',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin':'http://localhost:3000',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
              },
                body: JSON.stringify({
                    country: countryvalue,
                    state: statevalue,
                    type: typevalue,
                    unit: unitvalue,
                    elec: elecvalue
                }),
            }).then(resp => resp.json())
            .then(resp => console.log(resp))
            .catch(err => console.log(err)) 

            fetch('http://localhost:5000/elecresult',{
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Origin':'http://localhost:3000',
                  'Access-Control-Allow-Origin': 'http://localhost:3000',
                }
              }).then(resp => resp.json())
              .then(resp =>  setElecResult(resp))
              .catch(err => console.log(err)) 

              var x = document.getElementById("resultP")
                x.style.display = "block";
          };

    let stateName = [];
    if(countryvalue === 'Australia'){
         stateName = AUStateName;
    }else if(countryvalue === 'USA'){
         stateName = USAStateName;
    }
    console.log(stateName);

  return (
    <div className={classes.cal}>
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
            <Autocomplete
                className={classes.text}
                disablePortal
                id="country"
                options={countryName}
                sx={{ width: 300, mt: 2 }}
                renderInput={(params) => <TextField {...params} label="Country" />}
                onChange={(event) => {setCountryValue(event.target.textContent)}} 
                />
            </Grid>
            <Grid item xs={12} md={4}>
            <Autocomplete
                className={classes.text}
                disablePortal
                id="state"
                options={stateName}
                sx={{ width: 300 , mt: 2}}
                renderInput={(params) => <TextField {...params} label="State, Territory or Grid " />}
                onChange={(event) => {setStateValue(event.target.textContent)}} 
                />
            </Grid>
            <Grid item xs={12} md={4}>
            <Autocomplete
                className={classes.text}
                disablePortal
                id="type"
                options={calType}
                sx={{ width: 300, mt: 2 }}
                renderInput={(params) => <TextField {...params} label="Type" />}
                onChange={(event) => {setTypeValue(event.target.textContent)}} 
                />
            </Grid>
            {
            typevalue==='Electricity' ? 
                <>
                <Grid item xs={12} md={6}> 
                <TextField
                    className={classes.text}
                    sx={{ width: 300, mt: 2 }}
                    required
                    id="outlined-required"
                    label="electricity"
                    defaultValue="0"
                    onChange={(event) => { setElecValue(event.target.value); } } />
                </Grid>
                <Grid item xs={12} md={6}>
                <FormControl>
                    <FormLabel id="elecunit-radio-buttons-group" className={classes.text} >Unit</FormLabel>
                    <RadioGroup
                        className={classes.text}
                        aria-labelledby="elecunit-radio-buttons-group"    
                        name="elecunit-radio-buttons-group"
                        onChange={(event) => setUnitValue(event.target.value)}
                    >
                        <FormControlLabel value="kWh" control={<Radio />} label="kWh" />
                        <FormControlLabel value="GJ" control={<Radio />} label="GJ" />
                    </RadioGroup>
                </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Button variant="contained"
                        className={classes.text}
                        type='submit'
                        sx={{ width: 300 , background:'#7ECA58'}}
                        onClick={ () => {
                            handleSubmit();
                          } }
                        >
                        Calculate
                    </Button>
                    <p 
                    className={classes.text}
                    id='resultP' 
                    style={{display:'none'}}>
                      
                      "Total Greenhouse Gas Emissions from electricty (t CO2e): " {elecresult.result}
                    </p>
                </Grid>
                </>
                : typevalue==='Waste' ?
                <>
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    className={classes.text}
                    disablePortal
                    id="type"
                    options={calType}
                    sx={{ width: 300, mt: 2 }}
                    renderInput={(params) => <TextField {...params} label="Type of Waste" />}
                    onChange={(event) => { setWasteTypeValue(event.target.textContent); } } />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    className={classes.text}
                    sx={{ width: 300, mt: 2 }}
                    required
                    id="outlined-required"
                    label="Amount of Waste"
                    defaultValue="0"
                    onChange={(event) => { setWasteValue(event.target.value); } } />
                </Grid><Grid item xs={12} md={12}>
                  <Button variant="contained"
                    className={classes.text}
                    type='submit'
                    sx={{ width: 300, background: '#7ECA58' }}
                    onClick={() => {
                      handleSubmit();
                    } }
                  >
                    Calculate
                  </Button>
                  <p
                    className={classes.text}
                    id='resultP'
                    style={{ display: 'none' }}>

                    "Total Greenhouse Gas Emissions from electricty (t CO2e): " {elecresult.result}
                  </p>
                </Grid>
                </>
                : typevalue==='Fuel' ?
                <>
                <Grid item xs={12} md={4}>
                <Autocomplete
                    className={classes.text}
                    disablePortal
                    id="type of fuel"
                    options={typeFuel}
                    sx={{ width: 300, mt: 2 }}
                    renderInput={(params) => <TextField {...params} label="Tpye of Fuel" />}
                    onChange={(event) => {setFuelTypeValue(event.target.textContent)}} 
                    />
                </Grid>
                {
                  fueltypevalue==='Solid Fuel' ?
                  <>
                  <Grid item xs={12} md={4}>
                  <Autocomplete
                    className={classes.text}
                    disablePortal
                    id="type of fuel"
                    options={typeSolidFuel}
                    sx={{ width: 300, mt: 2 }}
                    renderInput={(params) => <TextField {...params} label="Tpye of Solid Fuel" />}
                    onChange={(event) => {setSolidFuelValue(event.target.textContent)}} 
                    />
                  </Grid>
                  </>
                  : fueltypevalue==='Liquid Fuel' ?
                  <>
                  <Grid item xs={12} md={4}>
                  <Autocomplete
                    className={classes.text}
                    disablePortal
                    id="type of liquid fuel"
                    options={typeLiquidFuel}
                    sx={{ width: 300, mt: 2 }}
                    renderInput={(params) => <TextField {...params} label="Tpye of Liquid Fuel" />}
                    onChange={(event) => {setLiquidFuelValue(event.target.textContent)}} 
                    />
                  </Grid>
                  </>
                  : fueltypevalue==='Gaseous Fuel' ?
                  <>
                  <Grid item xs={12} md={4}>
                  <Autocomplete
                    className={classes.text}
                    disablePortal
                    id="type of gaseous fuel"
                    options={typeGasFuel}
                    sx={{ width: 300, mt: 2 }}
                    renderInput={(params) => <TextField {...params} label="Tpye of Gas Fuel" />}
                    onChange={(event) => {setGasFuelValue(event.target.textContent)}} 
                    />
                  </Grid>
                  </>
                  : null
                }
                <Grid item xs={12} md={6}> 
                <TextField
                    className={classes.text}
                    sx={{ width: 300, mt: 2 }}
                    required
                    id="outlined-required"
                    label="Amount of Fuel"
                    defaultValue="0"
                    onChange={(event) => { setFuelValue(event.target.value); } } />
                </Grid>
                <Grid item xs={12} md={12}>
                    <Button variant="contained"
                        className={classes.text}
                        type='submit'
                        sx={{ width: 300 , background:'#7ECA58'}}
                        onClick={ () => {
                            handleSubmit();
                          } }
                        >
                        Calculate
                    </Button>
                    <p 
                    className={classes.text}
                    id='resultP' 
                    style={{display:'none'}}>
                      
                      "Total Greenhouse Gas Emissions from electricty (t CO2e): " {elecresult.result}
                    </p>
                </Grid>
                </>
                : null
            } 
            
        </Grid>
    </div>

  )
}
