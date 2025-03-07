import { snakeToCamel } from "@utils/snakeToCamelCase.ts";
import { SUPABASE_URL, headers } from "./config.ts";
import type { Booking, DeleteBookingRequest } from "./types.ts";
// Usage example:
//   deleteBooking("booking-uuid-1234")
//     .then((data) => {
//       console.log(data.message); // "Booking deleted successfully"
//     })
//     .catch((error) => {
//       console.error("Error deleting booking:", error);
//
export async function deleteBooking({
  bookingId,
}: DeleteBookingRequest): Promise<Booking> {
  const response = await fetch(`${SUPABASE_URL}/delete-booking`, {
    method: "DELETE",
    headers,
    body: JSON.stringify({
      booking_id: bookingId,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete booking");
  }

  const data = snakeToCamel(await response.json());
  return data;
}
