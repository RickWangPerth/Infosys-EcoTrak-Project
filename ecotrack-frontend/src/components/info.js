import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



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
    top: '50%',
    left: '10%',
   },

})

const AUStateName = [
    {label:'New South Wales and ACT'},
    {label:'Victoria'},
    {label:'Queensland'},
    {label:'South Australia'},
    {label:'Western Australia'},
    {label:'Tasmania'},
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

export default function Info() {
    const classes = calStyle();

    const [countryvalue, setCountryValue] = useState([]);
    const [statevalue, setStateValue] = useState([]);
    const [elecvalue, setElecValue] = useState([]);
    const [typevalue, setTypeValue] = useState([]);
    const [unitvalue, setUnitValue] = useState([]);
  
    const handleSubmit = () => {
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
                    elec: elecvalue,
                }),
            }).then(resp => resp.json())
            .then(resp => console.log(resp))
            .catch(err => console.log(err)) 
            
          };
    let stateName = [];
    if(countryvalue === 'Australia'){
         stateName = AUStateName;
    }else if(countryvalue === 'USA'){
         stateName = USAStateName;
    }
    console.log(countryvalue);

  return (
    <div className={classes.cal}>
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
            <Autocomplete
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
                disablePortal
                id="state"
                options={stateName}
                sx={{ width: 300 , mt: 2}}
                renderInput={(params) => <TextField {...params} label="state" />}
                onChange={(event) => {setStateValue(event.target.textContent)}} 
                />
            </Grid>
            <Grid item xs={12} md={4}>
            <Autocomplete
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
                    sx={{ width: 150, mt: 2 }}
                    required
                    id="outlined-required"
                    label="electricity"
                    defaultValue="0"
                    onChange={(event) => { setElecValue(event.target.value); } } />
                </Grid>
                <Grid item xs={12} md={6}>
                <FormControl>
                    <FormLabel id="elecunit-radio-buttons-group">Unit</FormLabel>
                    <RadioGroup
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
                        type='submit'
                        sx={{ width: 300 , background:'#7ECA58'}}
                        onClick={ handleSubmit }
                        >
                        Claculate
                    </Button>
                </Grid>
                </>
            : 'coming soon'
            }
            
        </Grid>
    </div>

  )
}