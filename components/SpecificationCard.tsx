// components/SpecificationCard.tsx
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SpecificationCardProps {
  Icon: LucideIcon;
  title: string;
  value: string;
  color: string; // This should be a valid CSS color value like '#FF0000' or 'rgb(255, 0, 0)'
}

const SpecificationCard: React.FC<SpecificationCardProps> = ({ Icon, title, value, color }) => {
  return (
    <div className="card bg-base-100 shadow-xl pl-4 pr-4 py-1 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center">
        <div className="text-4xl mr-4" style={{ color }}>
          <Icon />
        </div>
        <div>
          <h2 className="card-title text-base font-semibold" style={{ color }}>{title}</h2>
          <p className="text-sm text-gray-700">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default SpecificationCard;