import React from "react";

interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface ServiceCardProps {
  service: Service;
  interactive?: boolean; // Add a prop to control interactivity
  onClick?: (serviceId: number) => void; // Optional onClick handler
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  interactive = false,
  onClick,
}) => {
  const handleClick = () => {
    if (interactive && onClick) {
      onClick(service.id); // Call the onClick handler if interactive is true
    }
  };

  return (
    <li
      className={`flex flex-col justify-between p-4 rounded min-h-96 max-w-[22rem] mx-3 border-blue-400 border-2 px-6 hover:bg-blue-50 ${
        interactive ? "cursor-pointer" : ""
      }`}
      onClick={handleClick} // Attach the click handler if interactive
    >
      <a
        href={!interactive ? `/book?service=${service.id}&step=2` : ""}
        onClick={(e) => {
          if (interactive) {
            e.preventDefault();
          }
        }}
      >
        <div className="w-60 h-60 rounded-full overflow-hidden mx-auto mt-2 border-blue-400 border-4">
          <img
            className="object-cover w-full h-full"
            src={service.image}
            alt={service.name}
          />
        </div>
        <h4 className="text-xl font-recoleta mt-10">{service.name}</h4>
        <hr className="mr-32" />
        <p className="mt-2">{service.description}</p>
        <p className="font-bold mt-4 text-blue-400 mb-10">{service.price}</p>
      </a>
    </li>
  );
};
