
import React from 'react';
import {Card, CardHeader, CardBody, CardFooter, Divider, Button} from "@nextui-org/react";
import { Link } from 'react-router-dom';
import { WandSparkles } from 'lucide-react';
import { Sparkle } from 'lucide-react';
import { Home } from 'lucide-react';
function Sidebar(){
    return(
      <div className='h-screen w-full  '>
    <Card className=" w-full h-[95vh]  ">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col ">
          <p className="text-md ">Dashboard</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <div className=' w-full flex flex-col justify-center items-center space-y-10 pt-10 '>
          <Link to="/upload"><Button className='w-[15vw] h-[50px]' startContent={<Sparkle/>}>Upload Data</Button></Link>
          <Link to="/"><Button  className='w-[15vw] h-[50px]' startContent={<Home/>} >Home</Button></Link>
          <Link to="/xgb"><Button className='w-[15vw] h-[50px]' startContent={<WandSparkles/>} >Predict</Button></Link>
          <Link to="/lstm"><Button className='w-[15vw] h-[50px]' startContent={<Sparkle/>}>Forecast</Button></Link>
          
          </div>
      </CardBody>
      <Divider/>
      <CardFooter>
      </CardFooter>
    </Card>
    </div>
    );
}
export default Sidebar;