import React from 'react';
import './App.css';
import { makeStyles } from '@mui/styles';
import Header from '../components/header';
import Footer from '../components/footer';
import CalInfo from '../components/calinfo';

const useStyles = makeStyles({
  appMain:{
    width: '100%',
    backgroundColor: '#F1F2ED',
    opacity: '1',
  }
});

function App() {
   const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.appMain}>
        <Header />
        <CalInfo />
        <Footer />
      </div>
     
      
      </React.Fragment>
   
  );
}

export default App;
