import React from 'react';
import ISLogo from "../img/infosyslogo.png";
import { makeStyles } from '@mui/styles';
import { Link, Box, Typography } from '@mui/material';



const footerStyle = makeStyles({
    footer: {
        bottom: '0px',
        margin: 'auto',
        textAlign: 'center',
        backgroundColor: '#F1F2ED',
        position: 'fixed',
        width: '100%',
    },

    copyright: {
        position: 'fixed',
        bottom: '0px',
        textAlign: 'center',
        width: '100%',
        

    },
    logo:{
      width: '100px',
    }
})

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://infosys.com/">
          Infosys EcoTrak Project
        </Link>{' '}
        {2023}
        {'.'}
      </Typography>
    );
  }

export default function Footer() {
    const classes = footerStyle();
  return (
    <>
    <Typography variant="body2" align="center" className={classes.footer}>
      <img src={ISLogo} alt='infoysyslogo' className={classes.logo}/>
      <Copyright className={classes.copyright} sx={{ mt: 5 }}/>
    </Typography>
    
    </>
  )
}



