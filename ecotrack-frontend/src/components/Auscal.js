import React from 'react'
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from 'react';
import { Autocomplete, Grid, TextField, Button, Radio, RadioGroup,FormControlLabel,FormControl,FormLabel } from '@mui/material';
import Elecal from './Elecal';
import WasteCal from './Wastecal';
import Fuelcal from './Fuelcal';
import Transcal from './Transcal';

const calStyle = makeStyles({
    cal: {
         display: 'absolute',
         position: 'absolute',
  
         backgroundColor: '#F1F2ED',          
     },
     text:{
      position: 'relative',

     },
  
  })

const calType = [
    {label:'Electricity'},
    {label:'Waste'},
    {label:'Fuel'},
    {label:'Transport'},
  ]

export default function Auscal(countryvalue) {

    const classes = calStyle();
    const [typevalue, setTypeValue] = useState([]);
  return (
    <>
        <Grid item xs={12} md={4}>
            <Autocomplete
                className={classes.text}
                disablePortal
                id="type"
                options={calType}
                sx={{ width: 300, mt: 2 }}
                renderInput={(params) => <TextField {...params} label="Type" />}
                onChange={(event) => {setTypeValue(event.target.textContent);}} 
                />
            </Grid>
                {
                typevalue === 'Electricity' ? 
                <Elecal countryvalue={countryvalue} typevalue={typevalue} />
                : typevalue ==='Waste' ? 
                <WasteCal countryvalue={countryvalue} typevalue={typevalue} />
                : typevalue ==='Fuel' ?
                <Fuelcal countryvalue={countryvalue} typevalue={typevalue} />
                  : typevalue ==='Transport' ? 
                <Transcal countryvalue={countryvalue} typevalue={typevalue} />
                : null
                } 
    </>
  )
}
