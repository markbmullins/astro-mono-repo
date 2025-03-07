import React, { useState, useEffect } from "react";
import { Button } from "../Button";
import type { BookingData } from "./BookingForm";
import { Header } from "./Header";

interface TimePickerProps {
  nextStep: () => void;
  prevStep: (field?: keyof BookingData) => void;
  bookingData: any;
  updateBookingData: (data: any) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
  nextStep,
  prevStep,
  bookingData,
  updateBookingData,
}) => {
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState("");

  // Simulate fetching available times for the selected date
  useEffect(() => {
    const allTimes = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"];

    // Get existing appointments from localStorage
    const appointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );

    // Filter out times that have already been booked on the selected date
    const bookedTimes = appointments
      .filter((appt: any) => appt.date === bookingData.date)
      .map((appt: any) => appt.time);

    const available = allTimes.filter((time) => !bookedTimes.includes(time));
    setAvailableTimes(available);
  }, [bookingData.date]);

  // **Define handleTimeSelect Function**
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    updateBookingData({ time });
    nextStep();
  };

  return (
    <>
      <Header>Book an Appointment</Header>
      <div className="mx-10 md:mx-20">
        <h3 className="text-2xl font-semibold mb-4 text-center">
          Select a Time
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {availableTimes.map((time) => (
            <button
              key={time}
              onClick={() => handleTimeSelect(time)}
              className={`border p-4 rounded ${
                bookingData.time === time
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {time}
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

export default TimePicker;
