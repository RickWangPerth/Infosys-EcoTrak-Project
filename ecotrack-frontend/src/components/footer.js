import React from 'react';
import ISLogo from "../img/infosyslogo.png";
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


const footerStyle = makeStyles({
    footer: {
        display: 'absolute',
        position: 'fixed',
        bottom: '0px',
        left: '0px',
        margin: 'auto',
        textAlign: 'center',
        backgroundColor: '#F1F2ED',
    },

    copyright: {
        position: 'fixed',
        bottom: '0px',
        textAlign: 'center',
        width: '100%',

    },
    logodiv:{
        position: 'fixed',
        bottom: '5px',
        textAlign: 'center',
        width: '100%',

    },
    logo:{
        position: 'sticky',
        width: '100px',
        margin:'auto',
    }
})

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://infosys.com/">
          Infosys Eco Track Project
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
        <div className={classes.footer}>
            <div className={classes.logodiv}>   
                    <img src={ISLogo} alt='infoysyslogo' className={classes.logo}/>
            </div>
            <div>
                <Copyright className={classes.copyright} sx={{ mt: 5 }}/>
            </div>
            
        </div>
    </>
  )
}



