# Palmetto Hidden Gems

A website for Kim's tours. 


## Technical info

### Deriving stop times based on the CMS:
Fetch the selected Tour data (including the itinerary with stopLength values).
Fetch the schedule’s startTime.
For each stop in the itinerary:
    Add the stop’s length to the cumulative total of previous stops.
    Convert that total to an HH:mm offset from startTime.
    Display “Stop #1 at 09:00 AM,” “Stop #2 at 09:15 AM,” etc.

Example:
```
function calculateStopTimes(startTime, stops) {
  // startTime in "HH:mm" format
  // stops is an array of { location, stopLength }

  // Convert startTime to a moment/dayjs date object
  let current = dayjs(`2024-01-01 ${startTime}`, "YYYY-MM-DD HH:mm"); // date is arbitrary
  let schedule = [];

  stops.forEach((stop, index) => {
    schedule.push({
      location: stop.location,
      stopStart: current.format("HH:mm"),
    });
    // Add stop length in minutes
    current = current.add(stop.stopLength, "minute");
  });

  return schedule;
}

```

```
function TourSchedule({ tour, scheduleDate, startTime }) {
  const stopsWithTimes = calculateStopTimes(startTime, tour.itinerary);

  return (
    <div>
      <h2>{tour.title} on {scheduleDate}</h2>
      <ul>
        {stopsWithTimes.map((stop, i) => (
          <li key={i}>
            Stop #{i + 1} at {stop.stopStart}: {stop.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

```