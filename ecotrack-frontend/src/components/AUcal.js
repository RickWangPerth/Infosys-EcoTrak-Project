import React from 'react'
import { useState } from 'react';
import { Autocomplete, Grid, TextField } from '@mui/material';
import AUElecal from './AUElecal';
import AUWastecal from './AUWastecal';
import AUFuelcal from './AUFuelcal';
import AUTranscal from './AUTranscal';


const calType = [
    {label:'Electricity'},
    {label:'Waste'},
    {label:'Fuel'},
    {label:'Transport'},
  ]

export default function AUcal(countryvalue) {

    const [typevalue, setTypeValue] = useState([]);
  return (
    <>  

        <Autocomplete
          disablePortal
          id="type"
          options={calType}
          sx={{ width: 300, mt: 2 }}
          renderInput={(params) => <TextField {...params} label="Type" />}
          onChange={(event) => {setTypeValue(event.target.textContent);}} 
          />

        {
        typevalue === 'Electricity' ? 
        <AUElecal countryvalue={countryvalue} typevalue={typevalue} />
        : typevalue ==='Waste' ? 
        <AUWastecal countryvalue={countryvalue} typevalue={typevalue} />
        : typevalue ==='Fuel' ?
        <AUFuelcal countryvalue={countryvalue} typevalue={typevalue} />
          : typevalue ==='Transport' ? 
        <AUTranscal countryvalue={countryvalue} typevalue={typevalue} />
        : null
        } 
    </>
  )
}
