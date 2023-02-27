import React from 'react'
import ElecEq from "../img/equations/elecEq.png";
import { Autocomplete } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from 'react';
import { Grid, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const calStyle = makeStyles({

     text:{
      position: 'relative',
     },
  })

export default function Elecal(countryvalue,typevalue) {
    const classes = calStyle();
    const resultDisplay = 'none';

    const [state, setState] = useState([])
    // Static data
    useEffect(() => {
    fetch('http://127.0.0.1:5000/statedata')
        .then(response => response.json())
        .then(data => setState(data))
        .catch(error => console.log(error));
    }, []);


    const [statevalue, setStateValue] = useState([]);


    // Electricity value
      const [elecvalue, setElecValue] = useState([]);
      const [unitvalue, setUnitValue] = useState([]);
      const [elecresult, setElecResult] = useState([]);
      const [s2, setS2] = useState([]);
      const [s3, setS3] = useState([]);

      function handleElecSubmit() {
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
  
          var result = document.getElementById("resultP")
            result.style.display = "block";
  
        fetch(`http://127.0.0.1:5000/sc2data/${statevalue}/${unitvalue}`,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Origin':'http://localhost:3000',
              'Access-Control-Allow-Origin': 'http://localhost:3000',
            }
          }).then(resp => resp.json())
          .then(resp =>  setS2(resp))
          .catch(err => console.log(err))
  
        fetch(`http://127.0.0.1:5000/sc3data/${statevalue}/${unitvalue}`,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Origin':'http://localhost:3000',
              'Access-Control-Allow-Origin': 'http://localhost:3000',
            }
          }).then(resp => resp.json())
          .then(resp =>  setS3(resp))
          .catch(err => console.log(err)) 
  
      };

  return (
    <>
    <Grid item xs={12} md={12} className={classes.text}>
      <p>According to the guidance of the <a href='https://www.dcceew.gov.au/sites/default/files/documents/national-greenhouse-accounts-factors-2022.pdf' target='_blank' rel="noreferrer"> Australian National Greenhouse Accounts Factors </a></p>
      <p>
      The following method is used for estimating scope 2 and scope 3 emissions released from electricity purchased through the electricity grid and consumed:
      </p>
      <img src={ElecEq} alt='calculation method' width='300px'/>
      <p>
        <strong>Where:</strong> <br />
        <strong>t CO2 -e</strong> is the emissions measured in CO 2 -e tonnes.<br />

        <strong>Q</strong> is the quantity of electricity purchased from the electricity grid during the year and consumed from the operation of the facility measured in kilowatt hours. <br />

        <strong>EF2</strong> is the scope 2 emission factor, in kilograms of CO2 -e emissions per kilowatt hour. <br />
        
        <strong>EF3</strong> is the scope 3 emission factor, in kilograms of CO2-e emissions per kilowatt hour. <br />
      </p>
    </Grid>
    <Grid item xs={12} md={4}>
    <Autocomplete
        className={classes.text}
        disablePortal
        id="state"
        options={state}
        sx={{ width: 300 , mt: 2}}
        renderInput={(params) => <TextField {...params} label="State, Territory or Grid " />}
        onChange={(event) => {setStateValue(event.target.textContent)}} 
        />
    </Grid>
    <Grid item xs={12} md={4}>
    <FormControl>
    <TextField
        className={classes.text}
        sx={{ width: 300, mt: 2 }}
        required
        id="outlined-required"
        label="Electricity"
        defaultValue='0'
        onChange={(event) => { setElecValue(event.target.value); } } />
    </FormControl>
    </Grid>
    <Grid item xs={12} md={4}>
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
                handleElecSubmit();
              } }
            >
            Calculate
        </Button>
        <p 
        className={classes.text}
        id='resultP' 
        style={{display:'none'}}>
          "Total Greenhouse Gas Emissions from electricty (t CO2e): " {elecresult.result} <br />
           The scope 2 emission factor in {elecresult.state} is {s2} kg CO2-e/kWh <br />
           The scope 3 emission factor in {elecresult.state} is {s3} kg CO2-e/kWh <br />
        </p>
    </Grid>
    </>
  )
}
