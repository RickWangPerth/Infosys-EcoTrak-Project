import * as React from 'react';
import { makeStyles } from '@mui/styles';
import { Autocomplete, Grid, TextField} from '@mui/material';
import { useState} from 'react';
import AUFlag from '../img/australia.png';
import USFlag from '../img/us.png';

import AUcal from './AUcal';
import UScal from './UScal';

const calStyle = makeStyles({
  cal: {
    display: 'absolute',
    position: 'absolute',
    width: '100%',
    height: '360vh',
    backgroundColor: '#F1F2ED',          
   },
   text:{
    display: 'flex',
    position: 'relative',
    width: '100%',
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
        direction="column"
        alignItems="center"
        justifyContent="center"
        padding={5}
        spacing={2}
        >
        <Grid item xs={12} md={12}>
          <p className={classes.text}>
            Welcome to EcoTrak, the powerful and easy-to-use greenhouse gas (GHG) calculator designed to help you calculate your carbon footprint in Australia and the United States.
          </p>
          <p className={classes.text}>
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
            <>
            <Grid item xs={12} md={4} mt={2}>
              <img src={AUFlag} alt='aus' width='80px' />
            </Grid>
              <AUcal countryvalue={countryvalue} />
            </>
            : countryvalue === 'USA' ?
            <>
            <Grid item xs={12} md={4} mt={2}>
              <img src={USFlag} alt='us' width='80px' />
            </Grid>
            <UScal countryvalue={countryvalue} />
            </>
            : null
          }
      </Grid>
    </div>
  )
}
