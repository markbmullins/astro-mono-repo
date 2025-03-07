import React, { useState } from "react";
import "./booking-form.css";
import { getFormattedDate } from "@utils/formatDate";

import type { TourSchedule } from "@content/accessors";
import { calculateTourPrice } from "@utils/calculateTourPrice";

interface BookingFormProps {
  tourSchedule: TourSchedule;
  onBack: () => void;
  onSubmit: (bookingData: any) => void;
  bookingStatus: "idle" | "success" | "error";
}

export default function BookingForm({
  tourSchedule,
  onBack,
  onSubmit,
  bookingStatus,
}: BookingFormProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scheduleDate = getFormattedDate(tourSchedule.scheduleDate);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Prepare booking data
    const bookingData = {
      tour_id: tourSchedule.tourId,
      schedule_date: scheduleDate, // Assuming it's in 'YYYY-MM-DD' format
      start_time: tourSchedule.startTime,
      customer_name: customerName,
      customer_email: customerEmail,
      number_of_guests: numberOfGuests,
      status: "pending", // Initial status
    };

    onSubmit(bookingData);
  }

  const { totalPrice, totalDiscount } = calculateTourPrice(
    numberOfGuests,
    tourSchedule.price
  );

  console.log({ totalDiscount, totalPrice });
  return (
    <div className="booking-form-container">
      <button className="back-button" onClick={onBack}>
        &laquo; Back
      </button>
      <h3>Book {tourSchedule.tourTitle}</h3>
      <p>
        <span>
          <strong>Date:</strong> {scheduleDate}
        </span>
        <span>
          <strong>Time:</strong> {tourSchedule.startTime}
        </span>
      </p>
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label htmlFor="customerName">Name:</label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            placeholder="Your Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="customerEmail">Email:</label>
          <input
            type="email"
            id="customerEmail"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="numberOfGuests">Number of Guests:</label>
          <input
            type="number"
            id="numberOfGuests"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(Number(e.target.value))}
            max={tourSchedule.capacity}
            min="1"
            required
          />
        </div>
        <div className="subtotal">
          <strong>Subtotal:</strong>&nbsp;${totalPrice}
        </div>
        <div className="discount">
          <strong>Discount:</strong>&nbsp;${totalDiscount}
        </div>

        {error && <div className="error-message">{error}</div>}
        {bookingStatus !== "success" && (
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        )}
      </form>
    </div>
  );
}
