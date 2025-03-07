import React, { useState, useEffect } from 'react';

const AppointmentsList: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const appts = JSON.parse(localStorage.getItem('appointments') || '[]');
    setAppointments(appts);
  }, []);

  return (
    <div className="space-y-4">
      {appointments.length === 0 ? (
        <p>You have no appointments booked.</p>
      ) : (
        appointments.map((appt, index) => (
          <div key={index} className="border p-4 rounded">
            <p><strong>Service:</strong> {appt.service}</p>
            <p><strong>Date:</strong> {appt.date}</p>
            <p><strong>Time:</strong> {appt.time}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AppointmentsList;
