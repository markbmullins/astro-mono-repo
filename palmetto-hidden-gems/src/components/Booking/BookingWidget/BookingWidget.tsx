import React, { useState } from "react";
import Calendar from "@components/Calendar/Calendar.tsx";
import type { Tours, TourSchedule } from "@content/accessors";
import "./booking-widget.css";
import { createBooking } from "@requests/create-booking";
import BookingForm from "@components/Booking/BookingForm/BookingForm";
import { Modal } from "@components/Modal/Modal";

export default function BookingWidget({ tours }: { tours: Tours }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [currentView, setCurrentView] = useState<"calendar" | "form">(
    "calendar"
  );
  const [selectedSchedule, setSelectedSchedule] = useState<TourSchedule | null>(
    null
  );
  const [bookingStatus, setBookingStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [bookingMessage, setBookingMessage] = useState<string>("");

  // Handle schedule selection from Calendar
  function handleSelectSchedule(schedule: any) {
    setSelectedSchedule(schedule);
    setCurrentView("form");
  }

  // Handle booking form submission
  async function handleBookingSubmit(bookingData: any) {
    try {
      const response = await createBooking(bookingData);
      setBookingStatus("success");
      setBookingMessage("Booking created successfully!");
      // Optionally reset form or keep as is
    } catch (error: any) {
      console.error("Error creating booking:", error);
      setBookingStatus("error");
      setBookingMessage(error.message || "Failed to create booking.");
    }
  }

  // Handle back navigation from BookingForm to Calendar
  function handleBackToCalendar() {
    setCurrentView("calendar");
    setSelectedSchedule(null);
    setBookingStatus("idle");
    setBookingMessage("");
  }

  return (
    <>
      <button className="booking-button" onClick={openModal}>
        Book Now
      </button>

      <Modal
        header="Palmetto Hidden Gems Tours: Available Dates"
        onClose={closeModal}
        isOpen={isModalOpen}
      >
        {currentView === "calendar" && (
          <Calendar tours={tours} onSelectTour={handleSelectSchedule} />
        )}

        {currentView === "form" && selectedSchedule && (
          <BookingForm
            tourSchedule={selectedSchedule}
            onBack={handleBackToCalendar}
            onSubmit={handleBookingSubmit}
            bookingStatus={bookingStatus}
          />
        )}

        {/* Display booking status messages */}
        {bookingStatus === "success" && (
          <div className="booking-message success">
            <p>{bookingMessage}</p>
            <button
              onClick={handleBackToCalendar}
              className="book-another-button"
            >
              Book Another Tour
            </button>
          </div>
        )}

        {bookingStatus === "error" && (
          <div className="booking-message error">{bookingMessage}</div>
        )}
      </Modal>
    </>
  );
}
