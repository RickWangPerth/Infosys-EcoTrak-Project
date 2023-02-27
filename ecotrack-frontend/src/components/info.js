import * as React from 'react';
import { makeStyles } from '@mui/styles';
import { Autocomplete, Grid, TextField, Typography,Box } from '@mui/material';

import { useState,useEffect } from 'react';
import Auscal from './Auscal';

const calStyle = makeStyles({
  cal: {
    display: 'absolute',
    position: 'absolute',
    backgroundColor: '#F1F2ED',          
   },
   text:{
    display: 'flex',
    position: 'relative',
    margin: '10px, 100px, 100px, 100px',
    padding: '10px, 10px, 10px, 10px',
    textAlign: 'center',
   },

})

const countryName = [
    {label:'Australia'},
    {label:'USA'},
  ]
  
export default function Info() {
    const classes = calStyle();
    const [countryvalue, setCountryValue] = useState([]);
  return (
    <div className={classes.cal} >
        
        <Grid container 
          spacing={2}
          direction="column"
          alignItems="center"
          justifyContent="center"
          >
            <Grid item xs={12} md={12}>
              <p>
                Welcome to EcoTrak, the powerful and easy-to-use greenhouse gas (GHG) calculator designed to help you calculate your carbon footprint in Australia and the United States. <br />
                Whether you're an individual, a business, or a community, EcoTrak can help you identify and reduce your GHG emissions.
              </p>
            </Grid>
            <Grid item xs={12} md={4}>
                <Autocomplete
                    disablePortal
                    id="country"
                    options={countryName}
                    sx={{ width: 300, mt: 2 }}
                    renderInput={(params) => <TextField {...params} label="Country" />}
                    onChange={(event) => {setCountryValue(event.target.textContent)}} 
                    />
            </Grid>
            {
                countryvalue === 'Australia' ?
                <Auscal countryvalue={countryvalue} />
                : null
            }
        </Grid>
    </div>

  )
}
