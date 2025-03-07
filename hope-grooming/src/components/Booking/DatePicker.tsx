import React, { useState, useEffect } from "react";
import { Button } from "../Button";
import type { BookingData } from "./BookingForm";
import { Header } from "./Header";

interface DatePickerProps {
  nextStep: () => void;
  prevStep: (field?: keyof BookingData) => void;
  bookingData: any;
  updateBookingData: (data: any) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  nextStep,
  prevStep,
  bookingData,
  updateBookingData,
}) => {
  const [selectedDate, setSelectedDate] = useState("");

  // Generate the next 14 days for selection
  const getNext14Days = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = getNext14Days();

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    updateBookingData({ date });
    nextStep();
  };

  return (
    <>
      <Header>Book an Appointment</Header>
      <div className="mx-10 md:mx-20">
        <h3 className="text-2xl font-semibold mb-4 text-center">
          Select a Date
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {dates.map((date) => (
            <button
              key={date.toDateString()}
              onClick={() => handleDateSelect(date.toDateString())}
              className={`border p-4 rounded ${bookingData.date === date.toDateString() ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
            >
              {date.toDateString()}
            </button>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <Button onClick={() => prevStep()}>Back</Button>
        </div>
      </div>
    </>
  );
};

export default DatePicker;
