import React from 'react'
import { Autocomplete } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from 'react';
import { Grid, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

import ch4 from '../img/ch4.png';
import co2 from '../img/co2.png';
import n2o from '../img/n2o.png';
import fueltotal from '../img/fueltotal.png';

import Fuelicon from '../img/fuel.png';
import FuelEq from '../img/equations/fuelEq.png';
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

export default function AUFuelcal(countryvalue,typevalue) {
    const portNum = 5000;
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
      fetch(`http://127.0.0.1:${portNum}/solidfueltype`,{        
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
      fetch(`http://127.0.0.1:${portNum}/liquidfueltype`,{
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
      fetch(`http://127.0.0.1:${portNum}/gaseousfueltype`,{
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
      fetch(`http://127.0.0.1:${portNum}/fueltype`,{
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

    async function handleClick() {
      await handleFuelSubmit(); // wait for handleWasteSubmit to complete
      setTimeout(() => {
        GetResult(); // execute GetResult after 1 second
      }, 500); // 500 milliseconds = 1 second
    }

    function handleFuelSubmit() {
        fetch(`http://localhost:${portNum}/fueldata`,{
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
      }
      function GetResult(){
        fetch(`http://localhost:${portNum}/fuelresult`,{
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
    <Grid item xs={12} md={6} padding={5}>
      <h2>Combustion of Fuel</h2>
  
      <p className={classes.p}>
        The National Greenhouse Gas Inventory (NGGI) produced by the Australian government reports that fuel combustion is a major contributor to greenhouse gas emissions in Australia. <br />
        This encompasses the burning of fuels for energy production, transportation, and other purposes.  <br />
        The combustion of fossil fuels, such as coal, oil, and gas, releases substantial quantities of carbon dioxide and other greenhouse gases into the atmosphere,  <br />
        which exacerbate climate change. As such, reducing emissions from fuel combustion is crucial for mitigating climate change impacts in Australia.  <br />
        This can be achieved through a variety of measures, such as promoting the use of renewable energy sources, enhancing energy efficiency,  <br />
        and advocating for sustainable modes of transportation. <br />
      </p>
    </Grid>
    <Grid item xs={12} md={12} className={classes.text}>
    <p>According to the guidance of the <a href='https://www.dcceew.gov.au/sites/default/files/documents/national-greenhouse-accounts-factors-2022.pdf' target='_blank' rel="noreferrer"> Australian National Greenhouse Accounts Factors </a></p>
      <p>
      The following formula can be used to estimate greenhouse gas emissions from the combustion of fuel:
      </p>
      <img src={ FuelEq } alt='calculation method' width='300px'/>
      <p className={classes.p}>
        <strong>Where:</strong> <br />
        <strong>t CO2-e</strong> is the emissions measured in CO2-e tonnes.<br />

        <strong>Q</strong> is the quantity of fuel type measured in tonnes or gigajoules. <br />

        <strong>EC</strong> is the energy content factor of the fuel (gigajoules per tonne). <br />

        <strong>EF1</strong> is the scope 1 emission factor, in kilograms of CO2-e per gigajoule. <br />
        
        <strong>EF3</strong> is the scope 3 emission factor, in kilograms of CO2-e per gigajoule. <br />
      </p>
    </Grid>

    <Grid item xs={12} md={12} mt={5} >
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
            handleClick();
            } }
          >
          Calculate
      </Button>
    </Grid>
    <Grid item xs={12} md={12}>
      <div 
        className={classes.text}
        id='resultP' 
        style={{display:'none'}}>
        <h3 className={classes.h3}>Result</h3>
        <div>
          <img src={fueltotal} alt='total' className={classes.img} />
          <span className={classes.p}>   Total Greenhouse Gas Emissions from fuel (t CO2e): {fuelresult.total}</span>
        </div>
        <div>
          <img src={co2} alt='co2' className={classes.img} />
          <span className={classes.p}>   Carbon dioxide (CO2) Emissions from fuel (t CO2e):  {fuelresult.co2}</span>
        </div>
        <div>
          <img src={ch4} alt='ch4' className={classes.img} />
          <span className={classes.p}>   Mrthane (CH4) Emissions from fuel (t CO2e):  {fuelresult.ch4}</span>
        </div>
        <div>
          <img src={n2o} alt='n2o' className={classes.img} />
          <span className={classes.p}>   Nitrous oxide (N2O) Emissions from fuel (t CO2e):  {fuelresult.n2o}</span>
        </div>
      </div>
    </Grid>
    </>
  )
}
