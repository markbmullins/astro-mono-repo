import React from "react";
import { services } from "../../data/services";
import { Services } from "../Services/Services.tsx";
import { Header } from "./Header.tsx";

interface ServiceSelectorProps {
  nextStep: () => void;
  bookingData: any;
  updateBookingData: (data: any) => void;
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  nextStep,
  bookingData,
  updateBookingData,
}) => {
  const handleServiceSelect = (serviceId: number) => {
    const selectedService = services.find(
      (service) => service.id === serviceId
    );
    updateBookingData({ service: selectedService?.name });
    nextStep();
  };

  return (
    <>
      <Header>Book an Appointment</Header>
      <div className="my-12">
        <Services
          services={services}
          interactive={true}
          onClick={handleServiceSelect}
        />
      </div>
    </>
  );
};

export default ServiceSelector;
