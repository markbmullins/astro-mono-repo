// src/types.ts

/**
 * Represents the supabase_booking Response shape
 */
export interface BookingResponse {
  id: string;
  tour_id: string;
  schedule_date: string; // Format: 'YYYY-MM-DD'
  start_time: string; // Format: 'HH:MM'
  customer_name: string;
  customer_email: string;
  number_of_guests: number;
  status: string; // e.g., 'pending', 'confirmed', etc.
}

export interface Booking {
  id: string;
  tourId: string;
  scheduleDate: string; // Format: 'YYYY-MM-DD'
  startTime: string; // Format: 'HH:MM'
  customerName: string;
  customerEmail: string;
  numberOfGuests: number;
  status: string; // e.g., 'pending', 'confirmed', etc.
}

// Create Booking Request Payload
export interface CreateBookingRequest {
  tour_id: string;
  schedule_date: string; // 'YYYY-MM-DD'
  start_time: string; // 'HH:MM'
  customer_name: string;
  customer_email: string;
  number_of_guests: number;
}

// Create Booking Response
export type CreateBookingResponse = BookingResponse[];

// Get Bookings Filters
export interface GetBookingsFilters {
  bookingId?: string;
  tourId?: string;
  scheduleDate?: string; // 'YYYY-MM-DD'
  customerEmail?: string;
}

// Get Bookings Response
export type GetBookingsResponse = BookingResponse[];

// Update Booking Request Payload
export interface UpdateBookingRequest {
  bookingId: string;
  updates: Partial<Booking>;
}

// Update Booking Response
export type UpdateBookingResponse = BookingResponse[];

// Delete Booking Request Payload
export interface DeleteBookingRequest {
  bookingId: string;
}

// Delete Booking Response
export interface DeleteBookingResponse {
  message: string; // e.g., "Booking deleted successfully"
}

// Error Response Structure
export interface ErrorResponse {
  error: string;
}
