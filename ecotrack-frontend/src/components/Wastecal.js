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
      left: '30px',
     },
  
  })

export default function WasteCal(countryvalue,typevalue) {
    const classes = calStyle();
      // Waste type
      const [wastetype, setWastetype] = useState([]);
      const [solidwastetype, setSolidwastetype] = useState([]);
      const [combinedwastetype, setCombinedwastetype] = useState([]);
    
      useEffect(() => {
        fetch('http://127.0.0.1:5000/wastetype',{
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
        fetch('http://127.0.0.1:5000/solidwastetype',{
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
        fetch('http://127.0.0.1:5000/combinedwastetype',{
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

      function handleWasteSubmit() {
        fetch('http://localhost:5000/wastedata',{
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
                elec: wastevalue
            }),
        }).then(resp => resp.json())
        .then(resp => console.log(resp))
        .catch(err => console.log(err))
  
        fetch('http://localhost:5000/wasteresult',{
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
  
      };

  return (
    <>
    <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
            <Autocomplete
            className={classes.text}
            disablePortal
            id="type"
            options={solidwastetype}
            sx={{ width: 300, mt: 2 }}
            renderInput={(params) => <TextField {...params} label="Type of Solid Waste" />}
            onChange={(event) => { setWasteSubTypeValue(event.target.textContent); } } />
            </Grid>
          </>
          : wastetypevalue==='Combined Waste' ?
          <>
            <Grid item xs={12} md={4}>
            <Autocomplete
            className={classes.text}
            disablePortal
            id="type"
            options={combinedwastetype}
            sx={{ width: 300, mt: 2 }}
            renderInput={(params) => <TextField {...params} label="Type of Combined Waste" />}
            onChange={(event) => { setWasteSubTypeValue(event.target.textContent); } } />
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
            label="Amount of Waste"
            defaultValue="0"
            onChange={(event) => { setWasteValue(event.target.value); } } />
      </Grid>
      <Grid item xs={12} md={12}>
        <Button variant="contained"
          className={classes.text}
          type='submit'
          sx={{ width: 300, background: '#7ECA58' }}
          onClick={() => {
            handleWasteSubmit();
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
