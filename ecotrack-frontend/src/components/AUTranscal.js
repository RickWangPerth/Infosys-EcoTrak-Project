import React from 'react'
import { Autocomplete } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from 'react';
import { Grid, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

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
     },
  
  })


export default function AUTranscal(countryvalue,typevalue) {
    const classes = calStyle();
    //trans type
    const [transtype, setTransType] = useState([]);


    // Trans value
    const [transtypevalue, setTransTypeValue] = useState([]);
    const [transvalue, setTransValue] = useState([]);
    const [transunitvalue, setTransUnitValue] = useState([]);
    const [transsubtypevalue, setTransSubTypeValue] = useState([]);
    const [transresult, setTransResult] = useState([]);

    useEffect(() => {
    fetch('http://127.0.0.1:5000/transtype',{        
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin':'http://localhost:3000',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
    },})
        .then(response => response.json())
        .then(data => setTransType(data))
        .catch(error => console.log(error));
    }, []);



    function handleTransSubmit() {
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
                fueltype:transtypevalue,
                fuelsubtype: transsubtypevalue,
                unit: transunitvalue,
                trans: transvalue

            }),
        }).then(resp => resp.json())
        .then(resp => console.log(resp))
        .catch(err => console.log(err)) 


        fetch('http://localhost:5000/fuelresult',{
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin':'http://localhost:3000',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            }
        }).then(resp => resp.json())
        .then(resp =>  setTransResult(resp))
        .catch(err => console.log(err)) 

        var x = document.getElementById("resultP")
            x.style.display = "block";
    };
    
  return (
    <>
    <Grid item xs={12} md={4}>
        <Autocomplete
        className={classes.text}
        disablePortal
        id="type"
        options={transtype}
        sx={{ width: 300, mt: 2 }}
        renderInput={(params) => <TextField {...params} label="Type of Transport" />}
        onChange={(event) => { setTransTypeValue(event.target.textContent); } } />
    </Grid>
    <Grid item xs={12} md={4}>
        <Autocomplete
        className={classes.text}
        disablePortal
        id="type"
        options={transtype}
        sx={{ width: 300, mt: 2 }}
        renderInput={(params) => <TextField {...params} label="Type of Fuel" />}
        onChange={(event) => { setTransTypeValue(event.target.textContent); } } />
    </Grid>
    <Grid item xs={12} md={6}>

    <TextField
        className={classes.text}
        sx={{ width: 300, mt: 2 }}
        required
        id="outlined-required"
        label="Amount of Fuel"
        defaultValue="0"
        onChange={(event) => { setTransValue(event.target.value); } } />

    </Grid>

    <Grid item xs={12} md={4}>
        <FormControl>
            <FormLabel id="elecunit-radio-buttons-group" className={classes.text} >Unit</FormLabel>
            <RadioGroup
                className={classes.text}
                aria-labelledby="elecunit-radio-buttons-group"    
                name="elecunit-radio-buttons-group"
                onChange={(event) => setTransUnitValue(event.target.value)}
            >
                <FormControlLabel value="kL" control={<Radio />} label="kL" />
                <FormControlLabel value="GJ" control={<Radio />} label="GJ" />
                <FormControlLabel value="m3" control={<Radio />} label="m3" />
            </RadioGroup>
        </FormControl>
        </Grid>         
    </>
  )
}
