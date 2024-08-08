import React from "react";
import PlantCard from "@/components/PlantCard";
import plantData from "@/lib/data";

const Home: React.FC = () => {
  const plants = plantData.map((plant, index) => (
    <div className="carousel-item w-full" id={index.toString()} key={index}>
      <PlantCard
        key={index}
        name={plant.name}
        imageUrl={plant.image}
        specifications={plant.specifications}
      />
    </div>
  ));

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="carousel w-full">
        {plants}
      </div>
      <div className="flex w-full justify-center gap-2 py-2">
        {plantData.map((_, index) => (
          <a 
            href={`#${index.toString()}`} 
            key={index}
            className="btn btn-xs"
          >
            {index + 1}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Home;