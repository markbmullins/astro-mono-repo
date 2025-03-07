import { snakeToCamel } from "@utils/snakeToCamelCase.ts";
import { SUPABASE_URL, headers } from "./config.ts";
import type { Booking, UpdateBookingRequest } from "./types.ts";
import { camelToSnake } from "@utils/camelToSnakeCase.ts";
// Usage example:
//   updateBooking("booking-uuid-1234", { number_of_guests: 4, status: "confirmed" })
//     .then((data) => {
//       console.log("Booking updated:", data);
//     })
//     .catch((error) => {
//       console.error("Error updating booking:", error);
//     });
export async function updateBooking({
  bookingId,
  updates: updatesRaw,
}: UpdateBookingRequest): Promise<Booking> {
  const updates = camelToSnake(updatesRaw);
  console.log({ bookingId, updates });
  const response = await fetch(`${SUPABASE_URL}/update-booking`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      booking_id: bookingId,
      updates,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update booking");
  }

  const data = snakeToCamel(await response.json());
  return data;
}
