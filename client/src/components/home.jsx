import React from 'react'
import Sidebar from './sidebar'
import Navbarr from './navbarr'
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";
const Home = () => {
  return (<>
    <Navbarr/>
    <div className='w-full h-full flex flex-row flex-wrap bg-gradient-to-t from-sky-700 to-blue-500 '>
        <div className='w-1/5 h-full sticky top-0'><Sidebar /></div>
    <div className='w-4/5 h-full flex flex-col flex-wrap justify-center items-center '>
        <h1 className='text-5xl text-black font-bold mt-8 m-2'>ForecastMaster</h1>
        <h1 className='text-3xl text-black mb-10'>Streamlined Sales Prediction Website</h1>
        <div className='w-full h-full flex flex-row flex-wrap justify-center items-center space-x-10 space-y-10'>
      <Card className="py-4 w-1/3 h-1/2">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-md uppercase font-bold">Get Incredible Predictions </p>
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="/assets/sales.png"
          width={500}
        />
        <h4 className="font-bold text-large">Using Our Regression Model</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        
      </CardBody>
    </Card>
    <Card className="py-4 w-1/3 h-1/2">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-md uppercase font-bold">Forecast Future Sales</p>
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="/assets/graph.png"
          width={500}
        />
        <h4 className="font-bold text-large">With Our LSTM model</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        
      </CardBody>
    </Card>
    </div>
    </div>
    </div>
    </>
  )
}

export default Home