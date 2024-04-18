import React from 'react'
import Navbarr from './navbarr'
import Sidebar from './sidebar'
import {Card, CardHeader, CardBody, CardFooter, Divider,Input,Button} from "@nextui-org/react";
import { useState } from 'react';
import axios from 'axios';
function Predict(){
   const [formData, setFormData] = useState({
    Retailer: '',
    Region: '',
    State: '',
    City: '',
    Product: '',
    Price_per_unit: '',
    Unit_Sold: '',
    Operating_Profit: '',
    Operating_Margin: '',
    Sales_Method: '', 
  });
const [predictedSales, setPredictedSales] = useState('');
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send formData to the backend
    console.log('Form Data:', formData);
    axios.post('/predict', formData)
      .then(response => {
        // Handle response from the backend
        setPredictedSales(response.data.predictions);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (<>
    <Navbarr/>
    <div className='w-full h-full flex flex-row flex-wrap justify-center items-center bg-gradient-to-t from-sky-700 to-blue-500'>

    
    <div className='w-1/5 sticky left-0 top-[4rem]'>
    <Sidebar/>
    </div>
    <div className='w-4/5 h-[95vh] flex justify-center items-center'>
      
      <Card isFooterBlurred className="w-2/3 h-3/4 flex flex-col overflow-scroll">
        <form onSubmit={handleSubmit}>
      <CardHeader className='items-center justify-center flex flex-col'>
       <p>Please Enter Details to Predict Sales</p>
      </CardHeader>
      <Divider/>
      <CardBody>
         <div className="flex flex-col gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="text"
          name="Retailer"
          label="Retailer"
          placeholder="Walmart"
          labelPlacement="outside"
          value={formData.Retailer}
          onChange={handleChange}
        />
        <Input
          type="text"
          label="Region"
          name="Region"
          placeholder="Northeast"
          labelPlacement="outside"
          value={formData.Region}
          onChange={handleChange}

        />
        <Input
          type="text"
          name="State"
          label="State"
          placeholder="New York"
          labelPlacement="outside"
          value={formData.State}
          onChange={handleChange}
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="Text"
          name="City"
          label="City"
          placeholder="New York"
          labelPlacement="outside"
          value={formData.City}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="Product"
          label="Product"
          placeholder="Men's Apparel"
          labelPlacement="outside"
          value={formData.Product}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="Price per Unit"
          label="Price per Unit"
          placeholder="60.00"
          labelPlacement="outside"
          value={formData.Price_per_Unit}
          onChange={handleChange}
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
      <Input
          type="number"
          name="Unit_Sold"
          label="Unit Sold"
          placeholder="900.00"
          labelPlacement="outside"
          value={formData.Unit_Sold}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="Operating_Profit"
          label="Operating Profit"
          placeholder="162000"
          labelPlacement="outside"
          value={formData.Operating_Profit}
          onChange={handleChange}
        />
        <Input
          type="number"          
          name="Operating_Margin"
          label="Operating Margin"
          placeholder="0.3"
          labelPlacement="outside"
          value={formData.Operating_Margin}
          onChange={handleChange}
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
      <Input
          type="text"
          name="Sales_Method"
          label="Sales Method"
          placeholder="Outlet"
          labelPlacement="outside"
          value={formData.Sales_Method}
          onChange={handleChange}
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
              type="number"
              name="Predicted_Sales" // Name matches the state property
              label="Predicted Sales"
              placeholder="Predicted Sales"
              labelPlacement="outside"
              value={predictedSales} // Value set to the Predicted Sales state
              readOnly
        />
      </div>
    </div>  
      </CardBody>
      <Divider/>
      <CardFooter >
        <Button className="" variant="shadow" radius="lg" size="lg" color="primary" type='submit'>
          Predict
        </Button>
      </CardFooter>
      </form>
    </Card>

    </div>
  </div>
  </>
  )
}

export default Predict