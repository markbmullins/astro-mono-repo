import { getCollection } from "astro:content";

const toursContent = await getCollection("tours");
const scheduleData = await getCollection("schedules");

export const tours = toursContent.map((entry) => {
  const {
    title,
    description,
    shortDescription,
    length,
    maxCapacity,
    itinerary,
    tourId,
    highlights,
    images,
    price,
  } = entry.data;

  // match schedules for this particular tour’s tourId
  const schedules = scheduleData
    .filter((s) => s.data.tourId === tourId)
    .map((ms) => ms.data.dates)
    .flat()
    .map((s) => ({ scheduleDate: s.schedule_date, startTime: s.startTime }));

  return {
    tourId,
    title,
    description,
    shortDescription,
    length,
    maxCapacity,
    itinerary,
    highlights,
    price,
    images: images.map((i) => ({
      image: i.image.replace("public/", "/"),
      alt: i.alt,
      isMain: i.isMain,
    })),
    schedules,
  };
});

export type Tours = typeof tours;
export type Tour = Tours[number];
export type TourSchedule = {
  tourTitle: string;
  tourId: string;
  price: number;
  capacity: number;
  scheduleDate: Date;
  startTime: string;
};

export const content = {};

// 5. For demonstration, here’s a quick function to filter tours by date range.
function findToursByDateRange(
  t: typeof tours,
  startDate: string,
  endDate: string
) {
  // Convert to date objects for comparison
  const start = new Date(startDate);
  const end = new Date(endDate);

  return t.filter((t) => {
    // if *any* schedule date is within the range, include the tour
    return t.schedules.some((dateObj) => {
      const scheduleDate = new Date(dateObj.scheduleDate);
      return scheduleDate >= start && scheduleDate <= end;
    });
  });
}

// Example usage: imagine we want tours available between 2024-12-25 and 2024-12-31
// const toursInRange = findToursByDateRange(tours, "2024-12-25", "2024-12-31");
