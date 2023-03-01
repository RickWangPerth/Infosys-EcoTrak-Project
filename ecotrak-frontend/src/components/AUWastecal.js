import React from 'react'
import { Autocomplete } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from 'react';
import { Grid, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

import Wasteicon from '../img/waste.png';
import WasteEq1 from '../img/equations/wasteEq1.png';
import WasteEq2 from '../img/equations/wasteEq2.png';

const calStyle = makeStyles({
  text:{
    position: 'relative',
    top: '10px',
  },
  p:{
    lineHeight: '1.5',
  }
})

export default function AUWasteCal(countryvalue,typevalue) {
  const classes = calStyle();
  const portNum = 9888;

  // Waste type
  const [wastetype, setWastetype] = useState([]);
  const [solidwastetype, setSolidwastetype] = useState([]);
  const [combinedwastetype, setCombinedwastetype] = useState([]);
    
  useEffect(() => {
    fetch(`http://127.0.0.1:${portNum}/wastetype`,{
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin':'http://localhost:3000',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
    })
      .then(response => response.json())
      .then(data => setWastetype(data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`http://127.0.0.1:${portNum}/solidwastetype`,{
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin':'http://localhost:3000',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
    })
      .then(response => response.json())
      .then(data => setSolidwastetype(data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`http://127.0.0.1:${portNum}/combinedwastetype`,{
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin':'http://localhost:3000',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
    })
      .then(response => response.json())
      .then(data => setCombinedwastetype(data))
      .catch(error => console.log(error));
  }, []);

    // Waste value
    const [wastevalue, setWasteValue] = useState([]);
    const [wasteunitvalue, setWasteUnitValue] = useState([]);
    const [wasteresult, setWasteResult] = useState([]);
    const [wastetypevalue, setWasteTypeValue] = useState([]);
    const [wastesubtypevalue, setWasteSubTypeValue] = useState([]);

    async function handleClick() {
      await handleWasteSubmit(); // wait for handleWasteSubmit to complete
      setTimeout(() => {
        GetResult(); // execute GetResult after 1 second
      }, 500); // 500 milliseconds = 1 second
    }

    function handleWasteSubmit() {
      fetch(`http://localhost:${portNum}/wastedata`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin':'http://localhost:3000',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
          body: JSON.stringify({
              country: countryvalue,
              type: wastetypevalue,
              subtype: wastesubtypevalue,
              unit: wasteunitvalue,
              waste: wastevalue
          }),
      }).then(resp => resp.json())
      .then(resp => console.log(resp))
      .catch(err => console.log(err)) 
    };

    function GetResult() {
      fetch(`http://localhost:${portNum}/wasteresult`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin':'http://localhost:3000',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        }
      }).then(resp => resp.json())
      .then(resp =>  setWasteResult(resp))
      .catch(err => console.log(err)) 

      var result = document.getElementById("resultP")
        result.style.display = "block";
    }

  return (
    <>
    <Grid item xs={12} md={12} mt={5}>
      <img  src={Wasteicon} alt="fuel icon" width='80px'/>
    </Grid>
    <Grid item xs={12} md={6} padding={5}>
      <h2>Waste Disposal</h2>
  
      <p className={classes.p}>
        Waste is a significant source of greenhouse gas emissions in Australia, as reported by the National Greenhouse Gas Inventory (NGGI) produced by the Australian government. <br />
        When organic waste such as food scraps, yard trimmings, and paper products decompose in landfills, they produce methane, a potent greenhouse gas that contributes to climate change. <br />
        In addition, waste treatment processes such as incineration can also release greenhouse gases. <br />
        <br />
        To reduce greenhouse gas emissions from waste, various measures can be implemented, <br />
        such as reducing the amount of waste produced, promoting recycling and composting, and capturing and utilizing methane emissions from landfills. <br />
        In recent years, there has been a growing emphasis on reducing waste and increasing the use of sustainable waste management practices in Australia to address the climate change impacts.<br />
      </p>
    </Grid>
    <Grid item xs={12} md={12} className={classes.text}>
    <p>According to the guidance of the <a href='https://www.dcceew.gov.au/sites/default/files/documents/national-greenhouse-accounts-factors-2022.pdf' target='_blank' rel="noreferrer"> Australian National Greenhouse Accounts Factors </a></p>
      <p>
      Estimates of Scope 3 greenhouse gas emissions associated with the disposal of waste can be calculated as follows:
      </p>
      <p>When weight of waste is known:</p>
      <img src={WasteEq1} alt='calculation method' width='240px'/>
      <p>When weight is not known:</p>
      <img src={WasteEq2} alt='calculation method' width='300px'/>
      <p className={classes.p}>
        <strong>Where:</strong> <br />
        <strong>t CO2-e</strong> is the emissions measured in CO2-e tonnes.<br />

        <strong>Q</strong> is the quantity of waste measured in tonnes. <br />

        <strong>EF</strong> is the emission factor of waste. <br />

        <strong>m3</strong> is the volume of waste measure in cubic metres. <br />
        
        <strong>CF</strong> is the conversation factor of volume to mass. <br />
      </p>
    </Grid>
    <Grid item xs={12} md={4} mt={5}>
      <Autocomplete
        className={classes.text}
        disablePortal
        id="type"
        options={wastetype}
        sx={{ width: 300, mt: 2 }}
        renderInput={(params) => <TextField {...params} label="Type of Waste" />}
        onChange={(event) => { setWasteTypeValue(event.target.textContent); } } />
        </Grid>
        {
          wastetypevalue==='Solid Waste' ?
          <>
            <Grid item xs={12} md={4} mt={5}>
              <Autocomplete
              className={classes.text}
              disablePortal
              id="type"
              options={solidwastetype}
              sx={{ width: 300, mt: 2 }}
              renderInput={(params) => <TextField {...params} label="Type of Solid Waste" />}
              onChange={(event) => { setWasteSubTypeValue(event.target.textContent); } } />
            </Grid>
            <Grid item xs={12} md={4} mt={5}>
              <FormControl>
                <FormLabel id="wasteunit-radio-buttons-group" className={classes.text} >Unit</FormLabel>
                <RadioGroup
                    className={classes.text}
                    aria-labelledby="wasteunit-radio-buttons-group"    
                    name="wasteunit-radio-buttons-group"
                    onChange={(event) => setWasteUnitValue(event.target.value)}
                >
                    <FormControlLabel value="kg" control={<Radio />} label="kg" />
                    <FormControlLabel value="m3" control={<Radio />} label="m3" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </>
          : wastetypevalue==='Combined Waste' ?
          <>
            <Grid item xs={12} md={4} mt={5}>
              <Autocomplete
              className={classes.text}
              disablePortal
              id="type"
              options={combinedwastetype}
              sx={{ width: 300, mt: 2 }}
              renderInput={(params) => <TextField {...params} label="Type of Combined Waste" />}
              onChange={(event) => { setWasteSubTypeValue(event.target.textContent); } } />
            </Grid>
            <Grid item xs={12} md={4} mt={5}>
              <FormControl>
                <FormLabel id="wasteunit-radio-buttons-group" className={classes.text} >Unit</FormLabel>
                <RadioGroup
                    className={classes.text}
                    aria-labelledby="wasteunit-radio-buttons-group"    
                    name="wasteunit-radio-buttons-group"
                    onChange={(event) => setWasteUnitValue(event.target.value)}
                >
                    <FormControlLabel value="kg" control={<Radio />} label="kg" />
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
            label="Amount of Waste"
            defaultValue="0"
            onChange={(event) => { setWasteValue(event.target.value); } } />
      </Grid>
      <Grid item xs={12} md={12} mt={5}>
        <Button variant="contained"
          className={classes.text}
          type='submit'
          sx={{ width: 300, background: '#7ECA58' }}
          onClick={() => {
            handleClick();
          } }
        >
          Calculate
        </Button>
        <p
          className={classes.text}
          id='resultP'
          style={{ display: 'none' }}>
          "Total Greenhouse Gas Emissions from fuel (t CO2e): " {wasteresult.total}
        </p>
        {console.log(wasteresult)}
      </Grid>
    </>
  )
}
