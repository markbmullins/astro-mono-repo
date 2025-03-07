import React, { useState, useEffect } from "react";
import { BookingsTable } from "./BookingTable.tsx";
import { BookingsForm } from "./BookingsForm.tsx";
import { ConfirmationModal } from "./ConfirmationModal.tsx";
import styles from "./bookings-management-dashboard.module.css";
import type { Booking, GetBookingsFilters } from "@requests/types.ts";
import { getBookings } from "@requests/get-bookings.ts";
import { createBooking } from "@requests/create-booking.ts";
import { updateBooking } from "@requests/update-booking.ts";
import { deleteBooking } from "@requests/delete-booking.ts";

interface Props {
  tours: any;
}

export const filterBookings = (
  bookings: Booking[],
  filters: GetBookingsFilters
): Booking[] => {
  return bookings.filter((booking) => {
    const { bookingId, tourId, scheduleDate, customerEmail } = filters;

    console.log({ booking, filters });
    // Apply each filter if the corresponding value exists
    if (bookingId && booking.id.toString() !== bookingId) {
      return false;
    }
    if (tourId && booking.tourId !== tourId) {
      return false;
    }
    if (scheduleDate && booking.scheduleDate !== scheduleDate) {
      return false;
    }
    if (customerEmail && !booking.customerEmail.includes(customerEmail)) {
      return false;
    }

    // If no filters exclude the booking, include it in the result
    return true;
  });
};

export const BookingsManagementDashboard = ({ tours }: Props) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredbookings] = useState<Booking[]>([]); // Add this state
  const [totalTours, setTotalTours] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [searchFilters, setSearchFilters] = useState<
    Partial<GetBookingsFilters>
  >({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit] = useState<number>(10);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data, total } = await getBookings(
        searchFilters,
        currentPage,
        limit
      );
      console.log({ data });
      setBookings(data);
      setFilteredbookings(data);
      setTotalTours(total);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleSearch = (filters: Partial<GetBookingsFilters>) => {
    setSearchFilters(filters);
    setFilteredbookings(filterBookings(bookings, filters));
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleClear = () => {
    setFilteredbookings(bookings);
  };

  const handleCreate = async (newTour: Booking) => {
    try {
      await createBooking(newTour);
      setIsCreateModalOpen(false);
      fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleUpdate = async (bookingId: string, updates: Partial<Booking>) => {
    try {
      await updateBooking({ bookingId, updates });
      setIsUpdateModalOpen(false);
      fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (bookingId: string) => {
    try {
      await deleteBooking({ bookingId });
      const newBookings = bookings.filter((b) => b.id !== bookingId);
      setBookings(newBookings);
      setFilteredbookings(newBookings);
      setIsDeleteModalOpen(false);
      setSearchFilters({});
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1>Booking Management Dashboard</h1>
        <button
          className={styles.createButton}
          onClick={() => setIsCreateModalOpen(true)}
        >
          + Create Booking
        </button>
      </header>

      <BookingsTable
        tours={tours}
        bookings={filteredBookings}
        loading={loading}
        error={error}
        onSearch={handleSearch}
        onSearchClear={handleClear}
        currentPage={currentPage}
        totalTours={totalTours}
        limit={limit}
        onPageChange={setCurrentPage}
        onEdit={(booking) => {
          setSelectedBooking(booking);
          setIsUpdateModalOpen(true);
        }}
        onDelete={(booking) => {
          setSelectedBooking(booking);
          setIsDeleteModalOpen(true);
        }}
      />

      {/* Create Booking Modal */}
      {isCreateModalOpen && (
        <ConfirmationModal
          header="Create New Booking"
          onClose={() => setIsCreateModalOpen(false)}
          isOpen={isCreateModalOpen}
        >
          <BookingsForm
            tours={tours}
            booking={{} as Booking}
            onSubmit={handleCreate}
            onCancel={() => setIsCreateModalOpen(false)}
          />
        </ConfirmationModal>
      )}

      {/* Update Booking Modal */}
      {isUpdateModalOpen && selectedBooking && (
        <ConfirmationModal
          header="Update Booking"
          onClose={() => setIsUpdateModalOpen(false)}
          isOpen={isUpdateModalOpen}
        >
          <BookingsForm
            tours={tours}
            booking={selectedBooking}
            onSubmit={(updates) => handleUpdate(selectedBooking.id, updates)}
            onCancel={() => setIsUpdateModalOpen(false)}
            isUpdate
          />
        </ConfirmationModal>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedBooking && (
        <ConfirmationModal
          header="Confirm Deletion"
          onClose={() => setIsDeleteModalOpen(false)}
          isOpen={isDeleteModalOpen}
        >
          <div>
            <p>Are you sure you want to delete the booking for customer?</p>
            <p>
              <strong>Email: {selectedBooking.customerEmail}</strong>
            </p>
            <p>
              <strong>Name: {selectedBooking.customerName}</strong>
            </p>
            <p>
              <strong>Date: {selectedBooking.scheduleDate}</strong>
            </p>
            <p>
              <strong>Time: {selectedBooking.startTime}</strong>
            </p>
            <div className={styles.modalActions}>
              <button
                className={styles.confirmButton}
                onClick={() => handleDelete(selectedBooking.id)}
              >
                Yes, Delete
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </ConfirmationModal>
      )}
    </div>
  );
};
