import { camelToSnake } from "@utils/camelToSnakeCase.ts";
import { SUPABASE_URL, headers } from "./config.ts";
import type { Booking } from "./types.ts";
import { snakeToCamel } from "@utils/snakeToCamelCase.ts";
// Usage example:
//   createBooking({
//     tour_id: "chs-ghost-tour",
//     schedule_date: "2024-12-31",
//     start_time: "17:00",
//     customer_name: "John Doe",
//     customer_email: "john.doe@example.com",
//     number_of_guests: 2,
//   })
//     .then((data) => {
//       console.log("Booking created:", data);
//     })
//     .catch((error) => {
//       console.error("Error creating booking:", error);
//     });


export async function createBooking(bookingData: Booking): Promise<Booking> {
  const body = JSON.stringify(camelToSnake(bookingData));
  const url = `${SUPABASE_URL}/create-booking`;
  console.log(
    `Sending request ${url} with body: ${body} and headers: ${headers}`
  );
  const response = await fetch(url, {
    method: "POST",
    headers,
    body,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create booking");
  }

  const json = snakeToCamel(await response.json());
  console.log(`Received response: ${json}`);
  return json;
}
