// const API="https://tw-frontenders.firebaseio.com/advFlightSearch.json";
// Mocking Json from the Above API

export const getFlights = ({ commit }) => {
  fetch("assets/flights.json")
    .then(res => res.json())
    .then(data => {
      commit("SET_FLIGHTS", data);
    })
    .catch(err => {
      console.error(err);
    });
};

export const getOneWayFlights = ({ commit }, params) => {
  commit("SET_ONE_WAY_FLIGHTS", params);
};

export const getReturnFlights = ({ commit }, params) => {
  commit("SET_RETURN_FLIGHTS", params);
};
