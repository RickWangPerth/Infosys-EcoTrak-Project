import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import NaturePic from '../img/nature3.jpeg';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const calStyle = makeStyles({
   cal: {
      display: 'absolute',
      position: 'absolute',
      textAlign: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: '#F1F2ED',

  },
  pic: {
    maxWidth: '100%',
  }
})

const countryName = [
  {label:'Australia', value:'01'},
  {label:'USA', value:'02'},
  {label:'India', value:'03'},
  {label:'New Zeland', value:'04'},
]

const calType = [
  {label:'Electricity', value:'91'},
  {label:'Waste', value:'92'},
]

export default function SelectLabels() {

  const classes = calStyle();

  return (
    <div className={classes.cal}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
        <Autocomplete
          disablePortal
          id="country"
          options={countryName}
          sx={{ width: 300, mt: 2 }}
          renderInput={(params) => <TextField {...params} label="Country" />}
          onChange={(event,countryvalue) => console.log(countryvalue)} 
        />
        </Grid>
        <Grid item xs={12}md={6}>
        <Autocomplete
          disablePortal
          id="type"
          options={calType}
          sx={{ width: 300, mt: 2 }}
          renderInput={(params) => <TextField {...params} label="Type" />}
          onChange={(event,typevalue) => console.log(typevalue)} 
        />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained"
          sx={{ width: 300, mt: 2 , color: '#7ECA58',background:'#7ECA58'}}>
            <Link to="/electricity">Next</Link>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}