import React from 'react'
import { useState } from 'react';
import { Autocomplete, Grid, TextField } from '@mui/material';
import USElecal from './USElecal';



const calType = [
    {label:'Electricity'},
  ]

export default function AUcal(countryvalue) {

    const [typevalue, setTypeValue] = useState([]);
  return (
    <>  
      <Grid item xs={12} md={12}>
        <Autocomplete
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
        <USElecal countryvalue={countryvalue} typevalue={typevalue} />
        : null
        } 
    </>
  )
}
