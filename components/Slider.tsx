import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Sprout,
  Trees,
} from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';

const treeData = [
  {
    name: "Bok Choy",
    startDate: "2023-08-01",
    endDate: "2024-08-01",
    daysLeft: 180, // assuming today is 2024-01-01
    percentFinished: 50.00,
    status: "Sapling",
    imageUrl: "Image/bok_choi.jpg" // Add image URL here
  },
  {
    name: "Morning Glory",
    startDate: "2023-09-01",
    endDate: "2024-09-01",
    daysLeft: 150, // assuming today is 2024-01-01
    percentFinished: 60.00,
    status: "Sapling",
    imageUrl: "Image/morning_glory.jpg" // Add image URL here
  },
  {
    name: "White Carrot Sprout",
    startDate: "2023-10-01",
    endDate: "2024-10-01",
    daysLeft: 120, // assuming today is 2024-01-01
    percentFinished: 70.00,
    status: "Sapling",
    imageUrl: "Image/carrot.jpg" // Add image URL here
  },
  {
    name: "Tomato",
    startDate: "2023-11-01",
    endDate: "2024-11-01",
    daysLeft: 90, // assuming today is 2024-01-01
    percentFinished: 75.00,
    status: "Mature",
    imageUrl: "Image/tomato.jpg" // Add image URL here
  },
  {
    name: "Cucumber",
    startDate: "2023-12-01",
    endDate: "2024-12-01",
    daysLeft: 60, // assuming today is 2024-01-01
    percentFinished: 80.00,
    status: "Mature",
    imageUrl: "Image/cucumber.png" // Add image URL here
  },
  {
    name: "Zucchini",
    startDate: "2024-01-01",
    endDate: "2025-01-01",
    daysLeft: 365, // assuming today is 2024-01-01
    percentFinished: 10.00,
    status: "Seed",
    imageUrl: "Image/zucchini.jpg" // Add image URL here
  }
];


function Slider() {
  return (
    <Carousel>
      <CarouselContent>
        {treeData.map((tree, index) => (
          <CarouselItem key={index}>
            <Card className="flex flex-col rounded-2xl border-2 shadow-none">
              <CardHeader className="items-center">
                <CardTitle className="text-2xl font-bold">{tree.name}</CardTitle>
                <CardDescription>Start Date: {tree.startDate}</CardDescription>
              </CardHeader>

              <CardContent className="flex justify-center items-center w-9/12 mx-auto mb-4">
                <img 
                  src={tree.imageUrl} 
                  alt={tree.name} 
                  className="w-3/5 h-auto object-cover rounded-2xl"
                />
              </CardContent>

              <CardFooter className="flex-col items-center gap-2 text-sm w-11/12 mx-auto  ">
                <div className="flex items-center w-11/12">
                  <Sprout className="mr-7 h-10 w-10" />
                  <Progress value={tree.percentFinished} status={tree.status} /> 
                  <Trees className="ml-7 h-10 w-10" />
                </div>
                <div className="flex flex-col items-center ">
                  <div className="text-lg font-bold leading-none m-2">
                    {tree.daysLeft} days left
                  </div>
                  <div className="text-muted-foreground ">
                    End Date: {tree.endDate}
                  </div>
                </div>
              </CardFooter>
            </Card>

            
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='mr-7 cursor-pointer transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-125 duration-300'/>
      <CarouselNext className= 'ml-7 mx-auto cursor-pointer transition ease-in-out delay-150 hover:-translate-x-(-1) hover:scale-125 duration-300' />
    </Carousel>
  );
}

export default Slider;