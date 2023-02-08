import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Electricity from '../pages/Electricity';
import Waste from '../pages/Waste';
import Header from '../components/header';
import Footer from '../components/footer';
import { makeStyles } from '@mui/styles';



const useStyles = makeStyles({
  appMain:{
    backgroundColor: '#F1F2ED',
  }
});

function App() {

  const classes = useStyles();

  return (
    <div className={classes.appMain}>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/electricity" element={<Electricity />} /> 
            <Route path="/waste" element={<Waste />} />
          </Routes>
          <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
