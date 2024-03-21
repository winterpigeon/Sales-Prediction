import React from 'react'
import Navbarr from './navbarr'
import Sidebar from './sidebar'
import {Card, CardHeader, CardBody, CardFooter, Divider,Input,Button} from "@nextui-org/react";
import { useState } from 'react';
import axios from 'axios';
function Predict(){
   const [formData, setFormData] = useState({
    Item_Identifier: '',
    Item_Weight: '',
    Item_Fat_Content: '',
    Item_Visibility: '',
    Item_Type: '',
    Item_MRP: '',
    Outlet_Identifier: '',
    Outlet_Establishment_Year: '',
    Outlet_Size: '',
    Outlet_Location_Type: '',
    Outlet_Type: '',
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
          name="Item_Identifier"
          label="Item Identifier"
          placeholder="FDA15"
          labelPlacement="outside"
          value={formData.Item_Identifier}
          onChange={handleChange}
        />
        <Input
          type="number"
          label="Item_Weight"
          name="Item_Weight"
          placeholder="9.3"
          labelPlacement="outside"
          value={formData.Item_Weight}
          onChange={handleChange}

        />
        <Input
          type="text"
          name="Item_Fat_Content"
          label="Item_Fat_Content"
          placeholder="Low Fat"
          labelPlacement="outside"
          value={formData.Item_Fat_Content}
          onChange={handleChange}
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="number"
          name="Item_Visibility"
          label="Item_Visibility"
          placeholder="0.016047301"
          labelPlacement="outside"
          value={formData.Item_Visibility}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="Item_Type"
          label="Item_Type"
          placeholder="Dairy"
          labelPlacement="outside"
          value={formData.Item_Type}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="Item_MRP"
          label="Item_MRP"
          placeholder="249.8092"
          labelPlacement="outside"
          value={formData.Item_Price}
          onChange={handleChange}
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="text"
          name="Outlet_Identifier"
          label="Outlet_Identifier"
          placeholder="OUT049"
          labelPlacement="outside"
          value={formData.Outlet_Identifier}
          onChange={handleChange}
         
        />
        <Input
          label="Outlet_Establishment_Year"
          name="Outlet_Establishment_Year"
          type="number"
          placeholder="1999"
          labelPlacement="outside"
          value={formData.Outlet_Establishment_Year}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="Outlet_Size"
          label="Outlet_Size"
          placeholder="Medium"
          labelPlacement="outside"
          value={formData.Outlet_Size}
          onChange={handleChange}

        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          type="text"
          name="Outlet_Location_Type"
          label="Outlet_Location_Type"
          placeholder="Tier 1"
          labelPlacement="outside"
          value={formData.Outlet_Location_Type}
          onChange={handleChange}
        />
        <Input
          label="Outlet_Type"
          name="Outlet_Type"
          type="text"
          placeholder="Supermarket Type1"
          labelPlacement="outside"
          value={formData.Outlet_Type}
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
                  onChange={handleChange}
                 
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