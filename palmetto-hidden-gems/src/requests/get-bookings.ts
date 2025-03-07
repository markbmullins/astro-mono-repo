import { camelToSnake } from "@utils/camelToSnakeCase.ts";
import { SUPABASE_URL, headers } from "./config.ts";
import type { Booking, GetBookingsFilters } from "./types.ts";
import { snakeToCamel } from "@utils/snakeToCamelCase.ts";
// Usage example:
//   fetchBookings({ tour_id: "chs-ghost-tour", schedule_date: "2024-12-31" })
//     .then((data) => {
//       console.log("Bookings:", data);
//     })
//     .catch((error) => {
//       console.error("Error fetching bookings:", error);
//     });
export async function getBookings(
  filters: Partial<GetBookingsFilters> = {},
  page: number = 1,
  limit: number = 10
) {
  const queryParams = new URLSearchParams({
    ...camelToSnake(filters),
    page: page.toString(),
    limit: limit.toString(),
  }).toString();
  const response = await fetch(`${SUPABASE_URL}/get-booking?${queryParams}`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch bookings");
  }

  const data = snakeToCamel(await response.json()) as Booking[];
  console.log(`Fetched bookings: ${data}`);

  return { data, total: data?.length };
}
