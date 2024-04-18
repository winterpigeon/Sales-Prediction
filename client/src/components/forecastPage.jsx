import React from 'react'
import Navbarr from './navbarr'
import Sidebar from './sidebar'
import PastSalesChart from './pastSalesChart';
import {Card, CardHeader, CardBody, CardFooter, Divider, Button} from "@nextui-org/react";
import { Sparkles } from 'lucide-react';
function ForecastPage(){
    
  return (<>
    <Navbarr/>
    <div className='w-full h-full flex flex-row flex-wrap justify-center items-center bg-gradient-to-t from-sky-700 to-blue-500 '>
    
    <Sidebar/>

        <div className='w-4/5 min-h-[90%] flex flex-col justify-center items-center'>
            <Card className="w-[90%] h-[600px] flex flex-col mt-10 mb-10 ">
            <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                <p className="text-md">View Your Current Sales</p>
                </div>
            </CardHeader>
            <Divider/>
            <CardBody>
                <PastSalesChart/>
            </CardBody>
            <Divider/>
            <CardFooter>
                
            </CardFooter>
            </Card> 
            <Button startContent={<Sparkles />} endContent={<Sparkles />} className='h-[60px] w-[200px] bg-gradient-to-tr from-pink-500 to-yellow-500 text-white text-xl'>
        Forecast
      </Button>  
            <Card className="w-2/3 h-[400px] flex flex-col mt-10">
            <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                <p className="text-md">View Your Future Sales</p>
                </div>
            </CardHeader>
            <Divider/>
            <CardBody>
                
            </CardBody>
            <Divider/>
            <CardFooter>
                
            </CardFooter>
            </Card> 
            
        </div>
     
    </div>

    </>

  )
}

export default ForecastPage