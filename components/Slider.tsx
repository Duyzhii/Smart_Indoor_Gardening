import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

function Slider() {
  return (
    <Carousel>
  <CarouselContent>
    <CarouselItem>1</CarouselItem>
    <CarouselItem>2</CarouselItem>
    <CarouselItem>3</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
  )
}  

export default Slider
