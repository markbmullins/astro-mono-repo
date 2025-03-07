import React, { useState, useMemo } from "react";
import "./calendar.css";
import type { Tours } from "@content/accessors";

interface CalendarProps {
  tours: Tours;
  onSelectTour: (schedule: any) => void;
}

/** Compare two dates by day, month, year. */
function areDatesEqual(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/** Flatten all schedules from all tours */
function getCombinedSchedules(tours: Tours) {
  return tours.flatMap((tour) =>
    tour.schedules.map((sched) => ({
      ...sched,
      tourTitle: tour.title,
      tourId: tour.tourId,
      price: tour.price,
      capacity: tour.maxCapacity
    }))
  );
}

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar({ tours, onSelectTour }: CalendarProps) {
  // Flatten schedules for easy matching
  const combinedSchedules = useMemo(() => getCombinedSchedules(tours), [tours]);

  // Show current month, in future show next month with available bookings
  const now = new Date();
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());

  // Generate day cells for the chosen month
  function renderCalendarCells() {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // Sunday=0

    const cells = [];

    // Leading empty cells
    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<div key={`empty-${i}`} className="day-cell empty"></div>);
    }

    // Actual day cells
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(currentYear, currentMonth, day);

      // Find any schedules matching this day
      const matchedSchedules = combinedSchedules.filter((sched) =>
        areDatesEqual(sched.scheduleDate, dateObj)
      );

      let cellClass = "day-cell";
      if (matchedSchedules.length > 0) cellClass += " has-tour";

      cells.push(
        <div key={`day-${day}`} className={cellClass}>
          <div className="day-number">{day}</div>
          {matchedSchedules.length > 0 && (
            <ul className="times-list">
              {matchedSchedules.map((m, idx) => (
                <button
                  className="schedule-button"
                  onClick={() => onSelectTour(m)}
                >
                  <li key={idx}>
                    {m.startTime} ({m.tourTitle})
                  </li>
                </button>
              ))}
            </ul>
          )}
        </div>
      );
    }

    return cells;
  }

  // For a future next/prev month button:
  function changeMonth(step: number) {
    let newMonth = currentMonth + step;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  }

  const monthLabel = new Date(currentYear, currentMonth).toLocaleString(
    "default",
    {
      month: "long",
      year: "numeric",
    }
  );

  return (
    <div className="calendar-container">
      <div className="calendar-nav">
        <button onClick={() => changeMonth(-1)}>&laquo; Prev</button>
        <div>{monthLabel}</div>
        <button onClick={() => changeMonth(1)}>Next &raquo;</button>
      </div>

      <div className="calendar-grid">
        {daysOfWeek.map((dayName, idx) => (
          <div key={idx} className="day-header-cell">
            {dayName}
          </div>
        ))}
        {renderCalendarCells()}
      </div>
    </div>
  );
}
