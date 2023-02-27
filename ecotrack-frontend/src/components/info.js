import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState,useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ElecEq from "../img/equations/elecEq.png";
import Elecal from './Elecal';

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


const countryName = [
    {label:'Australia'},
    {label:'USA'},
    {label:'India'},
    {label:'New Zeland'},
  ]
  
const calType = [
    {label:'Electricity'},
    {label:'Waste'},
    {label:'Fuel'},
    {label:'Transport'},
  ]

export default function Info() {
    const classes = calStyle();
    const resultDisplay = 'none'

    // Static data
  
    const [state, setState] = useState([]);

    useEffect(() => {
      fetch('http://127.0.0.1:5000/statedata',{          
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin':'http://localhost:3000',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },})
        .then(response => response.json())
        .then(data => setState(data))
        .catch(error => console.log(error));
    }, []);

    //fuel type

    const [solidfueltype, setSolidfueltype] = useState([]);
    const [liquidfueltype, setLiquidfueltype] = useState([]);
    const [gaseousfueltype, setGaseousfueltype] = useState([]);
    const [fueltype, setFueltype] = useState([]);

    useEffect(() => {
      fetch('http://127.0.0.1:5000/solidfueltype',{        
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin':'http://localhost:3000',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },})
        .then(response => response.json())
        .then(data => setSolidfueltype(data))
        .catch(error => console.log(error));
    }, []);

    useEffect(() => {
      fetch('http://127.0.0.1:5000/liquidfueltype',{
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin':'http://localhost:3000',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
      })
        .then(response => response.json())
        .then(data => setLiquidfueltype(data))
        .catch(error => console.log(error));
    }, []);    
    
    useEffect(() => {
      fetch('http://127.0.0.1:5000/gaseousfueltype',{
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin':'http://localhost:3000',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
      })
        .then(response => response.json())
        .then(data => setGaseousfueltype(data))
        .catch(error => console.log(error));
    }, []);

    useEffect(() => {
      fetch('http://127.0.0.1:5000/fueltype',{
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin':'http://localhost:3000',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
      })
        .then(response => response.json())
        .then(data => setFueltype(data))
        .catch(error => console.log(error));
    }, []);
    
    // Waste type
    const [wastetype, setWastetype] = useState([]);
    const [solidwastetype, setSolidwastetype] = useState([]);
    const [combinedwastetype, setCombinedwastetype] = useState([]);
  
    useEffect(() => {
      fetch('http://127.0.0.1:5000/wastetype')
        .then(response => response.json())
        .then(data => setWastetype(data))
        .catch(error => console.log(error));
    }, []);

    useEffect(() => {
      fetch('http://127.0.0.1:5000/solidwastetype')
        .then(response => response.json())
        .then(data => setSolidwastetype(data))
        .catch(error => console.log(error));
    }, []);

    useEffect(() => {
      fetch('http://127.0.0.1:5000/combinedwastetype')
        .then(response => response.json())
        .then(data => setCombinedwastetype(data))
        .catch(error => console.log(error));
    }, []);

    const [countryvalue, setCountryValue] = useState([]);
    //const [statevalue, setStateValue] = useState([]);
    const [typevalue, setTypeValue] = useState([]);

    // // Electricity value
    // const [elecvalue, setElecValue] = useState([]);
    // const [unitvalue, setUnitValue] = useState([]);
    // const [elecresult, setElecResult] = useState([]);
    // const [s2, setS2] = useState([]);
    // const [s3, setS3] = useState([]);

    // Waste value
    const [wastevalue, setWasteValue] = useState([]);
    const [solidwastevalue, setSolidWasteValue] = useState([]);
    const [liquidwastevalue, setLiquidWasteValue] = useState([]);
    const [gaswastevalue, setGasWasteValue] = useState([]);
    const [wasteresult, setWasteResult] = useState([]);
    const [wastetypevalue, setWasteTypeValue] = useState([]);
    const [wastesubtypevalue, setWasteSubTypeValue] = useState([]);

    // Fuel value
    const [fuelvalue, setFuelValue] = useState([]);
    const [fuelsubtypevalue, setFuelSubTypeValue] = useState([]);
    const [fuelunitvalue, setFuelUnitValue] = useState([]);
    const [fuelresult, setFuelResult] = useState([]);
    const [fueltypevalue, setFuelTypeValue] = useState([]);
  
    // function handleElecSubmit() {
    //   fetch('http://localhost:5000/elecdata',{
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json',
    //       'Origin':'http://localhost:3000',
    //       'Access-Control-Allow-Origin': 'http://localhost:3000',
    //     },
    //       body: JSON.stringify({
    //           country: countryvalue,
    //           state: statevalue,
    //           type: fueltypevalue,
    //           unit: unitvalue,
    //           elec: elecvalue
    //       }),
    //   }).then(resp => resp.json())
    //   .then(resp => console.log(resp))
    //   .catch(err => console.log(err))

    //   fetch('http://localhost:5000/elecresult',{
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //         'Origin':'http://localhost:3000',
    //         'Access-Control-Allow-Origin': 'http://localhost:3000',
    //       }
    //     }).then(resp => resp.json())
    //     .then(resp =>  setElecResult(resp))
    //     .catch(err => console.log(err)) 

    //     var result = document.getElementById("resultP")
    //       result.style.display = "block";

    //     fetch(`http://127.0.0.1:5000/sc2data/${statevalue}/${unitvalue}`,{
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //         'Origin':'http://localhost:3000',
    //         'Access-Control-Allow-Origin': 'http://localhost:3000',
    //       }
    //     }).then(resp => resp.json())
    //     .then(resp =>  setS2(resp))
    //     .catch(err => console.log(err))

    //     fetch(`http://127.0.0.1:5000/sc3data/${statevalue}/${unitvalue}`,{
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //         'Origin':'http://localhost:3000',
    //         'Access-Control-Allow-Origin': 'http://localhost:3000',
    //       }
    //     }).then(resp => resp.json())
    //     .then(resp =>  setS3(resp))
    //     .catch(err => console.log(err)) 

    // };

    function handleFuelSubmit() {
      fetch('http://localhost:5000/fueldata',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin':'http://localhost:3000',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
          body: JSON.stringify({
              country: countryvalue,
              fueltype: fueltypevalue,
              fuelsubtype: fuelsubtypevalue,
              unit: fuelunitvalue,
              fuel: fuelvalue

          }),
      }).then(resp => resp.json())
      .then(resp => console.log(resp))
      .catch(err => console.log(err)) 
      console.log(fuelvalue, fuelsubtypevalue, fueltypevalue, fuelunitvalue);

      fetch('http://localhost:5000/fuelresult',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin':'http://localhost:3000',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
          }
        }).then(resp => resp.json())
        .then(resp =>  setFuelResult(resp))
        .catch(err => console.log(err)) 

        var x = document.getElementById("resultP")
          x.style.display = "block";
    };

  return (
    <div className={classes.cal}>
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
            <Autocomplete
                className={classes.text}
                disablePortal
                id="country"
                options={countryName}
                sx={{ width: 300, mt: 2 }}
                renderInput={(params) => <TextField {...params} label="Country" />}
                onChange={(event) => {setCountryValue(event.target.textContent)}} 
                />
            </Grid>
            <Grid item xs={12} md={4}>
            <Autocomplete
                className={classes.text}
                disablePortal
                id="type"
                options={calType}
                sx={{ width: 300, mt: 2 }}
                renderInput={(params) => <TextField {...params} label="Type" />}
                onChange={(event) => {setTypeValue(event.target.textContent);
                  setFuelTypeValue("");
                  setWasteTypeValue("");
                  setWasteSubTypeValue("");
                  setFuelSubTypeValue("");
                  // setElecValue("");
                  // etFuelValue("");
                  setSolidWasteValue("");
                  setLiquidWasteValue("");
                  setGasWasteValue("");
                  setWasteValue("");
                  // setUnitValue("")
                }} 
                />
            </Grid>
            {
            typevalue === 'Electricity' ? 
                // <>
                // <Grid item xs={12} md={12} className={classes.text}>
                //   <p>According to the guidance of the <a href='https://www.dcceew.gov.au/sites/default/files/documents/national-greenhouse-accounts-factors-2022.pdf' target='_blank' rel="noreferrer"> Australian National Greenhouse Accounts Factors </a></p>
                //   <p>
                //   The following method is used for estimating scope 2 and scope 3 emissions released from electricity purchased through the electricity grid and consumed:
                //   </p>
                //   <img src={ElecEq} alt='calculation method' width='300px'/>
                //   <p>
                //     <strong>Where:</strong> <br />
                //     <strong>t CO2 -e</strong> is the emissions measured in CO 2 -e tonnes.<br />

                //     <strong>Q</strong> is the quantity of electricity purchased from the electricity grid during the year and consumed from the operation of the facility measured in kilowatt hours. <br />

                //     <strong>EF2</strong> is the scope 2 emission factor, in kilograms of CO2 -e emissions per kilowatt hour. <br />
                    
                //     <strong>EF3</strong> is the scope 3 emission factor, in kilograms of CO2-e emissions per kilowatt hour. <br />
                //   </p>
                // </Grid>
                // <Grid item xs={12} md={4}>
                // <Autocomplete
                //     className={classes.text}
                //     disablePortal
                //     id="state"
                //     options={state}
                //     sx={{ width: 300 , mt: 2}}
                //     renderInput={(params) => <TextField {...params} label="State, Territory or Grid " />}
                //     onChange={(event) => {setStateValue(event.target.textContent)}} 
                //     />
                // </Grid>
                // <Grid item xs={12} md={4}>
                // <FormControl>
                // <TextField
                //     className={classes.text}
                //     sx={{ width: 300, mt: 2 }}
                //     required
                //     id="outlined-required"
                //     label="Electricity"
                //     defaultValue='0'
                //     onChange={(event) => { setElecValue(event.target.value); } } />
                // </FormControl>
                // </Grid>
                // <Grid item xs={12} md={4}>
                // <FormControl>
                //     <FormLabel id="elecunit-radio-buttons-group" className={classes.text} >Unit</FormLabel>
                //     <RadioGroup
                //         className={classes.text}
                //         aria-labelledby="elecunit-radio-buttons-group"    
                //         name="elecunit-radio-buttons-group"
                //         onChange={(event) => setUnitValue(event.target.value)}
                //     >
                //         <FormControlLabel value="kWh" control={<Radio />} label="kWh" />
                //         <FormControlLabel value="GJ" control={<Radio />} label="GJ" />
                //     </RadioGroup>
                // </FormControl>
                // </Grid>

                // <Grid item xs={12} md={12}>
                //     <Button variant="contained"
                //         className={classes.text}
                //         type='submit'
                //         sx={{ width: 300 , background:'#7ECA58'}}
                //         onClick={ () => {
                //             handleElecSubmit();
                //           } }
                //         >
                //         Calculate
                //     </Button>
                //     <p 
                //     className={classes.text}
                //     id='resultP' 
                //     style={{display:'none'}}>
                //       "Total Greenhouse Gas Emissions from electricty (t CO2e): " {elecresult.result} <br />
                //        The scope 2 emission factor in {elecresult.state} is {s2} kg CO2-e/kWh <br />
                //        The scope 3 emission factor in {elecresult.state} is {s3} kg CO2-e/kWh <br />
                //     </p>
                // </Grid>
                // </>
                <Elecal countryvalue={countryvalue} typevalue={typevalue} />
                : typevalue ==='Waste' ? 
                <>
                </>
                // <>
                // <Grid item xs={12} md={4}>
                //   <Autocomplete
                //     className={classes.text}
                //     disablePortal
                //     id="type"
                //     options={wastetype}
                //     sx={{ width: 300, mt: 2 }}
                //     renderInput={(params) => <TextField {...params} label="Type of Waste" />}
                //     onChange={(event) => { setWasteTypeValue(event.target.textContent); } } />
                // </Grid>
                // {
                //   wastetypevalue==='Solid Waste' ?
                //   <>
                //     <Grid item xs={12} md={4}>
                //     <Autocomplete
                //     className={classes.text}
                //     disablePortal
                //     id="type"
                //     options={solidwastetype}
                //     sx={{ width: 300, mt: 2 }}
                //     renderInput={(params) => <TextField {...params} label="Type of Solid Waste" />}
                //     onChange={(event) => { setWasteSubTypeValue(event.target.textContent); } } />
                //     </Grid>
                //   </>
                //     : wastetypevalue==='Combined Waste' ?
                //     <>
                //       <Grid item xs={12} md={4}>
                //       <Autocomplete
                //       className={classes.text}
                //       disablePortal
                //       id="type"
                //       options={combinedwastetype}
                //       sx={{ width: 300, mt: 2 }}
                //       renderInput={(params) => <TextField {...params} label="Type of Combined Waste" />}
                //       onChange={(event) => { setWasteSubTypeValue(event.target.textContent); } } />
                //       </Grid>
                //     </>
                //     : null
                // }
                // <Grid item xs={12} md={6}>
                //     <TextField
                //       className={classes.text}
                //       sx={{ width: 300, mt: 2 }}
                //       required
                //       id="outlined-required"
                //       label="Amount of Waste"
                //       defaultValue="0"
                //       onChange={(event) => { setWasteValue(event.target.value); } } />
                // </Grid>
                // <Grid item xs={12} md={12}>
                //   <Button variant="contained"
                //     className={classes.text}
                //     type='submit'
                //     sx={{ width: 300, background: '#7ECA58' }}
                //     onClick={() => {
                //       handleElecSubmit();
                //     } }
                //   >
                //     Calculate
                //   </Button>
                //   <p
                //     className={classes.text}
                //     id='resultP'
                //     style={{ display: 'none' }}>
                //     "Total Greenhouse Gas Emissions from fuel (t CO2e): " {fuelresult.total}
                //   </p>
                //   {console.log(fuelresult)}
                // </Grid>
                // </>
                // : typevalue ==='Fuel' ?
                // <>
                // <Grid item xs={12} md={4}>
                // <FormControl>
                // <Autocomplete
                //     className={classes.text}
                //     disablePortal
                //     id="type of fuel"
                //     options={fueltype}
                //     sx={{ width: 300, mt: 2 }}
                //     renderInput={(params) => <TextField {...params} label="Tpye of Fuel" />}
                //     onChange={(event) => {setFuelTypeValue(event.target.textContent);setFuelSubTypeValue('')}} 
                //     />
                // </FormControl>
                // </Grid>
                // {
                //   fueltypevalue==='Solid Fuel' ?
                //   <>
                //   <Grid item xs={12} md={4}>
                //   <FormControl>
                //   <Autocomplete
                //     className={classes.text}
                //     disablePortal
                //     id="type of fuel"
                //     options={solidfueltype}
                //     sx={{ width: 300, mt: 2 }}
                //     renderInput={(params) => <TextField {...params} label="Tpye of Solid Fuel" />}
                //     onChange={(event) => {setFuelSubTypeValue(event.target.textContent)}} 
                //     />
                //   </FormControl>
                //   </Grid>
                //   <Grid item xs={12} md={4}>
                //     <FormControl>
                //       <FormLabel id="elecunit-radio-buttons-group" className={classes.text} >Unit</FormLabel>
                //       <RadioGroup
                //           className={classes.text}
                //           aria-labelledby="elecunit-radio-buttons-group"    
                //           name="elecunit-radio-buttons-group"
                //           onChange={(event) => setFuelUnitValue(event.target.value)}
                //       >
                //           <FormControlLabel value="t" control={<Radio />} label="t" />
                //       </RadioGroup>
                //     </FormControl>
                //   </Grid>
                //   </>
                //   : fueltypevalue==='Liquid Fuel' ?
                //   <>
                //   <Grid item xs={12} md={4}>

                //   <Autocomplete
                //     className={classes.text}
                //     disablePortal
                //     id="type of liquid fuel"
                //     options={liquidfueltype}
                //     sx={{ width: 300, mt: 2 }}
                //     renderInput={(params) => <TextField {...params} label="Tpye of Liquid Fuel" />}
                //     onChange={(event) => {setFuelSubTypeValue(event.target.textContent)}} 
                //     />

                //   </Grid>
                //   <Grid item xs={12} md={4}>
                //     <FormControl>
                //       <FormLabel id="elecunit-radio-buttons-group" className={classes.text} >Unit</FormLabel>
                //       <RadioGroup
                //           className={classes.text}
                //           aria-labelledby="elecunit-radio-buttons-group"    
                //           name="elecunit-radio-buttons-group"
                //           onChange={(event) => setFuelUnitValue(event.target.value)}
                //       >
                //           <FormControlLabel value="kL" control={<Radio />} label="kL" />
                //           <FormControlLabel value="m3" control={<Radio />} label="m3" />
                //       </RadioGroup>
                //     </FormControl>
                //   </Grid>
                //   </>
                //   : fueltypevalue==='Gaseous Fuel' ?
                //   <>
                //   <Grid item xs={12} md={4}>
                //     <FormControl>
                //     <Autocomplete
                //       className={classes.text}
                //       disablePortal
                //       id="type of gaseous fuel"
                //       options={gaseousfueltype}
                //       sx={{ width: 300, mt: 2 }}
                //       renderInput={(params) => <TextField {...params} label="Tpye of Gas Fuel" />}
                //       onChange={(event) => {setFuelSubTypeValue(event.target.textContent)}} 
                //       />
                //     </FormControl>
                //   </Grid>

                //   <Grid item xs={12} md={4}>
                //     <FormControl>
                //       <FormLabel id="elecunit-radio-buttons-group" className={classes.text} >Unit</FormLabel>
                //       <RadioGroup
                //           className={classes.text}
                //           aria-labelledby="elecunit-radio-buttons-group"    
                //           name="elecunit-radio-buttons-group"
                //           onChange={(event) => setFuelUnitValue(event.target.value)}
                //       >
                //           <FormControlLabel value="m3" control={<Radio />} label="m3" />
                //       </RadioGroup>
                //     </FormControl>
                //   </Grid>
                //   </>
                //   : null
                // }
                // <Grid item xs={12} md={6}>

                // <TextField
                //     className={classes.text}
                //     sx={{ width: 300, mt: 2 }}
                //     required
                //     id="outlined-required"
                //     label="Amount of Fuel"
                //     defaultValue="0"
                //     onChange={(event) => { setFuelValue(event.target.value); } } />

                // </Grid>
                // <Grid item xs={12} md={12}>
                //     <Button variant="contained"
                //         className={classes.text}
                //         type='submit'
                //         sx={{ width: 300 , background:'#7ECA58'}}
                //         onClick={ () => {
                //             handleFuelSubmit();
                //           } }
                //         >
                //         Calculate
                //     </Button>
                //     <p 
                //     className={classes.text}
                //     id='resultP' 
                //     style={{display:'none'}}>
                      
                //       "Total Greenhouse Gas Emissions from fuel (t CO2e): " {fuelresult.total} <br />
                //       "CO2 Emissions from fuel (t CO2e): " {fuelresult.CO2} <br />
                //       "CH4 Emissions from fuel (t CO2e): " {fuelresult.CH4} <br />
                //       "N2O Emissions from fuel (t CO2e): " {fuelresult.N2O} <br />
                //     </p>
                // </Grid>
                // </>
                // : typevalue ==='Transport' ? 
                // <>
                // <Grid item xs={12} md={4}>
                //   <Autocomplete
                //     className={classes.text}
                //     disablePortal
                //     id="type"
                //     options={wastetype}
                //     sx={{ width: 300, mt: 2 }}
                //     renderInput={(params) => <TextField {...params} label="Type of Transport" />}
                //     onChange={(event) => { setWasteTypeValue(event.target.textContent); } } />
                // </Grid>
                // <Grid item xs={12} md={4}>
                //   <Autocomplete
                //     className={classes.text}
                //     disablePortal
                //     id="type"
                //     options={wastetype}
                //     sx={{ width: 300, mt: 2 }}
                //     renderInput={(params) => <TextField {...params} label="Type of Fuel" />}
                //     onChange={(event) => { setWasteTypeValue(event.target.textContent); } } />
                // </Grid>
                // <Grid item xs={12} md={6}>

                // <TextField
                //     className={classes.text}
                //     sx={{ width: 300, mt: 2 }}
                //     required
                //     id="outlined-required"
                //     label="Amount of Fuel"
                //     defaultValue="0"
                //     onChange={(event) => { setFuelValue(event.target.value); } } />

                // </Grid>

                // <Grid item xs={12} md={4}>
                //     <FormControl>
                //       <FormLabel id="elecunit-radio-buttons-group" className={classes.text} >Unit</FormLabel>
                //       <RadioGroup
                //           className={classes.text}
                //           aria-labelledby="elecunit-radio-buttons-group"    
                //           name="elecunit-radio-buttons-group"
                //           onChange={(event) => setFuelUnitValue(event.target.value)}
                //       >
                //           <FormControlLabel value="kL" control={<Radio />} label="kL" />
                //           <FormControlLabel value="GJ" control={<Radio />} label="GJ" />
                //           <FormControlLabel value="m3" control={<Radio />} label="m3" />
                //       </RadioGroup>
                //     </FormControl>
                //   </Grid>         
                // </>
                : null
            } 
            
        </Grid>
    </div>

  )
}
