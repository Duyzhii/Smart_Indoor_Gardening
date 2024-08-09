// components/PlantCard.tsx

import React from "react";
import { LucideIcon } from "lucide-react";
import SpecificationCard from "./SpecificationCard";

interface Specification {
  Icon: LucideIcon;
  title: string;
  value: string;
  color: string;
}

interface PlantCardProps {
  name: string;
  imageUrl: string;
  specifications: Specification[];
}

const PlantCard: React.FC<PlantCardProps> = ({ name, imageUrl, specifications }) => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="card lg:card-side bg-white shadow-2xl">
        <figure>
          <div className="w-80 h-96 overflow-hidden">
            <img
              src={imageUrl}
              alt="Album"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        </figure>
        <div className="card-body">
          <h1 className="card-title font-bold text-3xl">{name}</h1>
          <h3>Here are some specifications about the plant:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-6">
            {specifications.map((spec, index) => (
              <SpecificationCard
                key={index}
                Icon={spec.Icon}
                title={spec.title}
                value={spec.value}
                color={spec.color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
