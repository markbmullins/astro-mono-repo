import React from "react";
import { ServiceCard } from "./ServiceCard";

interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface ServicesProps {
  services: Service[];
  interactive?: boolean; // Add a prop to control interactivity
  onClick?: (serviceId: number) => void; // Optional onClick handler
}

export const Services: React.FC<ServicesProps> = ({
  services,
  interactive = false,
  onClick,
}) => {
  return (
    <div className="flex items-center justify-center">
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            interactive={interactive} // Pass the interactive prop
            onClick={onClick} // Pass the onClick handler
          />
        ))}
      </ul>
    </div>
  );
};
