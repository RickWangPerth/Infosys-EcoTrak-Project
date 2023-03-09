import React from 'react'
import ElecEq from "../img/equations/elecEq.png";
import Elecicon from "../img/electricity.png";
import { Autocomplete } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from 'react';
import { Grid, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

import electotal from '../img/electotal.png';


const calStyle = makeStyles({

     text:{
      position: 'relative',
      top: '10px',

     },
    p:{
      lineHeight: '1.5',
    },
    img:{
      width: '40px',
      verticalAlign: 'middle', 
    }, 
  })

export default function AUElecal(countryvalue,typevalue) {
  const portNum = 5000;
  const classes = calStyle();
  // const resultDisplay = 'none';

  const [state, setState] = useState([])
    // Static data
    useEffect(() => {
    fetch(`http://127.0.0.1:${portNum}/statedata`,{        
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Origin':'http://localhost:3000',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
  },})
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
      
      async function handleClick() {
        await handleElecSubmit(); // wait for handleElecSubmit to complete
        setTimeout(() => {
          GetResult(); // execute GetResult after 1 second
        }, 500); // 1000 milliseconds = 1 second
      }
      
      function handleElecSubmit() {
        return fetch(`http://localhost:${portNum}/elecdata`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': 'http://localhost:3000',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
          },
          body: JSON.stringify({
            country: countryvalue,
            state: statevalue,
            type: typevalue,
            unit: unitvalue,
            elec: elecvalue,
          }),
        })
          .then((resp) => resp.json())
          .then((resp) => console.log(resp))
          .catch((err) => console.log(err));
      }
      
      function GetResult() {
        fetch(`http://localhost:${portNum}/elecresult`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': 'http://localhost:3000',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
          },
        })
          .then((resp) => resp.json())
          .then((resp) => setElecResult(resp))
          .catch((err) => console.log(err));
      
        var result = document.getElementById('resultP');
        result.style.display = 'block';
      
        fetch(`http://127.0.0.1:${portNum}/sc2data/${statevalue}/${unitvalue}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': 'http://localhost:3000',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
          },
        })
          .then((resp) => resp.json())
          .then((resp) => setS2(resp))
          .catch((err) => console.log(err));
      
        fetch(`http://127.0.0.1:${portNum}/sc3data/${statevalue}/${unitvalue}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': 'http://localhost:3000',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
          },
        })
          .then((resp) => resp.json())
          .then((resp) => setS3(resp))
          .catch((err) => console.log(err));
      }
      

  return (
    <>
    <Grid item xs={12} md={2} mt={5}>

      <img src={Elecicon} alt='elec icon' width='80px'/>
      </Grid>
      <Grid item xs={12} md={6} mt={5}>
      <h2>Electricity Usage</h2>
  
      <p className={classes.p}>Electricity usage is a major contributor to greenhouse gas emissions in Australia, as reported by the National Greenhouse Gas Inventory (NGGI) produced by the Australian government. <br />
        The generation of electricity in Australia relies heavily on the combustion of fossil fuels, such as coal, natural gas, and oil, <br />
        which emit significant amounts of carbon dioxide and other greenhouse gases into the atmosphere.<br />
        <br />
        Reducing electricity usage is an important strategy for reducing greenhouse gas emissions and mitigating the impacts of climate change. <br />
        This can be achieved through a range of measures such as improving energy efficiency, using energy-saving appliances and technologies, <br />
        and adopting sustainable behaviors such as turning off lights and appliances when not in use. <br />
        Increasing the use of renewable energy sources such as solar and wind power can also help to reduce greenhouse gas emissions from electricity usage in Australia.<br />
      </p>
    </Grid>
    <Grid item xs={12} md={12} className={classes.text} mt={5}>
      <p>According to the guidance of the <a href='https://www.dcceew.gov.au/sites/default/files/documents/national-greenhouse-accounts-factors-2022.pdf' target='_blank' rel="noreferrer"> Australian National Greenhouse Accounts Factors </a></p>
      <p>
      The following method is used for estimating scope 2 and scope 3 emissions released from electricity purchased through the electricity grid and consumed:
      </p>
      <img src={ElecEq} alt='calculation method' width='300px'/>
      <p className={classes.p}>
        <strong>Where:</strong> <br />
        <strong>t CO2-e</strong> is the emissions measured in CO2-e tonnes.<br />

        <strong>Q</strong> is the quantity of electricity purchased from the electricity grid during the year and consumed from the operation of the facility measured in kilowatt hours. <br />

        <strong>EF2</strong> is the scope 2 emission factor, in kilograms of CO2-e emissions per kilowatt hour. <br />
        
        <strong>EF3</strong> is the scope 3 emission factor, in kilograms of CO2-e emissions per kilowatt hour. <br />
      </p>
    </Grid>
    <Grid container
    spacing={2}
    direction="column"
    justifyContent="center"
    alignItems="center"  
    >
    <Grid item xs={12} md={4} mt={5}>
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
    <Grid item xs={12} md={4} mt={5}>
    <FormControl>
    <TextField
        className={classes.text}
        disablePortal
        sx={{ width: 300, mt: 2 }}
        required
        id="outlined-required"
        label="Electricity"
        defaultValue='0'
        onChange={(event) => { setElecValue(event.target.value); } } />
    </FormControl>
    </Grid>
    <Grid item xs={12} md={4} mt={5}>
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
    </Grid>
    <Grid item xs={12} md={12} mt={5}>
        <Button variant="contained"
            className={classes.text}
            type='submit'
            sx={{ width: 300 , background:'#7ECA58'}}
            onClick={ () => {
                handleClick();
              } }
            >
            Calculate
        </Button>
      </Grid>
      <Grid item xs={12} md={12} mt={5}>
        <div
        className={classes.text}
        id='resultP' 
        style={{display:'none'}}>
        <h3 className={classes.h3}>Result</h3>
        <div>
          <img src={electotal} alt='total' className={classes.img} />
          <span className={classes.p}>   Total Greenhouse Gas Emissions from electricity (t CO2e): {elecresult.result}</span>
        </div>
        <p className={classes.p}>
           The scope 2 emission factor in {elecresult.state} is {s2} kg CO2e/{elecresult.unit} <br />
           The scope 3 emission factor in {elecresult.state} is {s3} kg CO2e/{elecresult.unit} <br />
        </p>
      </div>
    </Grid>
    </>
  )
}
