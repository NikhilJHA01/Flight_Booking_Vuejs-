import { MomentService } from "../utility/momentUtil";

// Set All flights from the API / Mock Json
export const SET_FLIGHTS = (state, flights) => {
  let flightArray = [];
  if (flights) {
    for (let flight of flights) {
      const object = {
        name: flight["name"] ? flight["name"] : "",
        flightNo: flight["flightNo"] ? flight["flightNo"] : "",
        destination: flight["destination"] ? flight["destination"] : "",
        origin: flight["origin"] ? flight["origin"] : "",
        arrivalTime: flight["arrivalTime"] ? flight["arrivalTime"] : "",
        departureTime: flight["departureTime"] ? flight["departureTime"] : "",
        price: flight["price"] ? flight["price"] : "",
        totalHours:
          flight["arrivalTime"] && flight["departureTime"]
            ? MomentService.convertHoursFormat(
                flight["departureTime"],
                flight["arrivalTime"]
              )
            : "",
        date: flight["date"] ? flight["date"] : ""
      };
      flightArray.push(object);
    }
    state.flights = flightArray;
  }
};

// Set all flights from origin to  Destination
export const SET_ONE_WAY_FLIGHTS = (state, searchQuery) => {
  state.flightsOneWay = state.flights.filter(
    flight =>
      JSON.stringify([flight.origin, flight.destination, flight.date]) ===
      JSON.stringify([
        searchQuery.departureCity,
        searchQuery.arrivalCity,
        searchQuery.departureDate
      ])
  );
  // All flights to destination not from origin
  let waysToReachDestNotOrigin = state.flights.filter(
    flight =>
      flight.destination === searchQuery.arrivalCity &&
      flight.origin !== searchQuery.departureCity &&
      flight.date === searchQuery.departureDate
  );

  // All flights from Origin to Not destination
  let flightsFromOriginNotDest = state.flights.filter(
    flight =>
      flight.destination !== searchQuery.arrivalCity &&
      flight.origin === searchQuery.departureCity &&
      flight.date === searchQuery.departureDate
  );

  getLayoverFlights(
    flightsFromOriginNotDest,
    waysToReachDestNotOrigin,
    state.flightsOneWay
  );
};

// Set all flights from Destination to Origin ( Return Journey )
export const SET_RETURN_FLIGHTS = (state, searchQuery) => {
  state.returnFlights = state.flights.filter(
    flight =>
      JSON.stringify([flight.origin, flight.destination, flight.date]) ===
      JSON.stringify([
        searchQuery.arrivalCity,
        searchQuery.departureCity,
        searchQuery.returnDate
      ])
  );

  // All flights to destination not from origin

  let waysToReachDestNotOrigin = state.flights.filter(
    flight =>
      flight.destination === searchQuery.departureCity &&
      flight.origin !== searchQuery.arrivalCity &&
      flight.date === searchQuery.returnDate
  );
  // All flights from Origin to Not destination

  let flightsFromOriginNotDest = state.flights.filter(
    flight =>
      flight.destination !== searchQuery.departureCity &&
      flight.origin === searchQuery.arrivalCity &&
      flight.date === searchQuery.returnDate
  );

  // Push into array as per layover time and comparisons
  getLayoverFlights(
    flightsFromOriginNotDest,
    waysToReachDestNotOrigin,
    state.returnFlights
  );
};

// Push into state Array if comparison true
function getLayoverFlights(
  flightsFromOriginNotDest,
  waysToReachDestNotOrigin,
  resultArray
) {
  for (let flight of flightsFromOriginNotDest) {
    for (let route of waysToReachDestNotOrigin) {
      let tempArray = [];
      if (
        flight.destination === route.origin &&
        MomentService.checkTimeDifference(
          route["departureTime"],
          flight["arrivalTime"]
        )
      ) {
        tempArray.push(flight, route);
        resultArray.push(tempArray);
      }
    }
  }
}
