import React, { useState, type ChangeEvent, type FormEvent } from "react";
import styles from "./bookings-table.module.css";
import type {
  Booking,
  BookingResponse,
  GetBookingsFilters,
} from "@requests/types";

interface BookingsTableProps {
  tours: any;
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  onSearchClear: () => void;
  onSearch: (filters: GetBookingsFilters) => void;
  currentPage: number;
  totalTours: number;
  limit: number;
  onPageChange: (page: number) => void;
  onEdit: (booking: Booking) => void;
  onDelete: (booking: Booking) => void;
}
export const BookingsTable = ({
  tours,
  bookings,
  loading,
  error,
  onSearch,
  onSearchClear,
  currentPage,
  totalTours,
  limit,
  onPageChange,
  onEdit,
  onDelete,
}: BookingsTableProps) => {
  const initialState = {
    customerEmail: "",
    scheduleDate: "",
    tourId: "",
    bookingId: "",
  };
  const [searchFields, setSearchFields] =
    useState<GetBookingsFilters>(initialState);

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Booking;
    direction: "asc" | "desc";
  } | null>({
    key: "id",
    direction: "asc",
  });

  const handleSort = (key: keyof Booking) => {
    setSortConfig((prevConfig) => {
      if (prevConfig?.key === key) {
        // Reverse direction if sorting the same column
        return {
          key,
          direction: prevConfig.direction === "asc" ? "desc" : "asc",
        };
      }
      // Default to ascending if a new column is clicked
      return { key, direction: "asc" };
    });
  };

  const sortedBookings = React.useMemo(() => {
    if (!sortConfig) return bookings;
    const sorted = [...bookings].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [bookings, sortConfig]);

  const clearFields = () => {
    setSearchFields({ ...initialState });
    onSearchClear();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchFields({
      ...searchFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    const filters = {} as GetBookingsFilters;
    Object.keys(searchFields).forEach((key) => {
      if (searchFields[key as keyof GetBookingsFilters]) {
        filters[key as keyof GetBookingsFilters] =
          searchFields[key as keyof GetBookingsFilters];
      }
    });
    onSearch(filters);
  };

  const shiftEnterHandler = (e: any) => {
    if (e.shiftKey && e.key === "Enter") {
      e.preventDefault(); // Prevent default Enter behavior
      clearFields();
    }
  };

  const totalPages = Math.ceil(totalTours / limit);

  const arrow =
    sortConfig?.direction === "asc" ? (
      <img src={"/images/up.svg"} alt="Up Icon" width="20" height="20" />
    ) : (
      <img src={"/images/down.svg"} alt="Down Icon" width="20" height="20" />
    );

  return (
    <div className={styles.tableContainer}>
      <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
        {/* Add ability to search by tour title -> need to map from tourId to tour title using content */}
        <input
          type="text"
          name="bookingId"
          placeholder="Search by Booking ID"
          value={searchFields.bookingId}
          onChange={handleInputChange}
          className={styles.searchInput}
          onKeyDown={shiftEnterHandler}
        />
        <input
          type="text"
          name="tourId"
          placeholder="Search by Tour ID"
          value={searchFields.tourId}
          onChange={handleInputChange}
          className={styles.searchInput}
          onKeyDown={shiftEnterHandler}
        />
        <input
          type="text"
          name="customerEmail"
          placeholder="Search by Customer Email"
          value={searchFields.customerEmail}
          onChange={handleInputChange}
          className={styles.searchInput}
          onKeyDown={shiftEnterHandler}
        />
        <input
          type="date"
          name="scheduleDate"
          placeholder="Search by Tour Date"
          value={searchFields.scheduleDate}
          onChange={handleInputChange}
          className={styles.searchInput}
          onKeyDown={shiftEnterHandler}
        />
        <button
          type="button"
          onClick={clearFields}
          className={`${styles.searchButton} ${styles.clearButton}`}
          title="Shift+Enter to clear"
        >
          Clear
        </button>
        <button
          type="submit"
          className={styles.searchButton}
          title="Enter to search"
        >
          Search
        </button>
      </form>

      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <>
          <table className={styles.tourTable}>
            <thead>
              <tr className={styles.tableHeader}>
                <th onClick={() => handleSort("id")}>
                  <div className={styles.tableHeaderCell}>
                    <div>Booking ID</div>{" "}
                    <div>{sortConfig?.key === "id" && arrow}</div>
                  </div>
                </th>
                <th onClick={() => handleSort("tourId")}>
                  <div className={styles.tableHeaderCell}>
                    <div>Tour ID</div>{" "}
                    <div>{sortConfig?.key === "tourId" && arrow}</div>
                  </div>
                </th>
                <th>Title </th>
                <th onClick={() => handleSort("customerEmail")}>
                  <div className={styles.tableHeaderCell}>
                    <div className={styles.tableHeaderCell}>
                      <div>Customer Email</div>{" "}
                      <div>{sortConfig?.key === "customerEmail" && arrow}</div>
                    </div>
                  </div>
                </th>
                <th onClick={() => handleSort("customerName")}>
                  <div className={styles.tableHeaderCell}>
                    <div>Customer Name</div>{" "}
                    <div>{sortConfig?.key === "customerName" && arrow}</div>
                  </div>
                </th>
                <th onClick={() => handleSort("scheduleDate")}>
                  <div className={styles.tableHeaderCell}>
                    <div>Schedule Date</div>{" "}
                    <div>{sortConfig?.key === "scheduleDate" && arrow}</div>
                  </div>
                </th>
                <th onClick={() => handleSort("startTime")}>
                  <div className={styles.tableHeaderCell}>
                    <div>Start Time</div>{" "}
                    <div>{sortConfig?.key === "startTime" && arrow}</div>
                  </div>
                </th>
                <th onClick={() => handleSort("status")}>
                  <div className={styles.tableHeaderCell}>
                    <div>Status</div>{" "}
                    <div>{sortConfig?.key === "status" && arrow}</div>
                  </div>
                </th>
                <th onClick={() => handleSort("numberOfGuests")}>
                  <div className={styles.tableHeaderCell}>
                    <div> Number of Guests</div>
                    <div>{sortConfig?.key === "numberOfGuests" && arrow}</div>
                  </div>
                </th>
                <th>Tour Max Capacity </th>
                <th>Action </th>
              </tr>
            </thead>

            <tbody>
              {sortedBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles.noData}>
                    No bookings found.
                  </td>
                </tr>
              ) : (
                sortedBookings.map((booking) => {
                  const tour = tours.find(
                    (t: any) => t.tourId === booking.tourId
                  )!;

                  const [year, month, day] = booking.scheduleDate
                    .split("-")
                    .map(Number);

                  const [hour, minute, second = 0] = booking.startTime
                    .split("+")[0]
                    .split(":")
                    .map(Number);

                  const localDate = new Date(
                    year,
                    month - 1,
                    day,
                    hour,
                    minute,
                    second
                  );

                  return (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.tourId}</td>
                      <td>{tour.title}</td>
                      <td
                        title={booking.customerEmail}
                        className={styles.overflow}
                      >
                        {booking.customerEmail}
                      </td>
                      <td>{booking.customerName}</td>
                      <td>
                        {localDate.toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </td>
                      <td>
                        {localDate.toLocaleTimeString(undefined, {
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </td>
                      <td>{booking.status}</td>
                      <td>{booking.numberOfGuests}</td>
                      <td>{tour.maxCapacity}</td>
                      <td className={styles.modifierButtons}>
                        <button
                          className={styles.editButton}
                          onClick={() => onEdit(booking)}
                        >
                          Edit
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => onDelete(booking)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          <div className={styles.pagination}>
            <button
              className={styles.pageButton}
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              Previous
            </button>
            <span className={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={styles.pageButton}
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};
