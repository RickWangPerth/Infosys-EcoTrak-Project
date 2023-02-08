import React from 'react';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import Result from './result';



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

})

const stateName = [
    {label:'New South Wales and ACT'},
    {label:'Victoria'},
    {label:'Queensland'},
    {label:'South Australia'},
    {label:'Western Australia'},
    {label:'Tasmania'},
    {label:'Northern Territory'},
    {label:'National'},
]


export default function Elecal() {
    const classes = calStyle();

    //const [data, setData] = useState({});

    const [statevalue, setStateValue] = useState([]);
    const [elecvalue, setElecValue] = useState([]);

    // const handleChange = (event) => {
    //     setData({ ...data, [event.target.name]: event.target.value });
    //   };
    

    // const handleClick = () => {
    //     console.log(statevalue+' '+elecvalue);
    // }

    const handleSubmit = async (event) => {
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin','http://localhost:3000');

        event.preventDefault();
        const response = await fetch('http://localhost:5000/elecdata', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            state: statevalue,
            elec: elecvalue
          })
        });
        const result = await response.json();
        console.log(result);
        
      };

  return (
    <>
    <div className={classes.cal}>
        <Grid container spacing={2}>
        <form onSubmit={handleSubmit}>
            <Grid item xs={12} md={6}>
                <Autocomplete
                className={classes.text}
                disablePortal
                id="state"
                options={stateName}
                sx={{ width: 300 , mt: 2}}
                renderInput={(params) => <TextField {...params} label="state" />}
                onChange={(event) => {setStateValue(event.target.textContent)}} 
                //onChange={handleChange}
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
                onChange={(event) => {setElecValue(event.target.value)}}
                //onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <div className={classes.button}>
                    <Button variant="contained"
                        type='submit'
                        sx={{ width: 300 , mt: 12, background:'#7ECA58'}}
                        //onClick={ handleClick }
                        >
                        Claculate
                    </Button>
                </div>
            </Grid>
            </form>
        </Grid>
        <div className={classes.result}>
            <Result />
        </div>

    </div>
    </>
  )
}
