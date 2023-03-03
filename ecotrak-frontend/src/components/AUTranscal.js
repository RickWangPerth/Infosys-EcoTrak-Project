import React from 'react'
import { Autocomplete } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from 'react';
import { Grid, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

import Transicon from '../img/trans.png';
import TransEq from '../img/equations/transEq.png';

const calStyle = makeStyles({

     text:{
      position: 'relative',
      top: '10px',
     },
     p:{
        lineHeight: '1.5',
      }
  })

export default function AUTranscal(countryvalue,typevalue) {
    const classes = calStyle();

    const portNum = 5000;


    //trans type
    const [transtype, setTransType] = useState([]);
    const [fueltype, setFuelType] = useState([]);

    // Trans value
    const [transtypevalue, setTransTypeValue] = useState([]);
    const [transvalue, setTransValue] = useState([]);
    const [transunitvalue, setTransUnitValue] = useState([]);
    const [fueltypevalue, setFuelTypeValue] = useState([]);
    const [transresult, setTransResult] = useState([]);




    useEffect(() => {
    fetch(`http://127.0.0.1:${portNum}/transporttype`,{        
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




    useEffect(() => {
    fetch(`http://127.0.0.1:${portNum}/transfueltype`,{
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin':'http://localhost:3000',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
    },})
        .then(response => response.json())
        .then(data => setFuelType(data))
        .catch(error => console.log(error));
    }, []);
    
    let fueltypeList = []
    let Aviation_fueltypeList = fueltype
    .filter(function(d) {
      return d.transporttype === 'Aviation';
    })
    .map(function(obj) {
      return obj.fueltype;
    });

    let HDV_fueltypeList = fueltype
    .filter(function(d) {
      return d.transporttype === 'Heavy duty vehicles';
    })
    .map(function(obj) {
      return obj.fueltype;
    });

    let CnLCV_fueltypeList = fueltype
    .filter(function(d) {
      return d.transporttype === 'Cars and light commercial vehicles';
    })
    .map(function(obj) {
      return obj.fueltype;
    });

    let LDV_fueltypeList = fueltype
    .filter(function(d) {
      return d.transporttype === 'Light duty vehicles';
    })
    .map(function(obj) {
      return obj.fueltype;
    });

    if (transtypevalue === 'Cars and light commercial vehicles') {
      fueltypeList = CnLCV_fueltypeList;
    } else if (transtypevalue === 'Light duty vehicles') {
      fueltypeList = LDV_fueltypeList;
    } else if (transtypevalue === 'Heavy duty vehicles') {
      fueltypeList = HDV_fueltypeList;
    } else if (transtypevalue === 'Aviation') {
      fueltypeList = Aviation_fueltypeList;
    }

    async function handleClick() {
      await handleTransSubmit(); // wait for handleElecSubmit to complete
      setTimeout(() => {
        GetResult(); // execute GetResult after 1 second
      }, 500); // 1000 milliseconds = 1 second
    }
    function handleTransSubmit() {
        fetch(`http://localhost:${portNum}/transdata`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin':'http://localhost:3000',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
            body: JSON.stringify({
                country: countryvalue,
                transtype:transtypevalue,
                fueltype: fueltypevalue,
                unit: transunitvalue,
                trans: transvalue

            }),
        }).then(resp => resp.json())
        .then(resp => console.log(resp))
        .catch(err => console.log(err)) 
    };
    function GetResult() {

        fetch(`http://localhost:${portNum}/transresult`,{
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
       <Grid item xs={12} md={12} mt={5}>
      <img  src={Transicon} alt="transport icon" width='80px'/>
    </Grid>
    <Grid item xs={12} md={6} padding={5}>
      <h2>Transportation</h2>
  
      <p className={classes.p}>
        Transport is another significant source of greenhouse gas emissions in Australia, as reported by the National Greenhouse Gas Inventory (NGGI) produced by the Australian government. <br />
        Transportation activities, including passenger cars, trucks, buses, trains, and airplanes, are major contributors to emissions of carbon dioxide and other greenhouse gases.<br />
        <br />
        To reduce greenhouse gas emissions from transport, various measures can be implemented, such as promoting the use of public transportation, <br />
        increasing the use of fuel-efficient vehicles, promoting carpooling, and encouraging the use of alternative transportation modes such as cycling and walking. <br />
        In addition, the promotion of sustainable urban planning and the development of infrastructure to support sustainable modes of transportation can also help to reduce greenhouse gas emissions from transport in Australia.<br />
        <br />
        In recent years, there has been a growing emphasis on reducing greenhouse gas emissions from the transportation sector in Australia, <br />
        as part of efforts to address climate change and promote sustainable development.<br />
      </p>
    </Grid>
    <Grid item xs={12} md={12} className={classes.text}>
    <p>According to the guidance of the <a href='https://www.dcceew.gov.au/sites/default/files/documents/national-greenhouse-accounts-factors-2022.pdf' target='_blank' rel="noreferrer"> Australian National Greenhouse Accounts Factors </a></p>
      <p>
      The following formula can be used to estimate greenhouse gas emissions from the combustion of fuel:
      </p>
      <img src={ TransEq } alt='calculation method' width='300px'/>
      <p className={classes.p}>
        <strong>Where:</strong> <br />
        <strong>t CO2-e</strong> is the emissions from each fuel type and each fuel type measured in CO2-e tonnes.<br />

        <strong>Q</strong> is the quantity of fuel type, measured in kilolitres or gigajoules, and combusted for transport energy purposes. <br />

        <strong>EC</strong> is the energy content factor of fuel type (gigajoules per kilolitre or per cubic metre) used for transport energy purposes <br />

        <strong>EF1</strong> is the scope 1 emission factor, in kilograms of CO2-e per gigajoule, for each transport type and for each fuel type. <br />
        
        <strong>EF3</strong>is the scope 3 emission factor, in kilograms of CO2-e per gigajoule. <br />
      </p>
    </Grid>
    <Grid item xs={12} md={4}>
      <Autocomplete
      className={classes.text}
      disablePortal
      id="type"
      options={transtype}
      sx={{ width: 300, mt: 2 }}
      renderInput={(params) => <TextField {...params} label="Type of Transport" />}
      onChange={(event) => { setTransTypeValue(event.target.textContent); setFuelTypeValue("")} } 
      />
    </Grid>
    
    <Grid item xs={12} md={4}>
        <Autocomplete
        className={classes.text}
        disablePortal
        id="type"
        options={fueltypeList}
        sx={{ width: 300, mt: 2 }}
        renderInput={(params) => <TextField {...params} label="Type of Fuel" />}
        onChange={(event) => { setFuelTypeValue(event.target.textContent); } } />
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
                {/* <FormControlLabel value="m3" control={<Radio />} label="m3" /> */}
            </RadioGroup>
        </FormControl>
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
        <p 
        className={classes.text}
        id='resultP' 
        style={{display:'none'}}>
          Total Greenhouse Gas Emissions from fuel (t CO2e): {transresult.total} <br />
          CO2 Emissions from fuel (t CO2e):  {transresult.co2} <br />
          CH4 Emissions from fuel (t CO2e):  {transresult.ch4} <br />
          N2O Emissions from fuel (t CO2e):  {transresult.n2o} <br />
        </p>
        {console.log(transresult)}
    </Grid>      
    </>
  )
}
