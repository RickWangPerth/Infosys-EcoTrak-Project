import React from 'react';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';



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
    top: '50%',

    left: '10%',
   },
   
   button:{
    position: 'relative',
    top: '50%',
    margin: 'auto',
    width: '300px',
    height: '50px',
    },
})

const stateName = [
    {label:'New South Wales and ACT', value:'01'},
    {label:'Victoria', value:'02'},
    {label:'Queensland', value:'03'},
    {label:'New South Australia', value:'04'},
    {label:'Western Australia', value:'05'},
    {label:'Tasmania', value:'06'},
    {label:'Northern Territory', value:'07'},
    {label:'National', value:'08'},
  ]



export default function elecal() {
    const classes = calStyle();

  return (
    <>
    <div className={classes.cal}>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Autocomplete
                className={classes.text}
                disablePortal
                id="state"
                options={stateName}
                sx={{ width: 300 , mt: 2}}
                renderInput={(params) => <TextField {...params} label="state" />}
                onChange={(event,statevalue) => console.log(statevalue.value)} 
                />
            </Grid>
            <Grid item xs={12}md={6}>
                <TextField
                className={classes.text}
                sx={{ width: 300 , mt: 2}}
                required
                id="outlined-required"
                label="electricity(kWh)"
                defaultValue="0"
                />
            </Grid>
            <Grid item xs={12}>
                <div className={classes.button}>
                    <Button variant="contained"
                        sx={{ width: 300 , mt: 12, background:'#7ECA58'}}
                        onClick={() => { console.log('onClick'); }}
                        >
                        Claculate
                    </Button>
                </div>

            </Grid>
        </Grid>
    </div>
    </>
  )
}
