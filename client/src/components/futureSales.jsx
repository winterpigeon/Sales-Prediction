import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
const FutureSales = (props) => {
  const {showFutureSales} = props;
  const [data, setData] = useState(null);

   useEffect(() => {
    if(showFutureSales){
    // Make an HTTP GET request to the server to fetch the JSON data
    axios.get('/forecast')
      .then(response => {
        // Extract the JSON data from the response
        const jsonString = response.data;
        // Parse JSON string into JavaScript object
        const parsedData = JSON.parse(jsonString);
        // Extract the sales data from the parsed object
        const salesData = parsedData.Predictions;
        // Convert the sales data object into an array of objects with the desired structure
        const formattedData = Object.entries(salesData).map(([date, sales]) => ({
          Date: new Date(parseInt(date)).toLocaleDateString(),
          Sales: sales
        }));
        // Set the formatted data to state
        setData(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      }
  }, [showFutureSales]);
  

  return (
    <ResponsiveContainer width="100%" height="100%">
      {data ? (
        <LineChart width={600} height={300} data={data}>
          <YAxis dataKey="Sales" />
          <XAxis dataKey="Date" />
          <CartesianGrid strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Sales" stroke="#FFA500" strokeWidth={2} dot="" />
        </LineChart>
      ) : (
        <p>{showFutureSales ? 'Loading...' : 'Click the Forecast button to view future sales.'}</p>
      )}
    </ResponsiveContainer>
  );
};

export default FutureSales;
