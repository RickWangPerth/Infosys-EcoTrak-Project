import React from 'react'
import { Autocomplete } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from 'react';
import { Grid, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

import Fuelicon from '../img/fuel.png';

const calStyle = makeStyles({

     text:{
      position: 'relative',
      top: '10px',

     },
  
  })

export default function AUFuelcal(countryvalue,typevalue) {
    const classes = calStyle();

    //fuel type
    const [solidfueltype, setSolidfueltype] = useState([]);
    const [liquidfueltype, setLiquidfueltype] = useState([]);
    const [gaseousfueltype, setGaseousfueltype] = useState([]);
    const [fueltype, setFueltype] = useState([]);


    // Fuel value
    const [fuelvalue, setFuelValue] = useState([]);
    const [fuelsubtypevalue, setFuelSubTypeValue] = useState([]);
    const [fuelunitvalue, setFuelUnitValue] = useState([]);
    const [fuelresult, setFuelResult] = useState([]);
    const [fueltypevalue, setFuelTypeValue] = useState([]);

    useEffect(() => {
      fetch('http://127.0.0.1:5000/solidfueltype',{        
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin':'http://localhost:3000',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },})
        .then(response => response.json())
        .then(data => setSolidfueltype(data))
        .catch(error => console.log(error));
    }, []);

    useEffect(() => {
      fetch('http://127.0.0.1:5000/liquidfueltype',{
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin':'http://localhost:3000',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
      })
        .then(response => response.json())
        .then(data => setLiquidfueltype(data))
        .catch(error => console.log(error));
    }, []);    
    
    useEffect(() => {
      fetch('http://127.0.0.1:5000/gaseousfueltype',{
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin':'http://localhost:3000',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
      })
        .then(response => response.json())
        .then(data => setGaseousfueltype(data))
        .catch(error => console.log(error));
    }, []);

    useEffect(() => {
      fetch('http://127.0.0.1:5000/fueltype',{
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin':'http://localhost:3000',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
      })
        .then(response => response.json())
        .then(data => setFueltype(data))
        .catch(error => console.log(error));
    }, []);


    function handleFuelSubmit() {
        fetch('http://localhost:5000/fueldata',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin':'http://localhost:3000',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
          },
            body: JSON.stringify({
                country: countryvalue,
                fueltype: fueltypevalue,
                fuelsubtype: fuelsubtypevalue,
                unit: fuelunitvalue,
                fuel: fuelvalue
  
            }),
        }).then(resp => resp.json())
        .then(resp => console.log(resp))
        .catch(err => console.log(err)) 
        console.log(fuelvalue, fuelsubtypevalue, fueltypevalue, fuelunitvalue);
  
        fetch('http://localhost:5000/fuelresult',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Origin':'http://localhost:3000',
              'Access-Control-Allow-Origin': 'http://localhost:3000',
            }
          }).then(resp => resp.json())
          .then(resp =>  setFuelResult(resp))
          .catch(err => console.log(err)) 
  
          var x = document.getElementById("resultP")
            x.style.display = "block";
      };

  return (
    <>
    <Grid item xs={12} md={12} mt={5}>
      <img  src={Fuelicon} alt="fuel icon" width='80px'/>
    </Grid>

    <Grid item xs={12} md={12} mt={5}>
    <FormControl>
    <Autocomplete
      className={classes.text}
      disablePortal
      id="type of fuel"
      options={fueltype}
      sx={{ width: 300, mt: 2 }}
      renderInput={(params) => <TextField {...params} label="Tpye of Fuel" />}
      onChange={(event) => {setFuelTypeValue(event.target.textContent);setFuelSubTypeValue('')}} 
      />
    </FormControl>
    </Grid>
    {
      fueltypevalue==='Solid Fuel' ?
      <>
      <Grid item xs={12} md={4} mt={5}>
      <FormControl>
      <Autocomplete
        className={classes.text}
        disablePortal
        id="type of fuel"
        options={solidfueltype}
        sx={{ width: 300, mt: 2 }}
        renderInput={(params) => <TextField {...params} label="Tpye of Solid Fuel" />}
        onChange={(event) => {setFuelSubTypeValue(event.target.textContent)}} 
        />
      </FormControl>
      </Grid>
      <Grid item xs={12} md={4} mt={5}>
        <FormControl>
          <FormLabel id="elecunit-radio-buttons-group" className={classes.text} >Unit</FormLabel>
          <RadioGroup
              className={classes.text}
              aria-labelledby="elecunit-radio-buttons-group"    
              name="elecunit-radio-buttons-group"
              onChange={(event) => setFuelUnitValue(event.target.value)}
          >
              <FormControlLabel value="t" control={<Radio />} label="t" />
          </RadioGroup>
        </FormControl>
      </Grid>
      </>
      : fueltypevalue==='Liquid Fuel' ?
      <>
      <Grid item xs={12} md={4} mt={5}>

      <Autocomplete
        className={classes.text}
        disablePortal
        id="type of liquid fuel"
        options={liquidfueltype}
        sx={{ width: 300, mt: 2 }}
        renderInput={(params) => <TextField {...params} label="Tpye of Liquid Fuel" />}
        onChange={(event) => {setFuelSubTypeValue(event.target.textContent)}} 
        />

      </Grid>
      <Grid item xs={12} md={4} mt={5}>
        <FormControl>
          <FormLabel id="elecunit-radio-buttons-group" className={classes.text} >Unit</FormLabel>
          <RadioGroup
            className={classes.text}
            aria-labelledby="elecunit-radio-buttons-group"    
            name="elecunit-radio-buttons-group"
            onChange={(event) => setFuelUnitValue(event.target.value)}
          >
            <FormControlLabel value="kL" control={<Radio />} label="kL" />
            <FormControlLabel value="m3" control={<Radio />} label="m3" />
          </RadioGroup>
        </FormControl>
      </Grid>
      </>
      : fueltypevalue==='Gaseous Fuel' ?
      <>
      <Grid item xs={12} md={4} mt={5}>
        <FormControl>
        <Autocomplete
          className={classes.text}
          disablePortal
          id="type of gaseous fuel"
          options={gaseousfueltype}
          sx={{ width: 300, mt: 2 }}
          renderInput={(params) => <TextField {...params} label="Tpye of Gas Fuel" />}
          onChange={(event) => {setFuelSubTypeValue(event.target.textContent)}} 
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} md={4} mt={5}>
        <FormControl>
          <FormLabel id="elecunit-radio-buttons-group" className={classes.text} >Unit</FormLabel>
          <RadioGroup
            className={classes.text}
            aria-labelledby="elecunit-radio-buttons-group"    
            name="elecunit-radio-buttons-group"
            onChange={(event) => setFuelUnitValue(event.target.value)}
          >
              <FormControlLabel value="m3" control={<Radio />} label="m3" />
          </RadioGroup>
        </FormControl>
      </Grid>
      </>
      : null
    }
    <Grid item xs={12} md={6} mt={5}>
      <TextField
        className={classes.text}
        sx={{ width: 300, mt: 2 }}
        required
        id="outlined-required"
        label="Amount of Fuel"
        defaultValue="0"
        onChange={(event) => { setFuelValue(event.target.value); } } 
      />
    </Grid>
    <Grid item xs={12} md={12} mt={5}>
      <Button variant="contained"
          type='submit'
          sx={{ width: 300 , background:'#7ECA58'}}
          onClick={ () => {
              handleFuelSubmit();
            } }
          >
          Calculate
      </Button>
    </Grid>
    <Grid item xs={12} md={12}>
      <p 
      className={classes.text}
      id='resultP' 
      style={{display:'none'}}>
        
        "Total Greenhouse Gas Emissions from fuel (t CO2e): " {fuelresult.total} <br />
        "CO2 Emissions from fuel (t CO2e): " {fuelresult.CO2} <br />
        "CH4 Emissions from fuel (t CO2e): " {fuelresult.CH4} <br />
        "N2O Emissions from fuel (t CO2e): " {fuelresult.N2O} <br />
      </p>
    </Grid>
    </>
  )
}
