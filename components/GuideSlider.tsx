import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
  
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

import PlantCard from './PlantCard';
import { plantData } from '@/lib/data';

function GuideSlider() {
    return (
        <Carousel>
          <CarouselContent>
            {plantData.map((tree, index) => (
              <CarouselItem key={index}>
                <Card className="flex flex-col border-none shadow-none">
                  <div className="flex justify-center items-center w-9/12 m-auto mb-4">
                    
                    <PlantCard
                        key={index}
                        name={tree.name}
                        imageUrl={tree.image}
                        specifications={tree.specifications}
                    />
                  </div>
                </Card>
    
                
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='mr-7 cursor-pointer transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-125 duration-300'/>
          <CarouselNext className= 'ml-7 mx-auto cursor-pointer transition ease-in-out delay-150 hover:-translate-x-(-1) hover:scale-125 duration-300' />
        </Carousel>
      );
}

export default GuideSlider;