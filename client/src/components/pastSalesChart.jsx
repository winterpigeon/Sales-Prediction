import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';
const PastSalesChart = () => {
  const [Data, setData] = useState(null);
  
  useEffect(() => {
    // Make an HTTP GET request to the server to fetch the JSON data
    axios.get('/forecast')
      .then(response => {
        // Extract the JSON data from the response
        const jsonString = response.data;
        // Parse JSON string into JavaScript object
        const parsedData = JSON.parse(jsonString);
        // Extract the sales data from the parsed object
        const salesData = parsedData.y;
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
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
        <LineChart width={300} height={100} data={Data}>
            <YAxis dataKey="Sales"/>
            <XAxis dataKey="Date"/>
            <CartesianGrid strokeDasharray="5 5"/>
            <Tooltip/>
            <Legend/>
          <Line type="monotone" dataKey="Sales" stroke="#006FEE" strokeWidth={2} dot="" />
        </LineChart>
      </ResponsiveContainer>
  )
}
export default PastSalesChart