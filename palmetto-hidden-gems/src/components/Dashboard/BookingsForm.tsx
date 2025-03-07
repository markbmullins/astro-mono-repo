import React, {
  useState,
  useEffect,
  type FormEventHandler,
  type ChangeEventHandler,
} from "react";
import styles from "./bookings-form.module.css";
import type { Booking } from "@requests/types";
import type { Tour } from "@content/accessors";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  // Adjust for timezone differences if necessary
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
};

interface BookingsFormProps {
  tours: any;
  booking: Booking;
  onSubmit: (data: Booking) => void;
  onCancel: () => void;
  isUpdate?: boolean;
}

export const BookingsForm = ({
  tours,
  booking = {} as Booking,
  onSubmit,
  onCancel,
  isUpdate = false,
}: BookingsFormProps) => {
  // TODO: Handle case when tour is not found for booking
  const tour = tours.find((t: any) => t.tourId === booking.tourId);

  let startTime;
  if (booking?.startTime) {
    const [hour, minute, second = 0] =
      booking.startTime?.split("+")[0].split(":") || [];
    startTime = `${hour}:${minute}`;
  } else {
    startTime = "";
  }

  const [formData, setFormData] = useState<Partial<Booking>>({
    tourId: isUpdate ? booking.tourId : "",
    scheduleDate: booking.scheduleDate,
    startTime,
    customerName: booking.customerName || "",
    customerEmail: booking.customerEmail || "",
    numberOfGuests: booking.numberOfGuests || 1,
    status: booking.status || "",
  });

  const [selectedTour, setSelectedTour] = useState<string>(tour?.title || "");

  const [originalData, setOriginalData] = useState(formData);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    setOriginalData(formData);
  }, [booking]);

  useEffect(() => {
    setIsModified(JSON.stringify(formData) !== JSON.stringify(originalData));
  }, [formData, originalData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log("handle change", name, value);
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "length" || name === "maxCapacity"
          ? Number(value)
          : value,
    });
  };

  const handleTourChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selectedTitle = e.target.value;
    const selectedTourObj = tours.find((t: any) => t.title === selectedTitle);
    if (selectedTourObj) {
      setSelectedTour(selectedTourObj.title);
      setFormData({
        ...formData,
        tourId: selectedTourObj.tourId,
        scheduleDate: "",
        startTime: "",
      });
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(formData as Booking);
  };

  const modifiedFields = Object.keys(formData).filter(
    (key) =>
      formData[key as keyof Booking] !== originalData[key as keyof Booking]
  );

  const availableSchedules = isUpdate
    ? tour?.schedules || []
    : tours.find((t: Tour) => t.tourId === formData.tourId)?.schedules || [];

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label>Tour Title</label>
        <select
          name="tourTitle"
          value={selectedTour}
          onChange={handleTourChange}
          required
        >
          <option value={""}>Select a tour</option>
          {tours.map((tour: any) => (
            <option key={tour.tourId} value={tour.title}>
              {tour.title}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.formGroup}>
        <label>Tour ID</label>
        <div>
          {selectedTour
            ? tours.find((t: any) => t.title === selectedTour)?.tourId
            : tour?.tourId}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Customer Name</label>
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Customer Email</label>
        <input
          type="email"
          name="customerEmail"
          value={formData.customerEmail}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Number of Guests</label>
        <input
          type="number"
          name="numberOfGuests"
          value={formData.numberOfGuests}
          onChange={handleChange}
          required
          min="1"
          max={tour?.maxCapacity}
          step="1"
        />
      </div>

      <div className={styles.formGroup}>
        <label>Schedule Date</label>
        <select
          name="scheduleDate"
          value={formData.scheduleDate}
          onChange={handleChange}
          required
          disabled={!isUpdate && !formData.tourId}
        >
          <option value="">Select a date</option>
          {availableSchedules?.map((schedule: any) => (
            <option
              key={schedule.scheduleDate}
              value={formatDate(schedule.scheduleDate)}
            >
              {formatDate(schedule.scheduleDate)}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>Start Time</label>
        <select
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
          disabled={!isUpdate && !formData.scheduleDate}
        >
          <option value="">Select a time</option>
          {availableSchedules
            ?.filter(
              (schedule: any) =>
                formatDate(schedule.scheduleDate) === formData.scheduleDate
            )
            .map((schedule: any) => (
              <option key={schedule.startTime} value={schedule.startTime}>
                {schedule.startTime}
              </option>
            ))}
        </select>
      </div>

      {isUpdate ? (
        <div className={styles.formGroup}>
          <label>Tour Max Capacity</label>
          <div>{tour?.maxCapacity}</div>
        </div>
      ) : (
        <div className={styles.formGroup}>
          <label>Tour Max Capacity</label>
          <div>
            {tours.find((t: any) => t.title === selectedTour)?.maxCapacity}
          </div>
        </div>
      )}

      {isUpdate && modifiedFields.length > 0 && (
        <div className={styles.modifiedInfo}>
          <p>Modified Fields:</p>
          <ul>
            {modifiedFields.map((field) => (
              <li key={field}>
                <strong>{field}:</strong> {originalData[field as keyof Booking]}{" "}
                &rarr; {formData[field as keyof Booking]}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.formActions}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isUpdate && !isModified}
        >
          {isUpdate ? "Update" : "Create"}
        </button>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
