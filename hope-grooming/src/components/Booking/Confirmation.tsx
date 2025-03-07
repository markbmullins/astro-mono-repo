import React from "react";
import { Button } from "../Button";
import { Header } from "./Header";

interface ConfirmationProps {
  prevStep: () => void;
  bookingData: any;
}

const Confirmation: React.FC<ConfirmationProps> = ({
  prevStep,
  bookingData,
}) => {
  const handleConfirm = () => {
    // Save the appointment in localStorage
    const appointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );
    appointments.push(bookingData);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    // Display a confirmation message
    alert("Your appointment has been booked!");
    // Optionally, redirect to a confirmation page or reset the form
  };

  return (
    <>
      <Header>Confirm Your Booking</Header>
      <div className="mx-10 md:mx-20">
        <div className="border p-4 rounded">
          <p>
            <strong>Service:</strong> {bookingData.service}
          </p>
          <p>
            <strong>Date:</strong> {bookingData.date}
          </p>
          <p>
            <strong>Time:</strong> {bookingData.time}
          </p>
        </div>
        <div className="flex justify-between mt-4">
          <Button onClick={prevStep}>Back</Button>
          <Button onClick={handleConfirm}>Confirm Booking</Button>
        </div>
      </div>
    </>
  );
};

export default Confirmation;
