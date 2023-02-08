import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Results() {

const [data, setData] = useState({});
useEffect(() => {
  axios.get('http://localhost:5000/data')
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      console.error(error);
    });
}, []);
    const result = JSON.parse(JSON.stringify(data)).elec

  return (
    <div>
      <p>Your utilization of electricity has resulted in a emission of {result} kilograms of greenhouse gases.</p>
    </div>
  );
}
