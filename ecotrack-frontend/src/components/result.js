import React, { useState, useEffect } from 'react';

export default function Results() {

const [data, setData] = useState({});
useEffect(() => {
  fetch('http://localhost:5000/data',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Origin':'http://localhost:3000',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    }
  }).then(resp => resp.json())
  .then(resp => setData(resp))
  .catch(err => console.log(err)) 
  
}, []);

  return (
    <div>
      <p>Your utilization of electricity has resulted in a emission of {data.result} kilograms of greenhouse gases.</p>
    </div>
  );
}
