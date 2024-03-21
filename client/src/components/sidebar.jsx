
import React from 'react';
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
function Sidebar(){
    return(
        <div className='h-full' >
    <Card className="max-w-[400px] h-[90vh]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">Dashboard</p>
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
    );
}
export default Sidebar;