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
    name: "Apple Tree",
    startDate: "2023-03-01",
    endDate: "2024-03-01",
    daysLeft: 60, // assuming today is 2024-01-01
    percentFinished: 83.33,
    status: "Mature",
    imageUrl: "/Image/apple_tree.jpg" // Add image URL here
  },
  {
    name: "Orange Tree",
    startDate: "2023-05-15",
    endDate: "2024-05-15",
    daysLeft: 134, // assuming today is 2024-01-01
    percentFinished: 63.33,
    status: "Sapling",
    imageUrl: "https://example.com/orange-tree.jpg" // Add image URL here
  },
  {
    name: "Lemon Tree",
    startDate: "2023-02-01",
    endDate: "2024-02-01",
    daysLeft: 31, // assuming today is 2024-01-01
    percentFinished: 91.67,
    status: "Mature",
    imageUrl: "https://example.com/lemon-tree.jpg" // Add image URL here
  },
  {
    name: "Cherry Tree",
    startDate: "2023-04-01",
    endDate: "2024-04-01",
    daysLeft: 91, // assuming today is 2024-01-01
    percentFinished: 75.00,
    status: "Mature",
    imageUrl: "https://example.com/cherry-tree.jpg" // Add image URL here
  },
  {
    name: "Peach Tree",
    startDate: "2023-01-01",
    endDate: "2024-01-01",
    daysLeft: 0, // assuming today is 2024-01-01
    percentFinished: 100.00,
    status: "Harvest",
    imageUrl: "https://example.com/peach-tree.jpg" // Add image URL here
  },
  {
    name: "Avocado Tree",
    startDate: "2023-07-01",
    endDate: "2024-07-01",
    daysLeft: 182, // assuming today is 2024-01-01
    percentFinished: 50.00,
    status: "Sapling",
    imageUrl: "https://example.com/avocado-tree.jpg" // Add image URL here
  }
];

function Slider() {
  return (
    <Carousel>
      <CarouselContent>
        {treeData.map((tree, index) => (
          <CarouselItem key={index}>
            <Card className="flex flex-col">
              <CardHeader className="items-center">
                <CardTitle className="text-2xl font-bold">{tree.name}</CardTitle>
                <CardDescription>Start Date: {tree.startDate}</CardDescription>
              </CardHeader>

              <CardContent className="flex justify-center items-center">
                <img 
                  src={tree.imageUrl} 
                  alt={tree.name} 
                  className="w-1/3 h-auto object-cover rounded-2xl"
                />
              </CardContent>

              <CardFooter className="flex-col items-center gap-2 text-sm w-2/3 mx-auto ">
                <div className="flex items-center w-2/3">
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
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default Slider;