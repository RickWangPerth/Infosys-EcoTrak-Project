import React from 'react'
import ElecEq from "../img/equations/elecEq.png";
import Elecicon from "../img/electricity.png";
import { Autocomplete } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from 'react';
import { Grid, Button, TextField, FormControl} from '@mui/material';


import ch4 from '../img/ch4.png';
import co2 from '../img/co2.png';
import n2o from '../img/n2o.png';
import electotal from '../img/electotal.png';

import map from '../img/egrid2020_subregion_map.png';
const calStyle = makeStyles({

     text:{
      position: 'relative',
      top: '10px',

     },
    p:{
      lineHeight: '1.5',
    },
    img:{
      width: '40px',
      verticalAlign: 'middle', 
    },
    map:{
      position: 'relative',
      width: '40%',
      height: 'auto',
      left: '0',
      right: '0',
      marginLeft: 'auto',
      marginRight: 'auto',
      minWidth: '300px',
    },
    box:{
      display:'inline-block',
      width: '100%',
      height: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign: 'center',
      verticalAlign: 'middle',
    },
  })

export default function USElecal(countryvalue,typevalue) {
    const classes = calStyle();
    // const portNum = 5001;

    const [region, setRegion] = useState([]);
    const [regionvalue, setRegionValue] = useState([]);
    // Static data
    useEffect(() => {
    fetch(`http://127.0.0.1:5001/usregion`,{        
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Origin':'http://localhost:3000',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
  },})
        .then(response => response.json())
        .then(data => setRegion(data))
        .catch(error => console.log(error));
    }, []);

  
    // Electricity value
      const [elecvalue, setElecValue] = useState([]);
      const [elecresult, setElecResult] = useState([]);
      
      async function handleClick() {
        await handleElecSubmit(); // wait for handleElecSubmit to complete
        setTimeout(() => {
          GetResult(); // execute GetResult after 1 second
        }, 300); // 1000 milliseconds = 1 second
      }
      
      function handleElecSubmit() {
        return fetch(`http://127.0.0.1:5001/uselecdata`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': 'http://localhost:3000',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
          },
          body: JSON.stringify({
            country: countryvalue,
            region: regionvalue,
            type: typevalue,
            elec: elecvalue,
          }),
        })
          .then((resp) => resp.json())
          .then((resp) => console.log(resp))
          .catch((err) => console.log(err));
      }
      
      function GetResult() {
        fetch(`http://localhost/uselecresult`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': 'http://localhost:3000',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
          },
        })
          .then((resp) => resp.json())
          .then((resp) => setElecResult(resp))
          .catch((err) => console.log(err));
      
        var result = document.getElementById('resultP');
        result.style.display = 'block';
      }
      
  return (
    <>
      <Grid item xs={12} md={2} mt={5}>

      <img src={Elecicon} alt='elec icon' width='80px'/>
      </Grid>
      <Grid item xs={12} md={6} mt={5}>
      <h2>Electricity Usage</h2>
  
      <p className={classes.p}>
        Electricity usage is a significant source of greenhouse gas emissions in the United States. <br />
        According to the US Environmental Protection Agency (EPA), electricity generation accounted for 25% of the country's greenhouse gas emissions in 2019, making it the largest emitting sector.<br />
        <br />
        The majority of electricity in the United States is generated from fossil fuels, such as coal, natural gas, and oil, <br />
        which emit significant amounts of carbon dioxide and other greenhouse gases into the atmosphere. <br />
        However, there has been a gradual shift towards cleaner sources of electricity in recent years, <br />
        including renewable energy sources such as wind and solar power, which can help to reduce greenhouse gas emissions from the electricity sector.<br />
        <br />
        To reduce greenhouse gas emissions from electricity usage in the US, various measures can be implemented, <br />
        such as improving energy efficiency, promoting the use of renewable energy sources, and adopting sustainable behaviors such as turning off lights and appliances when not in use. <br />
        In addition, policies and regulations that promote the adoption of cleaner sources of electricity and encourage energy conservation can also help to reduce greenhouse gas emissions from the electricity sector in the United States.<br />
      </p>
    </Grid>
    <Grid item xs={12} md={12} className={classes.text} mt={5}>
      <p>According to the guidance of the <a href='https://www.dcceew.gov.au/sites/default/files/documents/national-greenhouse-accounts-factors-2022.pdf' target='_blank' rel="noreferrer"> Australian National Greenhouse Accounts Factors </a></p>
      <p>
      The following method is used for estimating scope 2 and scope 3 emissions released from electricity purchased through the electricity grid and consumed:
      </p>
      <img src={ElecEq} alt='calculation method' width='300px'/>
      <p className={classes.p}>
        <strong>Where:</strong> <br />
        <strong>t CO2-e</strong> is the emissions measured in CO2-e tonnes.<br />

        <strong>Q</strong> is the quantity of electricity purchased from the electricity grid during the year and consumed from the operation of the facility measured in kilowatt hours. <br />

        <strong>EF2</strong> is the scope 2 emission factor, in kilograms of CO2-e emissions per kilowatt hour. <br />
        
        <strong>EF3</strong> is the scope 3 emission factor, in kilograms of CO2-e emissions per kilowatt hour. <br />
      </p>
    </Grid>
    <Grid container
    spacing={2}
    direction="column"
    justifyContent="center"
    alignItems="center"  
    >
    <Grid item xs={12} md={12} className={classes.text} mt={1}>
    <p> You can the grid for your region in 
      <a href='https://www.epa.gov/system/files/images/2022-01/egrid2020_subregion_map.png' target='_blank' rel="noreferrer"> representational maps </a>
      provided by<a href='https://www.epa.gov/egrid' target='_blank' rel="noreferrer"> United State Enviornmental Protection Agency (EPA) </a>
    </p>
   
    </Grid>
    <Grid item xs={12} md={4} mt={1}>
      <div className={classes.box}>
        <img src={map} alt='map' className={classes.map}/>
      </div>
    </Grid>
    <Grid item xs={12} md={4} mt={1}>
    <Autocomplete
        className={classes.text}
        disablePortal
        id="region"
        options={region}
        sx={{ width: 300 , mt: 2}}
        renderInput={(params) => <TextField {...params} label="eGRID Subregion" />}
        onChange={(event) => {setRegionValue(event.target.textContent)}} 
        />
    </Grid>
    <Grid item xs={12} md={4} mt={5}>
    <FormControl>
    <TextField
        className={classes.text}
        disablePortal
        sx={{ width: 300, mt: 2 }}
        required
        id="outlined-required"
        label="Electricity(kWh)"
        defaultValue='0'
        onChange={(event) => { setElecValue(event.target.value); } } />
    </FormControl>
    </Grid>
    </Grid>
    <Grid item xs={12} md={12} mt={5}>
        <Button variant="contained"
            className={classes.text}
            type='submit'
            sx={{ width: 300 , background:'#7ECA58'}}
            onClick={ () => {
                handleClick();
              } }
            >
            Calculate
        </Button>
      </Grid>
      <Grid item xs={12} md={12} mt={5}>
        <div 
        className={classes.text}
        id='resultP' 
        style={{display:'none'}}>
        <h3 className={classes.h3}>Result</h3>
        <div>
          <img src={electotal} alt='total' className={classes.img} />
          <span className={classes.p}>   Total Greenhouse Gas Emissions from electricity (t CO2e): {parseFloat(elecresult.sc_co2) + parseFloat(elecresult.sc_n2o) + parseFloat(elecresult.sc_ch4)}</span>
        </div>
        <div>
          <img src={co2} alt='co2' className={classes.img} />
          <span className={classes.p}>   Carbon dioxide (CO2) Emissions from electricity (t CO2e):  {elecresult.sc_co2}</span>
        </div>
        <div>
          <img src={ch4} alt='ch4' className={classes.img} />
          <span className={classes.p}>   Mrthane (CH4) Emissions from electricity (t CO2e):  {elecresult.sc_ch4}</span>
        </div>
        <div>
          <img src={n2o} alt='n2o' className={classes.img} />
          <span className={classes.p}>   Nitrous oxide (N2O) Emissions from electricity (t CO2e):  {elecresult.sc_n2o}</span>
        </div>
      </div>
    </Grid>
    </>
  )
}
