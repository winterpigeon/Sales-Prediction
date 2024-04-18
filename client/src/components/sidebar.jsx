
import React from 'react';
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
function Sidebar(){
    return(
    <Card className=" w-1/5 h-[95vh] sticky left-0 top-0">
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
    );
}
export default Sidebar;